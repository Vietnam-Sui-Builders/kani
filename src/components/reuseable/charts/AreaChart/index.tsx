"use client"

import React from "react"
import {
    AreaChart as RechartsAreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
} from "recharts"
import "./gradient-animation.css" // import CSS riêng để animation mượt hơn

const data = [
    { day: "Mon", value: 10000 },
    { day: "Tue", value: 10800 },
    { day: "Wed", value: 10600 },
    { day: "Thu", value: 11500 },
    { day: "Fri", value: 12000 },
    { day: "Sat", value: 13400 },
    { day: "Sun", value: 14100 },
]

export const AreaChart = () => {
    return (
        <div style={{ width: "100%", height: 300 }}>
            <ResponsiveContainer>
                <RechartsAreaChart
                    data={data}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                >
                    {/* Gradient có animation đổi màu */}
                    <defs>
                        <linearGradient
                            id="colorValue"
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                            className="animated-gradient"
                        >
                            <stop offset="5%" stopColor="hsl(var(--heroui-primary))" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="hsl(var(--heroui-secondary))" stopOpacity={0} />
                        </linearGradient>
                    </defs>

                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#666" }}
                    />
                    <YAxis
                        hide={true}
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#666" }}
                        domain={["dataMin - 300", "dataMax + 300"]}
                    />
                    <Tooltip
                        contentStyle={{
                            fontSize: 12,
                            borderRadius: 8,
                            border: "1px solid #ddd",
                        }}
                        cursor={{ stroke: "#ccc", strokeWidth: 1 }}
                        formatter={(v: number) => [`$${v.toLocaleString()}`, "Value"]}
                        labelStyle={{ fontWeight: 500 }}
                    />

                    <Area
                        type="monotone"
                        dataKey="value"
                        stroke="hsl(var(--heroui-primary))"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                        dot={false}
                        activeDot={false}
                    />
                </RechartsAreaChart>
            </ResponsiveContainer>
        </div>
    )
}