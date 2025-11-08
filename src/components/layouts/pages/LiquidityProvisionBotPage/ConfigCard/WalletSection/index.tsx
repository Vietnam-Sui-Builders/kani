import { TooltipTitle, KaniTooltip, KaniLink, KaniImage, KaniSnippet, runGraphQLWithToast, KaniSkeleton, useLiquidityProvisionContext, showSuiTxToast } from "@/components"
import { Spacer } from "@heroui/react"
import { QrCodeIcon, ArrowSquareOutIcon, KeyIcon } from "@phosphor-icons/react"
import React from "react"
import { ChainId } from "@/modules/types"
import { getChainAssets } from "@/assets"
import { centerPad } from "@/modules/utils"
import { getExplorerUrl, ExplorerUrlType, getExplorerMetadata } from "@/modules/blockchain"
import { useConfirmTOTPModalDisclosure, useExportPrivateKeyModalDisclosure, useQueryExportedAccountSwrMutation, useConfirmTotpFormik } from "@/hooks/singleton"
import { useAppDispatch, useAppSelector, setExportPrivateKey } from "@/redux"
import { useSignAndExecuteTransaction, useSuiClient } from "@mysten/dapp-kit"
import { Transaction } from "@mysten/sui/transactions"
    
export const WalletSection = () => {
    const { previewOnly } = useLiquidityProvisionContext()
    const dispatch = useAppDispatch()
    const liquidityProvisionBot = useAppSelector((state) => state.session.liquidityProvisionBot)
    const chainAssetUrl = liquidityProvisionBot?.chainId ? getChainAssets(liquidityProvisionBot?.chainId).token : undefined
    const suiClient = useSuiClient()
    const { onOpen: onOpenConfirmTOTP } = useConfirmTOTPModalDisclosure()
    const { onOpen: onOpenExportPrivateKey } = useExportPrivateKeyModalDisclosure()
    const formik = useConfirmTotpFormik()
    const queryExportedAccountSwrMutation = useQueryExportedAccountSwrMutation()

    const handleExportPrivateKey = () => {
        formik.setFieldValue("next", async (totp: string) => {
            await runGraphQLWithToast(async () => {
                const response = await queryExportedAccountSwrMutation.trigger(totp)
                const privateKey = response?.data?.exportedAccount?.data?.privateKey
                if (!privateKey) throw new Error("Failed to export private key")
                if (!response?.data?.exportedAccount) throw new Error("Failed to export private key")
                dispatch(setExportPrivateKey(privateKey))
                onOpenExportPrivateKey()
                return response.data.exportedAccount
            }, {
                showSuccessToast: false,
                showErrorToast: true,
            })
        })
        onOpenConfirmTOTP()
    }

    const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction()
    const chainId = liquidityProvisionBot?.chainId
    const defaultExplorerMetadata = getExplorerMetadata({ chainId: chainId ?? ChainId.Sui })
    const explorerId = liquidityProvisionBot?.explorerId ?? defaultExplorerMetadata.explorerId
    const explorerUrl = getExplorerUrl({
        chainId: chainId ?? ChainId.Sui,
        value: liquidityProvisionBot?.accountAddress ?? "",
        type: ExplorerUrlType.AccountAddress,
        explorerId,
    })

    return (
        <div>
            {/* Wallet Header */}
            <TooltipTitle
                title="Wallet"
                tooltipString="The wallets of the liquidity provision bot."
            />
            <Spacer y={4} />

            {/* Wallet Address */}
            <div className="flex items-center gap-2">
                {
                    previewOnly || chainAssetUrl ? (
                        <KaniImage
                            removeWrapper
                            className="w-5 h-5 min-w-5 min-h-5"
                            src={previewOnly ? "/icons/tokens/sui.svg" : chainAssetUrl}
                        />
                    ) : (
                        <KaniSkeleton className="w-5 h-5 rounded-medium" />
                    )
                }
                
                <div className="text-sm">
                    {
                        previewOnly || liquidityProvisionBot?.accountAddress ? (
                            centerPad(
                                previewOnly ? 
                                    "0x06c3f585b8647bead4fb9379be37fc17c8d8e21542b9ccb8a85a4a46bb23c4d1"
                                    : liquidityProvisionBot?.accountAddress ?? "", 10, 6)
                        ) : (
                            <KaniSkeleton className="w-20 h-[14px] rounded-medium" />
                        )
                    }   
                </div>
            </div>

            <Spacer y={4} />

            {/* Wallet Actions */}
            <div className="flex items-center gap-2">
                <KaniTooltip content="Copy Address">
                    <KaniSnippet
                        value={liquidityProvisionBot?.accountAddress ?? ""}
                        classNames={{ icon: "w-5 h-5" }}
                    />
                </KaniTooltip>
                <KaniTooltip content="Deposit">
                    <KaniLink
                        onPress={
                            async () => {
                                const USDC_TYPE = "0xdba34672e30cb065b1f93e3ab55318768fd6fef66c15942c9f7cb846e2f900e7::usdc::USDC"
                                // create transaction
                                const tx = new Transaction()
                                // take 1 USDC from user's coins
                                const coins = await suiClient.getCoins({
                                    coinType: USDC_TYPE,
                                    owner: "0x99c8f234bc7b483ce7a00176b8294805388c165b5c3d6eae909ab333ff601030",
                                })
                                const firstCoin = coins.data[0]
                                const splited = tx.splitCoins(firstCoin.coinObjectId, [100_000])
                                tx.transferObjects([splited], "0x06c3f585b8647bead4fb9379be37fc17c8d8e21542b9ccb8a85a4a46bb23c4d1")
                                const result = await signAndExecuteTransaction({
                                    transaction: tx,
                                    chain: "sui:mainnet",
                                })
                                showSuiTxToast(result.digest)
                            }}
                    >
                        <QrCodeIcon className="w-5 h-5 cursor-pointer" />
                    </KaniLink>
                </KaniTooltip>
                <KaniTooltip content="View on Explorer">
                    <KaniLink href={explorerUrl} target="_blank">
                        <ArrowSquareOutIcon className="w-5 h-5 cursor-pointer" />
                    </KaniLink>
                </KaniTooltip>  
                <KaniTooltip content="Export Private Key">
                    <KaniLink onPress={handleExportPrivateKey}>
                        <KeyIcon className="w-5 h-5 cursor-pointer" />
                    </KaniLink>
                </KaniTooltip>
            </div>
        </div>
    )
}