import React from "react"
import { KaniImage, KaniLink, KaniSkeleton, TooltipTitle } from "@/components"
import { Spacer } from "@heroui/react"
import { useAppSelector } from "@/redux"
import { getExplorerMetadata } from "@/modules/blockchain"
import { ChainId } from "@/modules/types"
import { GearSixIcon } from "@phosphor-icons/react"
import { useUpdateExplorerModalDisclosure } from "@/hooks/singleton"
import { explorerAssetConfig, getAsset } from "@/assets"

const ExplorerRow = ({ icon, name, isLoading, onClick }: {
    icon?: string
    name?: string
    isLoading?: boolean
    onClick?: () => void
}) => (
    <div className="flex items-center gap-2 justify-between w-full">
        <div className="flex items-center gap-2">
            {isLoading ? (
                <>
                    <KaniSkeleton className="w-5 h-5 rounded-medium" />
                    <KaniSkeleton className="w-20 h-[14px] rounded-medium" />
                </>
            ) : (
                <>
                    <KaniImage src={icon} className="w-5 h-5" />
                    <div className="text-sm">{name}</div>
                </>
            )}
        </div>
        <KaniLink color="secondary" as="button" onPress={onClick}>
            <GearSixIcon className="w-5 h-5" />
        </KaniLink>
    </div>
)

export const ExplorerSection = () => {
    const liquidityProvisionBot = useAppSelector((s) => s.session.liquidityProvisionBot)
    const { onOpen } = useUpdateExplorerModalDisclosure()

    const chainId = liquidityProvisionBot?.chainId ?? ChainId.Sui
    const explorerMetadata = getExplorerMetadata({
        chainId,
        explorerId: liquidityProvisionBot?.explorerId,
    })

    const explorerAssetUrl = liquidityProvisionBot
        ? getAsset(
            explorerAssetConfig()[chainId]?.[
                liquidityProvisionBot.explorerId ??
                getExplorerMetadata({ chainId }).explorerId
            ] ?? {},
        )
        : undefined

    return (
        <div>
            <TooltipTitle
                title="Explorer"
                tooltipString="The preferred explorer."
            />
            <Spacer y={4} />
            <ExplorerRow
                icon={explorerAssetUrl}
                name={explorerMetadata.name}
                isLoading={!liquidityProvisionBot}
                onClick={onOpen}
            />
        </div>
    )
}