"use client"
import React from "react"
import { type ThemeProviderProps } from "next-themes"
import dynamic from "next/dynamic"

const ThemeProvider = dynamic(
    () => import("next-themes").then((e) => e.ThemeProvider),
    {
        ssr: false,
    }
)

export const NextThemesProvider = ({ children, ...props }: ThemeProviderProps) => {
    return <ThemeProvider {...props}>{children}</ThemeProvider>
}