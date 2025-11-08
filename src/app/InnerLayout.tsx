"use client"
import { HeroUIProvider, ModalContainer, Navbar } from "@/components"
import { SingletonHookProvider } from "@/hooks/singleton"
import { ReduxProvider } from "@/redux"
import React, { Suspense } from "react"
import { ToastProvider } from "@heroui/toast"
import { IconContext } from "@phosphor-icons/react"
import { NextThemesProvider } from "@/components"
import {
    createNetworkConfig,
    SuiClientProvider,
    WalletProvider,
} from "@mysten/dapp-kit"
import { getFullnodeUrl } from "@mysten/sui/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import "@mysten/dapp-kit/dist/index.css"

const { networkConfig } = createNetworkConfig({
    mainnet: { url: getFullnodeUrl("mainnet") },
})
const queryClient = new QueryClient()

export const InnerLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Suspense>
            <QueryClientProvider client={queryClient}>
                <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
                    <WalletProvider>
                        <HeroUIProvider>
                            <NextThemesProvider
                                attribute="class"
                                defaultTheme="dark"
                                enableSystem
                            >
                                <ReduxProvider>
                                    <IconContext.Provider value={{ size: 20 }}>
                                        <SingletonHookProvider>
                                            <Navbar />
                                            {children}
                                            <ModalContainer />
                                            <ToastProvider />
                                        </SingletonHookProvider>
                                    </IconContext.Provider>
                                </ReduxProvider>
                            </NextThemesProvider>
                        </HeroUIProvider>
                    </WalletProvider>
                </SuiClientProvider>
            </QueryClientProvider>
        </Suspense>
    )
}
