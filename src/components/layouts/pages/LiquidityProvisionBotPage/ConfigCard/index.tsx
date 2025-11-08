import { KaniCard, KaniCardBody, useLiquidityProvisionContext } from "@/components"
import { Spacer } from "@heroui/react"
import React from "react"
import { WalletSection } from "./WalletSection"
import { ExplorerSection } from "./ExplorerSection"
import { RPCsSection } from "./RPCsSection"

export const ConfigCard = () => {
    const { previewOnly } = useLiquidityProvisionContext()  
    return (
        <KaniCard>
            <KaniCardBody>
                <WalletSection />
                <Spacer y={6} />
                {!previewOnly && <ExplorerSection />}
                <Spacer y={6} />
                <RPCsSection />
            </KaniCardBody>
        </KaniCard>
    )
}