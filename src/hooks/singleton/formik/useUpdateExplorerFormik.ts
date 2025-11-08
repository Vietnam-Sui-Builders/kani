import { ExplorerId } from "@/modules/blockchain"
import { useFormik } from "formik"
import { useContext } from "react"
import * as Yup from "yup"
import { FormikContext } from "./FormikContext"
import { useQueryLiquidityProvisionSwr, useUpdateLiquidityProvisionBotExplorerIdSwrMutation } from "../swr"
import { runGraphQLWithToast } from "@/components/toasts"
import { setLiquidityProvisionBot, useAppDispatch, useAppSelector } from "@/redux"

export interface UpdateExplorerFormikValues {
    explorerId: ExplorerId
    id: string
}

const initialValues: UpdateExplorerFormikValues = {
    explorerId: ExplorerId.SuiVision,
    id: "",
}

const validationSchema = Yup.object({
    explorerId: Yup.string().required(),
    id: Yup.string().required(),
})

export const useUpdateExplorerFormikCore = () => {
    const updateLiquidityProvisionBotExplorerIdMutation = useUpdateLiquidityProvisionBotExplorerIdSwrMutation()
    const queryLiquidityProvisionSwr = useQueryLiquidityProvisionSwr()
    const liquidityProvisionBot = useAppSelector((state) => state.session.liquidityProvisionBot)
    const dispatch = useAppDispatch()
    return useFormik<UpdateExplorerFormikValues>({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            if (!values.explorerId) {
                throw new Error("Explorer id is required")
            }
            await runGraphQLWithToast(async () => {
                const response = await updateLiquidityProvisionBotExplorerIdMutation.trigger({
                    id: values.id,
                    explorerId: values.explorerId,
                })
                if (!response.data?.updateLiquidityProvisionBotExplorerId) {
                    throw new Error("Failed to update liquidity provision bot explorer id")
                }
                // optimistic update
                if (liquidityProvisionBot) {
                    dispatch(
                        setLiquidityProvisionBot(
                            {
                                ...liquidityProvisionBot,
                                explorerId: values.explorerId,
                            }
                        ))
                }
                // fetch the latest data
                await queryLiquidityProvisionSwr.mutate()
                return response.data.updateLiquidityProvisionBotExplorerId
            })
        },
    })
}

export const useUpdateExplorerFormik = () => {
    const { updateExplorerFormik } = useContext(FormikContext)!
    return updateExplorerFormik
}