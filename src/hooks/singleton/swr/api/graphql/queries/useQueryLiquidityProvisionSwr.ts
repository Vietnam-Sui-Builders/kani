import { queryLiquidityProvisionBot } from "@/modules/api"
import { SwrContext } from "../../../SwrContext"
import { useContext } from "react"
import { setLiquidityProvisionBot, useAppDispatch, useAppSelector } from "@/redux"
import useSWR from "swr"
import { useParams } from "next/navigation"

export const useQueryLiquidityProvisionSwrCore = () => {
    const { id } = useParams()
    const idString = id as string
    const dispatch = useAppDispatch()
    const totpVerified = useAppSelector((state) => state.session.totpVerified)
    // if id and totpVerified are not null, then return the id
    const swrMutation = useSWR(
        (idString && totpVerified) ? ["QUERY_LIQUIDITY_PROVISION_SWR_MUTATION", idString] : null,
        async () => {
            if (!idString) {
                throw new Error("Id is required")
            }
            const data = await queryLiquidityProvisionBot({
                request: {
                    id: idString,
                },
            })
            const liquidityProvisionBot = data.data?.liquidityProvisionBot
            if (!liquidityProvisionBot) {
                throw new Error("Liquidity provision bot not found")
            }
            dispatch(setLiquidityProvisionBot(liquidityProvisionBot.data!))
            return data
        }
    )
    return swrMutation
}

export const useQueryLiquidityProvisionSwr = () => {
    const { queryLiquidityProvision } = useContext(SwrContext)!
    return queryLiquidityProvision
}
