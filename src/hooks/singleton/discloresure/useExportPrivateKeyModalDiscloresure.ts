import { useDisclosure } from "@heroui/react"
import { useContext } from "react"
import { DiscloresureContext } from "./DiscloresureContext"

export const useExportPrivateKeyModalDisclosureCore = () => useDisclosure()

export const useExportPrivateKeyModalDisclosure = () => {
    const { exportPrivateKeyModal } = useContext(DiscloresureContext)!
    return exportPrivateKeyModal
}