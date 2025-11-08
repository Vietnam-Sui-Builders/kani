import { useFormik } from "formik"
import * as Yup from "yup"
import { useContext } from "react"
import { FormikContext } from "./FormikContext"
import { useConfirmTOTPModalDisclosure } from "../discloresure"

// Form values type — only one field for the 6-digit OTP code
export interface ConfirmTotpFormikValues {
    otp: string
    // a callback function to be called after the OTP is confirmed
    next?: (totp: string) => void | Promise<void>
}

// Validation schema for the OTP form
const validationSchema = Yup.object({
    otp: Yup.string()
        .length(6, "OTP must be exactly 6 digits")
        .matches(/^\d+$/, "OTP must contain only digits")
        .required("OTP is required"),
})

const initialValues: ConfirmTotpFormikValues = {
    otp: "",
}

// Core hook — creates the Formik instance for the TOTP form
export const useConfirmTotpFormikCore = () => {
    const { onClose } = useConfirmTOTPModalDisclosure()
    return useFormik<ConfirmTotpFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values, { resetForm }) => {
            await values.next?.(values.otp)
            // reset the whole form
            resetForm()
            // close the form
            onClose()
        },
    })
}

// Context hook — retrieves the Formik instance from the FormikProvider
export const useConfirmTotpFormik = () => {
    const { confirmTotpFormik } = useContext(FormikContext)!
    return confirmTotpFormik
}