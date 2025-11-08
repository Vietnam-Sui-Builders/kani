import { AreaChart, KaniCard, KaniCardBody, TooltipTitle, useLiquidityProvisionContext } from "@/components"
import { useAppSelector } from "@/redux/hooks"
import { Spacer } from "@heroui/react"
import { useTranslations } from "next-intl"
import React from "react"
import { TokenCard, TokenCardType } from "./TokenCard"
import { ChainId, Network, TokenId, TokenType } from "@/modules/types"
import { TokenCardPreview } from "./TokenCardPreview"

export const Investment = () => {
    const { previewOnly, previewChainId } = useLiquidityProvisionContext()
    const t = useTranslations("dashboard_liquidity_provision")
    const tokens = useAppSelector(
        (state) => state.static.tokens
    )
    const liquidityProvisionBot = useAppSelector(
        (state) => state.session.liquidityProvisionBot
    )
    const priorityToken = tokens.find(
        (token) => token.id === liquidityProvisionBot?.priorityToken
    )
    return (
        <KaniCard>
            <KaniCardBody>
                <TooltipTitle
                    title={t("investment")}
                    tooltipString={t("investment_tooltip")} />
                <Spacer y={1} />
                <div className="text-2xl font-bold">
                    $14k
                </div>
                <Spacer y={1} />
                <div className="flex items-center gap-2 text-xs">
                        <div className="flex items-center">
                        Today's PNL:
                        </div>
                        <div className="text-success">
                        + 104.5 USD (+0.74%)
                    </div>
                </div>
                <Spacer y={4} />
                <AreaChart />
                <Spacer y={4} />
                <TooltipTitle
                    title="Assets"
                    tooltipString={t("assets_tooltip")} />
                <Spacer y={4} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {!previewOnly && priorityToken && liquidityProvisionBot?.accountAddress && (
                        <>
                            <TokenCard
                                token={priorityToken}
                                ownerAddress={liquidityProvisionBot?.accountAddress}
                                type={TokenCardType.PriorityToken}
                                limit={10}
                            />
                            <TokenCard
                                token={priorityToken}
                                ownerAddress={liquidityProvisionBot?.accountAddress}
                                type={TokenCardType.GasToken}
                                limit={10}
                            />
                        </>
                    )}
                    {previewOnly && (
                        <>
                        <TokenCardPreview
                            token={{
                                id: TokenId.SolUsdc,
                                displayId: TokenId.SolUsdc,
                                name: "USDC",
                                symbol: "USDC",
                                iconUrl: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png?1547042194",
                                decimals: 6,
                                tokenAddress: "0x0000000000000000000000000000000000000000",
                                chainId: ChainId.Solana,
                                projectUrl: "https://www.usdc.com",
                                network: Network.Testnet,
                                type: TokenType.StableUsdc,
                                selectable: true,
                                createdAt: "",
                                updatedAt: "",      
                            }}
                            ownerAddress={"QVeEob5S8U47rwSH6wMsPRiFDPCcQ3wPqBgfjQQd8aX"}
                            type={TokenCardType.PriorityToken}
                            balance={14023.45}
                            usableBalance={14023.45}
                        />
                        <TokenCardPreview
                            token={{
                                decimals: 9,
                                id: TokenId.SolNative,
                                displayId: TokenId.SolNative,
                                name: "Sui",
                                symbol: "SUI",
                                iconUrl: "/icons/tokens/sui.svg",
                                tokenAddress: "So11111111111111111111111111111111111111112",
                                chainId: ChainId.Solana,
                                projectUrl: "https://solana.com",
                                network: Network.Testnet,
                                type: TokenType.Native,
                                selectable: true,
                                createdAt: "",
                                updatedAt: "",      
                            }} 
                            ownerAddress={"QVeEob5S8U47rwSH6wMsPRiFDPCcQ3wPqBgfjQQd8aX"}
                            type={TokenCardType.GasToken}
                            balance={5.5 * 2.13}
                            usableBalance={5.5}
                        />
                    </>
                    )}
                </div>
            </KaniCardBody>
        </KaniCard>
    )
}