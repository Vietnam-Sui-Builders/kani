import { TokenSchema } from "@/modules/types"
import React from "react"
import { KaniAvatar, KaniChip } from "@/components"
import { Spacer, Divider, cn } from "@heroui/react"
import { GasPumpIcon, StarIcon } from "@phosphor-icons/react"
import { TooltipTitle } from "@/components"
import { TokenCardType } from "../TokenCard"

export interface TokenCardPreviewProps {
    token: TokenSchema
    ownerAddress: string
    type: TokenCardType
    balance: number
    usableBalance: number
}

export const TokenCardPreview = ({ token, type, balance, usableBalance }: TokenCardPreviewProps) => {
    const renderChips = () => {
        switch (type) {
        case TokenCardType.PriorityToken: {
            return <KaniChip color="primary" size="sm" variant="flat">
                <div className="flex items-center gap-1">
                    <StarIcon className="w-4 h-4" />
                    Priority
                </div>
            </KaniChip>
        }
        case TokenCardType.GasToken: {
            return <KaniChip color="secondary" size="sm" variant="flat">
                <div className="flex items-center gap-1">
                    <GasPumpIcon className="w-4 h-4" />
                    Gas
                </div>
            </KaniChip>
        }
        }
    }
    return (
        <div className="bg-content2 rounded-large min-w-[200px]">
            <div className="px-3 py-2">
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                        <KaniAvatar src={token?.iconUrl}/>
                        <div>
                            <div className="text-sm">{token?.name}</div>
                            <div className="text-xs text-foreground-500">{token?.symbol}</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        {renderChips()}
                    </div>
                </div>
                <Spacer y={2} />
                <TooltipTitle 
                    classNames={{
                        title: "text-xs text-foreground-500", 
                    }}
                    title="Usable Amount" 
                    tooltipString="The usable amount of the token." 
                />
                <div className={cn(
                    "text-2xl font-bold"
                )}>
                    {usableBalance}
                </div>
            </div>
            <Divider/>
            <div className="px-3 py-2">
                <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 justify-between">
                        <div className="text-xs text-foreground-500">
                            Balance
                        </div>
                        <div className="text-xs">
                            {balance} USD
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
