"use client"
import React, { PropsWithChildren } from "react"
import { createContext } from "react"
import { useConnectModalDisclosureCore } from "./useConnectModalDiscloresure"
import { useExportPrivateKeyModalDisclosureCore } from "./useExportPrivateKeyModalDiscloresure"
import { useConfirmTOTPModalDisclosureCore } from "./useConfirmTOTPModalDiscloresure"
import { useDepositModalDisclosureCore } from "./useDepositModalDiscloreusre"
import { useUpdateExplorerModalDisclosureCore } from "./useUpdateExplorerModalDiscloresure"
import { useUpdateRpcsModalDisclosureCore } from "./useUpdateRpcsModalDiscloresure"

export interface DiscloresureContextType {
    connectModal: ReturnType<typeof useConnectModalDisclosureCore>
    exportPrivateKeyModal: ReturnType<typeof useExportPrivateKeyModalDisclosureCore>
    confirmTOTPModal: ReturnType<typeof useConfirmTOTPModalDisclosureCore>
    depositModal: ReturnType<typeof useDepositModalDisclosureCore>
    updateExplorerModal: ReturnType<typeof useUpdateExplorerModalDisclosureCore>
    updateRpcsModal: ReturnType<typeof useUpdateRpcsModalDisclosureCore>
}

export const DiscloresureContext = createContext<DiscloresureContextType | null>(null)

export const DiscloresureProvider = ({ children }: PropsWithChildren) => {
    const connectModal = useConnectModalDisclosureCore()
    const exportPrivateKeyModal = useExportPrivateKeyModalDisclosureCore()
    const confirmTOTPModal = useConfirmTOTPModalDisclosureCore()
    const depositModal = useDepositModalDisclosureCore()
    const updateExplorerModal = useUpdateExplorerModalDisclosureCore()
    const updateRpcsModal = useUpdateRpcsModalDisclosureCore()
    return (
        <DiscloresureContext.Provider value={{ 
            connectModal, 
            exportPrivateKeyModal, 
            confirmTOTPModal, 
            depositModal, 
            updateExplorerModal, 
            updateRpcsModal
        }}>
            {children}
        </DiscloresureContext.Provider>
    )
}