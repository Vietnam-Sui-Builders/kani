"use client"
import React from "react"
import { LiquidityProvisionBotPage } from "@/components"
import { Spacer } from "@heroui/react"

const Page = () => {
    return <div className="mx-auto flex flex-col items-center w-full">
        <Spacer y={6} />
        <LiquidityProvisionBotPage />
    </div>
}

export default Page