import React from "react"
import { KaniModal, KaniModalContent, KaniModalHeader, KaniModalBody, KaniInputOtp, KaniButton, KaniModalFooter, KaniLink } from "../../atomic"
import { useConfirmTOTPModalDisclosure, useConfirmTotpFormik } from "@/hooks/singleton"

export const ConfirmTOTPModal = () => {
    const { isOpen, onOpenChange } = useConfirmTOTPModalDisclosure()
    const formik = useConfirmTotpFormik()
    return (
        <KaniModal size="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
            <KaniModalContent>
                <KaniModalHeader title="Confirm TOTP" description={
                    <div>
                     Please enter the code from your phone app like
                        <KaniLink
                            className="text-foreground-500 text-xs"
                            color="foreground"
                            underline="always"
                            href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2"
                            target="_blank"
                        >
                         Google Authenticator
                        </KaniLink>
                     &nbsp;or&nbsp;
                        <KaniLink
                            className="text-foreground-500 text-xs"
                            color="foreground"
                            underline="always"
                            href="https://authy.com/"
                            target="_blank"
                        >
                         Authy
                        </KaniLink>
                     .
                    </div>
                } />
                <KaniModalBody>
                    <div className="flex flex-col items-center justify-center">
                        <KaniInputOtp
                            value={formik.values.otp}
                            onValueChange={(value) => {
                                formik.setFieldValue("otp", value)
                            }}
                            length={6}
                            errorMessage={formik.errors.otp}
                            isInvalid={!!(formik.errors.otp && formik.touched.otp)}
                            onBlur={() => {
                                formik.setFieldTouched("otp", true)
                            }}
                        />
                    </div>
                </KaniModalBody>
                <KaniModalFooter>
                    <KaniButton 
                        isDisabled={!formik.isValid}
                        isLoading={formik.isSubmitting}
                        fullWidth 
                        color="primary"
                        onPress={
                            async () => {
                                await formik.submitForm()
                            }
                        }>
                        Confirm
                    </KaniButton>
                </KaniModalFooter>
            </KaniModalContent>
        </KaniModal>
    )
}