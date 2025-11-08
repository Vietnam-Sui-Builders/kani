import React, { createContext, useContext } from "react"
import { setLiquidityProvisionBot, useAppSelector } from "@/redux"
import { Spacer } from "@heroui/react"
import { Investment } from "./Investment"
import { PoolInfoCard } from "./PoolInfoCard"
import { LiquidityPools } from "./LiquidityPools"
import { PositionRecords } from "./PositionRecords"
import { ConfigCard } from "./ConfigCard"
import { PlayIcon, StopIcon } from "@phosphor-icons/react"
import { Container, KaniButton, runGraphQLWithToast } from "@/components"
import { useStopLiquidityProvisionBotSwrMutation, useRunLiquidityProvisionBotSwrMutation, useQueryLiquidityProvisionSwr } from "@/hooks/singleton/swr"
import { useAppDispatch } from "@/redux"
import { ActiveSignal } from "./ActiveSignal"
import { ChainId } from "@/modules/types"
import { AIRiskDetection } from "./AIRiskDetection"

export interface LiquidityProvisionBotPageProps {
    previewOnly?: boolean
    previewChainId?: ChainId
}

interface LiquidityProvisionContextValue {
    previewOnly: boolean
    previewChainId: ChainId
  }
  
export const LiquidityProvisionContext = createContext<LiquidityProvisionContextValue | null>(null)

export const useLiquidityProvisionContext = () => {
    const context = useContext(LiquidityProvisionContext)
    if (!context) throw new Error("useLiquidityProvisionContext must be used within LiquidityProvisionProvider")
    return context
}

export const LiquidityProvisionProvider: React.FC<
  React.PropsWithChildren<LiquidityProvisionContextValue>
> = ({ children, previewOnly, previewChainId }) => {
    return (
        <LiquidityProvisionContext.Provider value={{ previewOnly, previewChainId }}>
            {children}
        </LiquidityProvisionContext.Provider>
    )
}

export const LiquidityProvisionBotPage = ({ 
    previewOnly = false, 
    previewChainId = ChainId.Solana
}: LiquidityProvisionBotPageProps) => 
{
    const liquidityProvisionBot = useAppSelector(
        (state) => state.session.liquidityProvisionBot
    ) 
    const stopLiquidityProvisionBotMutation = useStopLiquidityProvisionBotSwrMutation()
    const runLiquidityProvisionBotMutation = useRunLiquidityProvisionBotSwrMutation()
    const queryLiquidityProvisionSwr = useQueryLiquidityProvisionSwr()
    const dispatch = useAppDispatch()
    return (
        <LiquidityProvisionProvider 
            previewOnly={previewOnly} 
            previewChainId={previewChainId}>
            <Container>
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="text-2xl font-bold">
                            {previewOnly ? "Stacy USDC Engine" : liquidityProvisionBot?.name}
                        </div>  
                        {liquidityProvisionBot?.running || previewOnly && (
                            <div className="flex items-center gap-2 px-3 py-1 rounded-medium bg-content2">
                                <ActiveSignal />
                                <div className="text-sm from-primary to-secondary bg-gradient-to-r text-transparent bg-clip-text">
                    Active
                                </div>
                            </div>
                        )}
                    </div>
                    {liquidityProvisionBot?.running || previewOnly ? (
                        <KaniButton 
                            startContent={
                                !stopLiquidityProvisionBotMutation.isMutating && <StopIcon/>
                            } 
                            color="primary" 
                            isLoading={stopLiquidityProvisionBotMutation.isMutating}
                            isDisabled={stopLiquidityProvisionBotMutation.isMutating}
                            onPress={async () => {
                                runGraphQLWithToast(async () => {
                                    const response = await stopLiquidityProvisionBotMutation.trigger({
                                        id: liquidityProvisionBot?.id ?? "",
                                    })
                                    if (!response.data?.stopLiquidityProvisionBot) {
                                        throw new Error("Failed to stop liquidity provision bot")
                                    }
                                    // optimistic update
                                    if (liquidityProvisionBot) {
                                        dispatch(setLiquidityProvisionBot({
                                            ...liquidityProvisionBot,
                                            running: false,
                                        }))
                                    }
                                    await queryLiquidityProvisionSwr.mutate()   
                                    return response.data.stopLiquidityProvisionBot
                                })
                            }}>
                        Stop Bot
                        </KaniButton>
                    ) : (
                        <KaniButton 
                            startContent={
                                !runLiquidityProvisionBotMutation.isMutating && <PlayIcon />
                            } 
                            color="primary" 
                            isLoading={runLiquidityProvisionBotMutation.isMutating}
                            isDisabled={runLiquidityProvisionBotMutation.isMutating}
                            onPress={async () => {
                                runGraphQLWithToast(async () => {
                                    const response = await runLiquidityProvisionBotMutation.trigger({
                                        id: liquidityProvisionBot?.id ?? "",
                                    })
                                    if (!response.data?.runLiquidityProvisionBot) {
                                        throw new Error("Failed to run liquidity provision bot")
                                    }
                                    // optimistic update
                                    if (liquidityProvisionBot) {
                                        dispatch(setLiquidityProvisionBot({
                                            ...liquidityProvisionBot,
                                            running: true,
                                        }))
                                    }
                                    await queryLiquidityProvisionSwr.mutate()
                                    return response.data.runLiquidityProvisionBot
                                })
                            }}>
                        Run Bot
                        </KaniButton>
                    )}
                </div>
                <Spacer y={6} />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="flex flex-col gap-6 col-span-2">
                        <Investment/>
                        <LiquidityPools/>
                    </div>
                    <div className="flex flex-col gap-6 col-span-1">
                        <ConfigCard/>
                        <PoolInfoCard />
                        <PositionRecords/>
                        <AIRiskDetection/>
                    </div>
                </div>
            </Container>
        </LiquidityProvisionProvider>
    )
}