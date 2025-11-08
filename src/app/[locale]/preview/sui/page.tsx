"use client"

import React from "react"
import { LiquidityProvisionBotPage } from "@/components/layouts"
import { ChainId } from "@/modules/types"

const Page = () => {
    return (
        <LiquidityProvisionBotPage previewOnly={true} previewChainId={ChainId.Solana} />
    )
}

export default Page
