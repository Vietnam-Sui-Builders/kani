import { useFormik } from "formik"
import { useContext } from "react"
import * as Yup from "yup"
import { FormikContext } from "./FormikContext"
import { useQueryLiquidityProvisionSwr, useUpdateLiquidityProvisionBotRpcsSwrMutation } from "../swr"
import { runGraphQLWithToast } from "@/components"
import { setLiquidityProvisionBot, useAppDispatch, useAppSelector } from "@/redux"

export interface UpdateRpcsFormikValues {
    rpcUrls: string[]
    addRpcUrl: string
    id: string
}

const initialValues: UpdateRpcsFormikValues = {
    rpcUrls: [],
    addRpcUrl: "",
    id: "",
}

const validationSchema = Yup.object({
    rpcUrls: Yup.array()
        .of(
            Yup.string()
                .trim()
                .url("RPC URL must be a valid URL")
                .required("RPC URL cannot be empty")
        )
        .min(1, "At least one RPC URL is required")
        .required("RPC URLs are required")
        .test(
            "unique",
            "Duplicate RPC URLs are not allowed",
            (rpcUrls) => {
                if (!rpcUrls) return true
                const unique = new Set(rpcUrls.map((url) => url.trim()))
                return unique.size === rpcUrls.length
            }
        ),
    addRpcUrl: Yup.string()
        .trim()
        .url("RPC must be a valid URL")
        .nullable(),
    id: Yup.string().required("Bot ID is required"),
})

export const useUpdateRpcsFormikCore = () => {
    const updateLiquidityProvisionBotRpcsMutation = useUpdateLiquidityProvisionBotRpcsSwrMutation()
    const queryLiquidityProvisionSwr = useQueryLiquidityProvisionSwr()
    const liquidityProvisionBot = useAppSelector((state) => state.session.liquidityProvisionBot)
    const dispatch = useAppDispatch()
    return useFormik<UpdateRpcsFormikValues>({
        initialValues,
        validationSchema,
        validateOnChange: true,
        validateOnBlur: true,

        onSubmit: async (values) => {
            await runGraphQLWithToast(async () => {
                const response = await updateLiquidityProvisionBotRpcsMutation.trigger({
                    id: values.id,
                    rpcUrls: values.rpcUrls,
                })
                if (!response.data?.updateLiquidityProvisionBotRpcs) {
                    throw new Error("Failed to update liquidity provision bot RPCs")
                }
                // optimistic update
                if (liquidityProvisionBot) {
                    dispatch(setLiquidityProvisionBot({
                        ...liquidityProvisionBot,
                        rpcUrls: values.rpcUrls,
                    }))
                }
                await queryLiquidityProvisionSwr.mutate()
                return response.data.updateLiquidityProvisionBotRpcs
            })
        },
    })
}

export const useUpdateRpcsFormik = () => {
    const { updateRpcsFormik } = useContext(FormikContext)!
    return updateRpcsFormik
}