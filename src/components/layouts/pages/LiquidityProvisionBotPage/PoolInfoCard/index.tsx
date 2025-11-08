import { KaniCard, KaniCardBody, TooltipTitle, useLiquidityProvisionContext } from "@/components"
import { Spacer } from "@heroui/react"
import { RangeVisual } from "@/components"
import React from "react"

export const PoolInfoCard = () => {
    const { previewOnly } = useLiquidityProvisionContext()
    return (
        <KaniCard>
            <KaniCardBody>
                {
                    previewOnly && (
                        <div>
                            <TooltipTitle
                                title="Price Range"
                                tooltipString="The price range of the pool."
                            />
                            <Spacer y={4} />
                            <div className="text-sm">
                    3.30699 - 3.66209
                            </div>
                            <Spacer y={4} />
                            <RangeVisual min={3.30699} max={3.66209} value={3.48454} />
                        </div>
                    )
                }
            </KaniCardBody>
        </KaniCard>
    )
}
