"use client"

import React, { useEffect, useState } from "react"
import {
    KaniCard,
    KaniCardBody,
    KaniLink,
    TooltipTitle,
    useLiquidityProvisionContext,
} from "@/components"
import { Spacer } from "@heroui/react"
import { motion, AnimatePresence } from "framer-motion"
import { DetectionRecord } from "./DetectionRecord"

export interface Detection {
    message: string
    riskLevel: "low" | "medium" | "high" | "critical"
    title: string
    timestamp: Date
}

export const AIRiskDetection = () => {
    const { previewOnly } = useLiquidityProvisionContext()

    const detectionsData: Array<Detection> = [
        {
            title: "Large CEX Order Detected",
            message:
                "A large buy order for BTC has been detected on Binance, indicating potential upward momentum.",
            riskLevel: "medium",
            timestamp: new Date(),
        },
        {
            title: "Oracle Price Updated",
            message:
                "The on-chain oracle (Pyth) has just updated BTC/USD price from $67,240 → $67,550.",
            riskLevel: "low",
            timestamp: new Date(),
        },
        {
            title: "Significant ETH Price Drop",
            message:
                "ETH price dropped 2.4% within 10 minutes across major CEXs. Possible short-term correction incoming.",
            riskLevel: "high",
            timestamp: new Date(),
        },
        {
            title: "Unusual Liquidity Movement",
            message:
                "Over $1.2M liquidity was removed from the SOL/USDC pool on Raydium in the past 5 minutes.",
            riskLevel: "medium",
            timestamp: new Date(),
        },
        {
            title: "TWAP Divergence Detected",
            message:
                "Current spot price is diverging from 15-min TWAP by 2.1%. Oracle or market lag possible.",
            riskLevel: "medium",
            timestamp: new Date(),
        },
        {
            title: "Funding Rate Spike",
            message:
                "BTC funding rate on Binance Futures jumped from 0.01% → 0.05%, signaling high long interest.",
            riskLevel: "high",
            timestamp: new Date(),
        },
        {
            title: "Oracle Feed Delay",
            message:
                "Pyth oracle for ETH/USD has not updated for 45 seconds, potential stale data risk.",
            riskLevel: "critical",
            timestamp: new Date(),
        },
    ]

    const [detections, setDetections] = useState<Array<Detection>>([])
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            const next = detectionsData[index % detectionsData.length]
            const newDetection = {
                ...next,
                timestamp: new Date(),
            }

            // Thêm detection mới vào đầu, giữ lại 3 cái gần nhất
            setDetections((prev) => [newDetection, ...prev].slice(0, 3))
            setIndex((i) => i + 1)
        }, 4000)

        return () => clearInterval(interval)
    }, [index])

    return (
        <KaniCard>
            <KaniCardBody>
                <div className="flex justify-between items-center">
                    <TooltipTitle
                        title="AI Risk Detection"
                        tooltipString="The AI risk detection of the liquidity provision bot."
                    />
                    <KaniLink
                        size="sm"
                        color="secondary"
                        href="/dashboard/liquidity-provision/id/liquidity-pools"
                    >
                        Manage
                    </KaniLink>
                </div>
                <Spacer y={4} />

                {previewOnly && (
                    <div className="relative h-[400px] overflow-hidden flex flex-col gap-4">
                        <AnimatePresence>
                            {detections.map((detection, i) => (
                                <motion.div
                                    key={detection.title + detection.timestamp.getTime()}
                                    className="absolute w-full"
                                    style={{ top: `${i * 130}px` }} // khoảng cách giữa các item
                                    initial={{ opacity: 0, x: 80 }}
                                    animate={{
                                        opacity: 1,
                                        x: 0,
                                        transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1.0] },
                                    }}
                                    exit={{
                                        opacity: 0,
                                        x: -60,
                                        transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] },
                                    }}
                                >
                                    <DetectionRecord {...detection} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}
            </KaniCardBody>
        </KaniCard>
    )
}
