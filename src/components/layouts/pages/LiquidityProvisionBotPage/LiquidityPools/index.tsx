"use client"

import React, { useEffect, useState } from "react"
import {
    KaniCard,
    KaniCardBody,
    KaniLink,
    LiquidityPoolCardPreview,
    TooltipTitle,
    useLiquidityProvisionContext,
} from "@/components"
import { ChainId, LiquidityPoolId, LiquidityPoolSchema, Network, TokenId } from "@/modules/types"
import { Spacer } from "@heroui/react"
import { Reorder } from "framer-motion"
import _ from "lodash"
export interface ExtendedLiquidityPoolSchema extends LiquidityPoolSchema {
  apr: number
  provider: string
}

export const LiquidityPools = () => {
    const { previewOnly } = useLiquidityProvisionContext()

    const liquidityPools: Array<ExtendedLiquidityPoolSchema> = [
        { 
            id: "1", displayId: LiquidityPoolId.CetusSuiUsdc005, 
            dex: "Cetus", 
            poolAddress: "0xaf4205473c47a981165f5414d37ea1367f2cfd3b", 
            tokenA: "SUI", 
            tokenB: "USDC",     
            fee: 0.05, 
            network: Network.Mainnet, 
            chainId: ChainId.Sui, 
            rewardTokens: [TokenId.SuiUsdc], 
            createdAt: "", updatedAt: "", apr: 62.23, provider: "Cetus" },
        { 
            id: "2", displayId: LiquidityPoolId.TurbosIkaUsdc015, 
            dex: "Turbos", 
            poolAddress: "0x7917d29a27b8e46e49a3f2348583057e3b27e99b", 
            tokenA: "IKA", 
            tokenB: "USDC", 
            fee: 0.05, 
            network: Network.Mainnet, 
            chainId: ChainId.Sui, 
            rewardTokens: [TokenId.SuiUsdc], 
            createdAt: "", updatedAt: "", apr: 52.23, provider: "Turbos" },
        { 
            id: "3", displayId: LiquidityPoolId.MomentumWalSui02, 
            dex: "Momentum", 
            poolAddress: "0x32375d4617726470276037801033904b5e3b623b", 
            tokenA: "WALRUS", 
            tokenB: "SUI", 
            fee: 0.05, 
            network: Network.Mainnet, 
            chainId: ChainId.Sui, 
            rewardTokens: [TokenId.SuiUsdc], 
            createdAt: "", updatedAt: "", apr: 42.23, provider: "Momentum" },
        { 
            id: "4", displayId: LiquidityPoolId.MomentumSuiUsdc0175, 
            dex: "Momentum", 
            poolAddress: "0x39726142911785195a790b2943741d479e041d2c", 
            tokenA: "SUI", 
            tokenB: "USDC", 
            fee: 0.05, 
            network: Network.Mainnet, 
            chainId: ChainId.Sui, 
            rewardTokens: [TokenId.SuiUsdc], 
            createdAt: "", updatedAt: "", apr: 42.23, provider: "Momentum" },
    ]

    const [pools, setPools] = useState(liquidityPools)
    useEffect(() => {
        const interval = setInterval(() => {
            setPools(_.shuffle(pools))
        }, 1000)
        return () => clearInterval(interval)
    }, [
        pools
    ])
    
    return (
        <KaniCard>
            <KaniCardBody>
                <div className="flex justify-between items-center">
                    <TooltipTitle title="Liquidity Pools" tooltipString="The liquidity pools of the liquidity provision bot." />
                    <KaniLink size="sm" color="secondary" href="/dashboard/liquidity-provision/id/liquidity-pools">
            Manage
                    </KaniLink>
                </div>
                <Spacer y={4} />
                {previewOnly && (
                    <Reorder.Group
                        axis="y"
                        values={pools}
                        onReorder={setPools}
                        className="flex flex-col gap-4  overflow-x-hidden overflow-y-hidden"
                    >
                        {pools.map((pool, index) => (
                            <Reorder.Item
                                key={pool.id}
                                value={pool}
                                transition={{
                                    type: "spring",
                                    stiffness: 250,
                                    damping: 24,
                                }}
                                whileHover={{ scale: 1.03 }}
                            >
                                <LiquidityPoolCardPreview
                                    liquidityPool={pool}
                                    provider={pool.provider}
                                    apr={pool.apr}
                                    index={index}
                                />
                            </Reorder.Item>
                        ))}
                    </Reorder.Group>
                )}
            </KaniCardBody>
        </KaniCard>
    )
}