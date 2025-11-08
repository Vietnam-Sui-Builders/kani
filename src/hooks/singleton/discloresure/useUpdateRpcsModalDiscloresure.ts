import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useUpdateRpcsModalDisclosureCore = () => useDisclosure()

export const useUpdateRpcsModalDisclosure = () => {
    const { updateRpcsModal } = useContext(DiscloresureContext)!
    return updateRpcsModal
}