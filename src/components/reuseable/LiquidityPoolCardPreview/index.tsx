import React from "react"
import { CexId, ChainId, LiquidityPoolSchema, Network, TokenId, TokenSchema, TokenType } from "@/modules/types"
import { KaniAvatar, KaniAvatarGroup } from "../../atomic"
import { XsSnippet } from "../XsSnippet"
import { motion } from "framer-motion"
import { Chip, Spacer, cn } from "@heroui/react"
import { computePercentage } from "@/modules/utils"

export interface LiquidityPoolCardPreviewProps {
    liquidityPool: LiquidityPoolSchema
    isSelected?: boolean
    onSelect?: () => void
    apr: number
    provider: string
    index: number
}

export const mockTokens: Array<TokenSchema> = [
    {
        id: "SOL",
        displayId: TokenId.SolNative,
        name: "Solana",
        symbol: "SOL",
        decimals: 9,
        tokenAddress: "So11111111111111111111111111111111111111112",
        coinMarketCapId: "solana",
        coinGeckoId: "solana",
        iconUrl: "/icons/tokens/solana.png",
        chainId: ChainId.Solana,
        projectUrl: "https://solana.com",
        network: Network.Mainnet,
        type: TokenType.Native,
        selectable: true,
        whichCex: CexId.Binance,
        cexIds: [CexId.Binance],
        cexSymbols: {
            [CexId.Binance]: "SOLUSDT",
        },
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "USDC",
        displayId: TokenId.SolUsdc,
        name: "USD Coin",
        symbol: "USDC",
        decimals: 6,
        tokenAddress: "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
        coinMarketCapId: "usd-coin",
        coinGeckoId: "usd-coin",
        iconUrl: "https://assets.coingecko.com/coins/images/6319/large/USD_Coin_icon.png",
        chainId: ChainId.Solana,
        projectUrl: "https://www.circle.com/en/usdc",
        network: Network.Mainnet,
        type: TokenType.StableUsdc,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "USDT",
        displayId: TokenId.SolUsdt,
        name: "Tether USD",
        symbol: "USDT",
        decimals: 6,
        tokenAddress: "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB",
        coinMarketCapId: "tether",
        coinGeckoId: "tether",
        iconUrl: "/icons/tokens/usdt.png",
        chainId: ChainId.Solana,
        projectUrl: "https://tether.to",
        network: Network.Mainnet,
        type: TokenType.StableUsdc,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "mSOL",
        displayId: TokenId.SolMsol,
        name: "Marinade Staked SOL",
        symbol: "mSOL",
        decimals: 9,
        tokenAddress: "mSoLzGtSgRddQBS5g4YhFJhvRcz3yf5hYzJZ3bbgH666",
        coinMarketCapId: "marinade-staked-sol",
        coinGeckoId: "marinade-staked-sol",
        iconUrl: "https://assets.coingecko.com/coins/images/17752/large/mSOL.png",
        chainId: ChainId.Solana,
        projectUrl: "https://marinade.finance",
        network: Network.Mainnet,
        type: TokenType.LiquidStaking,
        selectable: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "RAY",
        displayId: TokenId.SolRay,
        name: "Raydium",
        symbol: "RAY",
        decimals: 6,
        tokenAddress: "4k3Dyjzvzp8eMZWUXbBCjEvwSkkk6K7ytYfRtdhRP7n3",
        coinMarketCapId: "raydium",
        coinGeckoId: "raydium",
        iconUrl: "/icons/tokens/raydium.png",
        chainId: ChainId.Solana,
        projectUrl: "https://raydium.io",
        network: Network.Mainnet,
        type: TokenType.Regular,
        selectable: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "PUMP",
        displayId: TokenId.SolPump,
        name: "Pump",
        symbol: "PUMP",
        decimals: 6,
        tokenAddress: "8x2UqKJ5FbqM2ZCMZk7kkssULuUZHvwPfR7NsRzZQh2B",
        coinMarketCapId: undefined,
        coinGeckoId: undefined,
        iconUrl: "https://pump.fun/_next/image?url=%2Ftokens%2Fpump.png&w=64&q=75",
        chainId: ChainId.Solana,
        projectUrl: "https://pump.fun",
        network: Network.Mainnet,
        type: TokenType.Regular,
        selectable: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "SUI",
        displayId: TokenId.SuiNative,
        name: "Sui",
        symbol: "SUI",
        decimals: 9,
        tokenAddress: "0x0000000000000000000000000000000000000000000000000000000000000000",
        coinMarketCapId: undefined,
        coinGeckoId: undefined,
        iconUrl: "/icons/tokens/sui.svg",
        chainId: ChainId.Sui,
        projectUrl: "https://sui.io",
        network: Network.Mainnet,
        type: TokenType.Regular,
        selectable: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "USDC",
        displayId: TokenId.SuiUsdc,
        name: "USD Coin",
        symbol: "USDC",
        decimals: 6,
        tokenAddress: "0x0000000000000000000000000000000000000000000000000000000000000000",
        coinMarketCapId: undefined,
        coinGeckoId: undefined,
        iconUrl: "/icons/tokens/usdc.svg",
        chainId: ChainId.Sui,
        projectUrl: "https://www.circle.com/en/usdc",
        network: Network.Mainnet,
        type: TokenType.StableUsdc,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "IKA",
        displayId: TokenId.SuiIka,
        name: "Ika",
        symbol: "IKA",
        decimals: 9,
        tokenAddress: "0x0000000000000000000000000000000000000000000000000000000000000000",
        coinMarketCapId: undefined,
        coinGeckoId: undefined,
        iconUrl: "/icons/tokens/ika.png",
        chainId: ChainId.Sui,
        projectUrl: "https://ika.io",
        network: Network.Mainnet,
        type: TokenType.Regular,
        selectable: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "WALRUS",
        displayId: TokenId.SuiWalrus,
        name: "Walrus",
        symbol: "WALRUS",   
        decimals: 9,
        tokenAddress: "0x0000000000000000000000000000000000000000000000000000000000000000",
        coinMarketCapId: undefined,
        coinGeckoId: undefined,
        iconUrl: "/icons/tokens/walrus.png",
        chainId: ChainId.Sui,
        projectUrl: "https://walrus.io",
        network: Network.Mainnet,
        type: TokenType.Regular,
        selectable: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "ETH",
        displayId: TokenId.SuiEth,
        name: "Ethereum",
        symbol: "ETH",
        decimals: 18,
        tokenAddress: "0x0000000000000000000000000000000000000000000000000000000000000000",
        coinMarketCapId: undefined,
        coinGeckoId: undefined,
        iconUrl: "/icons/tokens/ethereum.svg",
        chainId: ChainId.Sui,
        projectUrl: "https://ethereum.org",
        network: Network.Mainnet,
        type: TokenType.Regular,
        selectable: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "XSTAKEDSUI",
        displayId: TokenId.SuiXStakedSui,
        name: "X Staked SUI",
        symbol: "XSTAKEDSUI",
        decimals: 9,
        tokenAddress: "0x0000000000000000000000000000000000000000000000000000000000000000",
        coinMarketCapId: undefined,
        coinGeckoId: undefined,
        iconUrl: "/icons/tokens/xstakedsui.svg",
        chainId: ChainId.Sui,
        projectUrl: "https://xstakedsui.io",
        network: Network.Mainnet,
        type: TokenType.Regular,
        selectable: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "CETUS",
        displayId: TokenId.SuiCetus,
        name: "Cetus",
        symbol: "CETUS",
        decimals: 9,
        tokenAddress: "0x0000000000000000000000000000000000000000000000000000000000000000",
        coinMarketCapId: undefined,
        coinGeckoId: undefined, 
        iconUrl: "/icons/tokens/cetus.svg",
        chainId: ChainId.Sui,
        projectUrl: "https://cetus.io",
        network: Network.Mainnet,
        type: TokenType.Regular,
        selectable: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "DEEP",
        displayId: TokenId.SuiDeep,
        name: "Deep",
        symbol: "DEEP",
        decimals: 9,
        tokenAddress: "0x0000000000000000000000000000000000000000000000000000000000000000",
        coinMarketCapId: undefined,
        coinGeckoId: undefined,
        iconUrl: "/icons/tokens/deep.svg",
        chainId: ChainId.Sui,
        projectUrl: "https://deep.io",
        network: Network.Mainnet,
        type: TokenType.Regular,
        selectable: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "ALKIMI",
        displayId: TokenId.SuiAlkimi,
        name: "Alkimi",
        symbol: "ALKIMI",
        decimals: 9,
        tokenAddress: "0x0000000000000000000000000000000000000000000000000000000000000000",
        coinMarketCapId: undefined,
        coinGeckoId: undefined,
        iconUrl: "/icons/tokens/alkimi.svg",
        chainId: ChainId.Sui,
        projectUrl: "https://alkimi.io",
        network: Network.Mainnet,
        type: TokenType.Regular,
        selectable: true,
        createdAt: "",
        updatedAt: "",
    },
    {
        id: "MTR",
        displayId: TokenId.SolMtr,
        name: "Manta Ray",
        symbol: "MTR",
        decimals: 9,
        tokenAddress: "0x0000000000000000000000000000000000000000000000000000000000000000",
        coinMarketCapId: undefined,
        coinGeckoId: undefined,
        iconUrl: "/icons/tokens/mtr.svg",
        chainId: ChainId.Solana,
        projectUrl: "https://manta.ray.io",
        network: Network.Mainnet,
        type: TokenType.Regular,
        selectable: true,
        createdAt: "",
        updatedAt: "",
    },
]

export const LiquidityPoolCardPreview = ({ liquidityPool, isSelected, onSelect, apr, provider, index }: LiquidityPoolCardPreviewProps) => {
    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className={cn("w-full h-full cursor-pointer", 
                "rounded-xl transition-colors duration-300",
                isSelected ? "bg-primary/20" : "hover:bg-primary/10"
            )}
            onClick={onSelect}
        >
            <div className="flex justify-between items-center p-3">
                <div>
                    <div className="flex items-center gap-2">
                        <KaniAvatarGroup>
                            <KaniAvatar src={mockTokens.find(token => token.id === liquidityPool.tokenA)?.iconUrl} className="w-10 h-10" radius="full" />
                            <KaniAvatar src={mockTokens.find(token => token.id === liquidityPool.tokenB)?.iconUrl} className="w-10 h-10" radius="full" />
                        </KaniAvatarGroup>
                        <div>
                            <div className="flex items-center gap-2">
                                <div className="text-sm">
                                    <span className="font-bold text-primary">{provider} </span>
                                    {mockTokens.find(token => token.id === liquidityPool.tokenA)?.symbol}-{mockTokens.find(token => token.id === liquidityPool.tokenB)?.symbol}
                                </div>
                                {index === 0 && (
                                    <Chip size="sm" color="warning" variant="flat">Best</Chip>
                                )}
                            </div>
                            <div className="text-xs text-foreground-500">{computePercentage(liquidityPool.fee, 1, 5)}%</div>
                        </div>
                    </div>
                    <Spacer y={2} />
                    <XsSnippet text={liquidityPool.poolAddress ?? ""} />                  
                </div>
                <div className="flex items-center gap-2">
                    <Chip color="primary" variant="flat">{apr}% APR</Chip>
                </div>
            </div>
        </motion.div>
    )
}