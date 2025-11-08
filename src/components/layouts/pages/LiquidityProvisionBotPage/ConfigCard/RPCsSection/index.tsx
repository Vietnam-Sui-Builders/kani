import React from "react"
import { useAppSelector } from "@/redux"
import { KaniChip, KaniLink, KaniSnippet, TooltipTitle } from "@/components"
import { Spacer } from "@heroui/react"
import { GearSixIcon } from "@phosphor-icons/react"
import { useUpdateRpcsModalDisclosure } from "@/hooks/singleton"
import { centerPad } from "@/modules/utils"

export const RPCsSection = () => {
    const liquidityProvisionBot = useAppSelector((state) => state.session.liquidityProvisionBot)
    const { onOpen } = useUpdateRpcsModalDisclosure()
    return (
        <div>
            <div className="flex items-center gap-2 justify-between w-full">
                <TooltipTitle
                    title="RPCs"
                    tooltipString="The RPCs of the liquidity provision bot."
                />
                <KaniLink 
                    as="button"
                    className="text-sm"
                    color="secondary"
                    onPress={onOpen}
                >
                    <GearSixIcon className="w-5 h-5" />
                </KaniLink>
            </div>
            <Spacer y={4} />
            {
                liquidityProvisionBot?.rpcUrls?.length ? (
                    <div className="w-full">
                        {liquidityProvisionBot?.rpcUrls?.map((rpcUrl) => (
                            <div  key={rpcUrl}  className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <KaniSnippet value={rpcUrl} />
                                    <div key={rpcUrl} className="text-sm">
                                        {
                                            centerPad(rpcUrl ?? "", 10, 6)
                                        }
                                    </div>
                                </div>
                                <KaniChip variant="dot" classNames={{
                                    base: "border-0 p-0",
                                    content: "pr-0"
                                }} color="secondary">
                                        43ms
                                </KaniChip>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div>
                        <div className="text-sm">
                        No custom RPC provided. Using default RPCs.
                        </div>
                    </div>
                )
            }
        </div>
    )
}