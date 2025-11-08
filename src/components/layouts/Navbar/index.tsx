import { 
    KaniButton,
    KaniNavbar, 
    KaniNavbarBrand, 
    KaniNavbarContent, 
    KaniNavbarItem
} from "../../atomic"
import { Link } from "@heroui/react"
import React, { useState } from "react"
import { ConnectModal, useCurrentWallet } from "@mysten/dapp-kit"
import { centerPad } from "@/modules/utils"

export const Navbar = () => {
    const currentWallet = useCurrentWallet()
    const [open, setOpen] = useState(false)
    return (
        <KaniNavbar>
            <KaniNavbarBrand>
                <p className="font-bold text-inherit">KANI</p>
            </KaniNavbarBrand>
            <KaniNavbarContent className="hidden sm:flex gap-4" justify="center">
                <KaniNavbarItem>
                    <Link color="foreground" href="#">
            Home
                    </Link>
                </KaniNavbarItem>
                <KaniNavbarItem isActive>
                    <Link aria-current="page" href="#">
            Dashboard
                    </Link>
                </KaniNavbarItem>
                <KaniNavbarItem>
                    <Link color="foreground" href="#">
            Documentation
                    </Link>
                </KaniNavbarItem>
            </KaniNavbarContent>
            <KaniNavbarContent justify="end" className="px-0">
                {/* <KaniNavbarItem className="hidden lg:flex">
                    <KaniButton onPress={() => {
                        apiAuthRedirect.redirectGoogle(router)
                    }}>Login</KaniButton>
                </KaniNavbarItem> */}
                {currentWallet.isConnected ? 
                    <KaniButton>{centerPad(currentWallet.currentWallet?.accounts[0].address ?? "", 10, 4)}</KaniButton>
                    : <ConnectModal
                        trigger={
                            <KaniButton>Connect Wallet</KaniButton>
                        }
                        open={open}
                        onOpenChange={(isOpen) => setOpen(isOpen)}
                    />
                }
            </KaniNavbarContent>
        </KaniNavbar>
    )
}