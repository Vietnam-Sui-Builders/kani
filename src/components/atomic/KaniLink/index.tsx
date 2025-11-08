import { Link, LinkProps, cn } from "@heroui/react"
import React from "react"

export const KaniLink = (props: LinkProps) => {
    return <Link {...props} 
        className={cn(props.className, "cursor-pointer", {
            "text-foreground-500": !props.color || props.color === "foreground",
        })} />
}