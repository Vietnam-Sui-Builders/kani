import React, { useEffect, useState } from "react"
import { KaniCard, KaniCardBody, KaniCardHeader, mockTokens } from "@/components"
import { PostionRecord, PostionRecordProps } from "./PostionRecord"
import { v4 as uuidv4 } from "uuid"
import { AnimatePresence, motion } from "framer-motion"

export const PositionRecords = () => {
    const [positionRecords, setPositionRecords] = useState<Array<PostionRecordProps>>([])
    const addresses = [
        "0x2a8b67cf92f6f1b941df35e76b923fa7c3d67c238a4e7cb0adcb8aefb5f2c0b6",
        "0x6dfad7128e481d2a84f523e5f7a1cb89366ce4b3e9b40f46a83a5a9b8a6a9a6d",
        "0x9c7e5a3d182f0a16b2f73e5e0ab9c23c46b829ec9f2c41ef3a6bb0c6b52f1d44",
        "0x45b3f7eab9c2e58e6f9e3a234e7cfb85a9e1c46f3e0a7c12b8d5f4e3b9a2c1f8",
        "0x1d6c9f3a827b5e1a34f7d8e9b2a0c4e5f6b7a8d9c0e1f2a3b4c5d6e7f8091a2b",
    ]
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            const amount = Math.random() * 100
            const nextIndex = index % addresses.length
            const newRecord: PostionRecordProps = {
                id: uuidv4(),
                pnl: amount,
                amount,
                isClosed: index % 2 === 0,
                token: mockTokens.find((token) => token.id === "USDC")!,
                txHash: addresses[nextIndex],
            }

            // giữ lại tối đa 3 record mới nhất
            setPositionRecords((prev) => [newRecord, ...prev].slice(0, 3))
            setIndex(nextIndex + 1)
        }, 5000)
        return () => clearInterval(interval)
    }, [index])

    return (
        <KaniCard>
            <KaniCardHeader
                title="Position Records"
                description="The position records of the liquidity provision bot."
            />
            <KaniCardBody
                className="flex flex-col gap-2 overflow-hidden"
                style={{
                    height: "320px", // cố định chiều cao
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                }}
            >
                <AnimatePresence initial={false}>
                    {positionRecords.map((record) => (
                        <motion.div
                            key={record.id}
                            layout
                            initial={{ opacity: 0, y: -12 }}
                            animate={{
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.45,
                                    ease: [0.25, 0.1, 0.25, 1.0],
                                },
                            }}
                            exit={{
                                opacity: 0,
                                y: 16,
                                transition: {
                                    duration: 0.35,
                                    ease: [0.25, 0.1, 0.25, 1.0],
                                },
                            }}
                        >
                            <PostionRecord {...record} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </KaniCardBody>
        </KaniCard>
    )
}