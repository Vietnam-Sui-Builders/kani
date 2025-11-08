import React, { useEffect } from "react"
import { 
    KaniModal, 
    KaniModalContent, 
    KaniModalHeader, 
    KaniModalBody, 
    KaniButton, 
    KaniModalFooter, 
    KaniImage,
    KaniCard,
    KaniCardBody,
    KaniChip,
} from "../../atomic"
import { Spacer, cn } from "@heroui/react"
import { useUpdateExplorerModalDisclosure, useUpdateExplorerFormik } from "@/hooks/singleton"
import { ExplorerId, getExplorerMetadata } from "@/modules/blockchain"
import { useAppSelector } from "@/redux"
import { getAsset, explorerAssetConfig } from "@/assets"
import { ChainId } from "@/modules/types"

export const UpdateExplorerModal = () => {
    const { isOpen, onOpenChange } = useUpdateExplorerModalDisclosure()
    const formik = useUpdateExplorerFormik()
    const id = useAppSelector((state) => state.session.liquidityProvisionBot?.id)
    const liquidityProvisionBot = useAppSelector((state) => state.session.liquidityProvisionBot)
  
    useEffect(() => {
        formik.setFieldValue("id", id)
    }, [id])
    
    // we retrieve the chainId and the default explorerId
    const chainId = liquidityProvisionBot?.chainId
    const defaultExplorerMetadata = getExplorerMetadata({ chainId: chainId ?? ChainId.Sui })
    const explorerId = liquidityProvisionBot?.explorerId ?? defaultExplorerMetadata.explorerId
  
    useEffect(() => {
        if (explorerId) {
            formik.setFieldValue("explorerId", explorerId)
        }
    }, [explorerId])
  
    if (!liquidityProvisionBot || !chainId) return null
  
    const explorerMetadatas = Object.values(ExplorerId)
        .map((explorerId) =>
            getExplorerMetadata({ chainId, explorerId })
        )
        .filter((explorerMetadata) => explorerMetadata.chainId === chainId)  
    return (
        <KaniModal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader title="Update Explorer" />
                <KaniModalBody>
                    <div className="grid grid-cols-2 gap-2">
                        {explorerMetadatas.map((meta) => (
                            <KaniCard
                                key={meta.explorerId}
                                isPressable
                                isHoverable
                                onPress={() => formik.setFieldValue("explorerId", meta.explorerId)}
                                className={cn(
                                    "transition-all duration-300",
                                    {
                                        "bg-primary/20 ring ring-primary": formik.values.explorerId  === meta.explorerId,
                                    }
                                )}
                            >
                                <KaniCardBody className="p-3 flex flex-col items-center text-center">
                                    <KaniImage
                                        src={
                                            getAsset(
                                                explorerAssetConfig()[chainId]?.[meta.explorerId] ?? {}
                                            )
                                        }
                                        className="w-16 h-16"
                                    />
                                    <Spacer y={2} />
                                    <span className="font-medium">{meta.name}</span>
                                    <Spacer y={2} />
                                    {meta.recommended && (
                                        <KaniChip variant="flat" color="secondary">
                        Recommended
                                        </KaniChip>
                                    )}
                                </KaniCardBody>
                            </KaniCard>
                        ))}
                    </div>
                </KaniModalBody>
  
                <KaniModalFooter>
                    <KaniButton
                        fullWidth
                        color="primary"
                        isDisabled={
                            (!formik.isValid) || (
                                formik.values.explorerId === explorerId
                            )}
                        isLoading={formik.isSubmitting}
                        onPress={formik.submitForm}
                    >
              Confirm
                    </KaniButton>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>
    )
}