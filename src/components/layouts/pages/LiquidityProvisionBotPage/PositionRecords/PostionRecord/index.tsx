import { XsSnippet } from "@/components/reuseable/XsSnippet"
import { TokenSchema } from "@/modules/types"
import React from "react"

export interface PostionRecordProps {
    id: string
    pnl: number
    amount: number
    token: TokenSchema
    txHash: string
    isClosed: boolean
}
export const PostionRecord = ({ pnl, amount, token, txHash, isClosed }: PostionRecordProps) => {
    return (
        <div>
            <div className="text-sm p-3 rounded-xl border border-foreground-500/10 gap-2">
                <div className="flex items-center gap-2">
                    <div className="font-bold">{isClosed ? "Close Position & Take Profit" : "Open Position"}</div>
                </div>
                <div className={`text-sm ${isClosed ? "text-success" : "text-secondary"}`}>
                    {isClosed ? "+" : ""}{amount.toFixed(2)} {token.symbol} ({pnl.toFixed(2)} USD)
                </div>
                <XsSnippet text={txHash ?? ""} />    
            </div>
        </div>
    )
}