import React, { useEffect } from "react"
import { 
    KaniModal, 
    KaniModalContent, 
    KaniModalHeader, 
    KaniModalBody, 
    KaniButton, 
    KaniModalFooter,
    KaniInput, 
} from "../../atomic"
import { useUpdateRpcsModalDisclosure, useUpdateRpcsFormik } from "@/hooks/singleton"
import { useAppSelector } from "@/redux"
import { PlusIcon, TrashIcon } from "@phosphor-icons/react"
import { getIn } from "formik"

export const UpdateRpcsModal = () => {
    const { isOpen, onOpenChange } = useUpdateRpcsModalDisclosure()
    const formik = useUpdateRpcsFormik()
    const liquidityProvisionBot = useAppSelector((state) => state.session.liquidityProvisionBot)

    // Reset form when modal opens
    useEffect(() => {
        if (liquidityProvisionBot) {
            formik.setFieldValue("id", liquidityProvisionBot.id || "")
            formik.setFieldValue("rpcUrls", liquidityProvisionBot.rpcUrls || [])
            formik.setFieldValue("addRpcUrl", "")
            formik.setTouched({}, false)
        }
    }, [liquidityProvisionBot])

    // ---- Logic helpers ----
    const handleRpcChange = (index: number, value: string) => {
        const newRpcUrls = [...formik.values.rpcUrls]
        newRpcUrls[index] = value
        formik.setFieldValue("rpcUrls", newRpcUrls)
    }

    const handleRemoveRpc = (index: number) => {
        const newRpcUrls = formik.values.rpcUrls.filter((_, i) => i !== index)
        formik.setFieldValue("rpcUrls", newRpcUrls)
    }

    const handleAddRpcUrlChange = (value: string) => {
        formik.setFieldValue("addRpcUrl", value)
    }

    const handleAddRpc = async () => {
        const trimmedUrl = formik.values.addRpcUrl?.trim()
        if (!trimmedUrl) return

        // Let Formik + Yup validate addRpcUrl
        await formik.validateField("addRpcUrl")

        const hasError = getIn(formik.errors, "addRpcUrl")
        if (hasError) {
            formik.setFieldTouched("addRpcUrl", true)
            return // invalid -> don't add
        }

        // Add URL and clear field
        const newRpcUrls = [...formik.values.rpcUrls, trimmedUrl]
        formik.setFieldValue("rpcUrls", newRpcUrls)
        formik.setFieldValue("addRpcUrl", "")
    }

    // ---- Render ----
    return (
        <KaniModal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader 
                    title="Update RPCs" 
                    description="Please provide a list of RPC URLs to use for the liquidity provision bot."
                />

                <KaniModalBody className="gap-2 px-4">
                    {/* Existing RPCs */}
                    {formik.values.rpcUrls.map((rpcUrl, index) => {
                        const fieldName = `rpcUrls.${index}`
                        const error = getIn(formik.errors, fieldName)
                        const touched = getIn(formik.touched, fieldName)

                        return (
                            <div className="flex items-start gap-2" key={index}>
                                <KaniInput
                                    placeholder={`RPC URL #${index + 1}`}
                                    value={rpcUrl}
                                    onValueChange={(value) => handleRpcChange(index, value)}
                                    errorMessage={error}
                                    isInvalid={!!(error && touched)}
                                    onBlur={() => formik.setFieldTouched(fieldName, true)}
                                />
                                <KaniButton
                                    isIconOnly
                                    variant="flat"
                                    onPress={() => handleRemoveRpc(index)}
                                >
                                    <TrashIcon />
                                </KaniButton>
                            </div>
                        )
                    })}

                    {/* Add new RPC input */}
                    <div className="flex items-start gap-2">
                        <KaniInput
                            placeholder="RPC URL"
                            value={formik.values.addRpcUrl}
                            onValueChange={handleAddRpcUrlChange}
                            errorMessage={formik.errors.addRpcUrl}
                            isInvalid={!!(formik.errors.addRpcUrl && formik.touched.addRpcUrl)}
                            onBlur={() => formik.setFieldTouched("addRpcUrl", true)}
                        />
                        <KaniButton
                            isIconOnly
                            variant="flat"
                            onPress={handleAddRpc}
                        >
                            <PlusIcon />
                        </KaniButton>
                    </div>
                </KaniModalBody>

                <KaniModalFooter>
                    <KaniButton
                        fullWidth
                        color="primary"
                        isDisabled={!formik.isValid}
                        isLoading={formik.isSubmitting}
                        onPress={async () => {
                            await formik.submitForm()
                        }}
                    >
                        Confirm
                    </KaniButton>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>
    )
}