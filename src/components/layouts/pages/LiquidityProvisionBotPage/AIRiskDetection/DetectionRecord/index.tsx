import React from "react"
import dayjs from "dayjs"
export interface DetectionRecordProps {
    message: string 
    riskLevel: "low" | "medium" | "high" | "critical"
    title: string
    timestamp: Date
}
export const DetectionRecord = ({ message, riskLevel, title, timestamp }: DetectionRecordProps) => {
    const renderColor = (riskLevel: "low" | "medium" | "high" | "critical") => {
        switch (riskLevel) {
        case "low":
            return "text-gray-500"
        case "medium":
            return "text-yellow-500"
        case "high":
            return "text-orange-500"
        case "critical":
            return "text-red-500"
        }
    }
    return (
        <div>
            <div className="text-sm p-3 rounded-xl border border-foreground-500/10 gap-2">
                <div className="flex items-center gap-2">
                    <div className={`font-bold ${renderColor(riskLevel)}`}>{title}</div>
                </div>
                <div className={"text-sm"}>
                    {message}
                </div>
                <div className="text-xs text-foreground-500">
                    {dayjs(timestamp).format("DD/MM/YYYY HH:mm:ss")}
                </div>
            </div>
        </div>
    )
}