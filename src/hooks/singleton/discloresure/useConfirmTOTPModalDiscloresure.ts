import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useConfirmTOTPModalDisclosureCore = () => useDisclosure()

export const useConfirmTOTPModalDisclosure = () => {
    const { confirmTOTPModal } = useContext(DiscloresureContext)!
    return confirmTOTPModal
}