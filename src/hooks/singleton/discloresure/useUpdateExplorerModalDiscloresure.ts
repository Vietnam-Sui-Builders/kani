import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useUpdateExplorerModalDisclosureCore = () => useDisclosure()

export const useUpdateExplorerModalDisclosure = () => {
    const { updateExplorerModal } = useContext(DiscloresureContext)!
    return updateExplorerModal
}