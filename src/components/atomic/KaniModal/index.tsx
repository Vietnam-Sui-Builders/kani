
import {
    Modal,
    ModalProps,
    ModalContentProps,
    ModalBodyProps,
    ModalContent,
    ModalHeader,
    ModalBody,
    cn,
    ModalFooter,
    ModalFooterProps,
    HTMLHeroUIProps,
    Spacer
} from "@heroui/react"
import React from "react"

export const KaniModal = (props: ModalProps) => {
    return <Modal {...props} />
}

export const KaniModalContent = (props: ModalContentProps) => {
    return <ModalContent className={
        cn("p-0", props.className)
    } {...props} />
}

export interface KaniModalHeaderProps extends HTMLHeroUIProps<"div"> {
    title: string;
    description?: React.ReactNode;
}

export const KaniModalHeader = (props: KaniModalHeaderProps) => {
    return (
        <ModalHeader className="justify-center p-4 pb-2" {...props}>
            <div className="text-center">
                <div className="text-lg font-bold">{props.title}</div>
                {props.description && (
                    <>
                        <Spacer y={2}/>
                        <div className="text-xs text-foreground-500 font-normal">{props.description}</div>
                    </>
                )}
            </div>
        </ModalHeader>
    )
}

export const KaniModalBody = (props: ModalBodyProps) => {
    return <ModalBody className={cn("gap-0 p-4", props.className)} {...props} />
}

export const KaniModalFooter = (props: ModalFooterProps) => {
    return <ModalFooter className={cn("p-4 justify-center pt-2", props.className)} {...props} />
}
