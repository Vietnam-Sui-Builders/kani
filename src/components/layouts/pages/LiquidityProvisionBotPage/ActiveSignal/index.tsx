import React from "react"
import { motion } from "framer-motion"

export const ActiveSignal: React.FC = () => {
    const bars = [0.5, 0.8, 1, 0.8, 0.5] 
    
    const getDelay = (index: number) => {
        const centerIndex = (bars.length - 1) / 2
        const distanceFromCenter = Math.abs(index - centerIndex)
        return distanceFromCenter * 0.12
    }

    return (
        <div className="flex items-end justify-center gap-[2px] h-[12px]">
            {bars.map((baseScale, i) => (
                <motion.div
                    key={i}
                    className="w-[2.5px] rounded-[1px]"
                    style={{
                        height: "12px",
                        transformOrigin: "center center",
                        background: "linear-gradient(to top, hsl(var(--heroui-primary)), hsl(var(--heroui-secondary)))",
                    }}
                    animate={{
                        scaleY: [baseScale * 0.6, baseScale * 1.4, baseScale * 0.6],
                        scaleX: [1, 1.2, 1],
                        opacity: [0.6, 1, 0.6],
                    }}
                    transition={{
                        duration: 1.2,
                        ease: "easeInOut",
                        repeat: Infinity,
                        delay: getDelay(i),
                    }}
                />
            ))}
        </div>
    )
}