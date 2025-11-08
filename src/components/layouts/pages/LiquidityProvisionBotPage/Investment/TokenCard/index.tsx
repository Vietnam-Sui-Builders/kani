import { useBalanceSwr } from "@/hooks/reuseable"
import { TokenSchema } from "@/modules/types"
import React from "react"
import { KaniAvatar, KaniChip } from "@/components"
import { Spacer, Divider, cn } from "@heroui/react"
import { GasPumpIcon, StarIcon } from "@phosphor-icons/react"
import { TooltipTitle } from "@/components"

export enum TokenCardType {
    PriorityToken = "priorityToken",
    GasToken = "gasToken",
}

export interface TokenCardProps {
    token: TokenSchema
    ownerAddress: string
    type: TokenCardType
    limit: number
}

export const TokenCard = ({ token, ownerAddress, type, limit }: TokenCardProps) => {
    const { data } = useBalanceSwr({
        tokenId: token.displayId,
        ownerAddress: ownerAddress,
    })

    const isLimitReached = data?.balance.lte(limit)
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
                    {data?.balance.toString()}
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
                            {data?.balance.toString()}
                        </div>
                    </div>
                    {isLimitReached && (
                        <div className="text-xs text-warning ">
                            You need at least 10 USDC usable to continue. Please deposit more.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
