"use client"
import React from "react"
import { SuiJsonRpcClient } from "@mysten/sui/jsonRpc"
import { getFullnodeUrl } from "@mysten/sui/client"
import { WalrusFile, walrus, WalrusClient } from "@mysten/walrus"
import { useDropzone } from "react-dropzone"
import { FolderIcon, FolderOpenIcon } from "@phosphor-icons/react"
import { Spacer } from "@heroui/react"
import { useCurrentAccount, useSignAndExecuteTransaction } from "@mysten/dapp-kit"
import { KaniAlert, KaniButton, KaniImage, showSuiTxToast } from "@/components"
import { Transaction } from "@mysten/sui/transactions"

// Initialize Sui client + Walrus extension
const suiClient = new SuiJsonRpcClient({
    url: getFullnodeUrl("mainnet"),
    network: "mainnet",
}).$extend(walrus()) as unknown as { walrus: WalrusClient }

const Page = () => {
    const blobId = "nqMRqy_k4pASOPlTGygGq4-xdWQ9C9SkxMlIZXC7ylk"
    const packageId = "0xba71825fa4a336d82685cb1c10777d04c129fbc350fffc41abee42ec31437b7c"

    const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction()
    const currentAccount = useCurrentAccount()
    const defaultImage = "/icons/kani.png"

    // Handle Walrus file upload
    const onDrop = async (acceptedFiles: Array<File>) => {
        if (!currentAccount) {
            alert("Please connect your wallet first.")
            return
        }

        const flow = suiClient.walrus.writeFilesFlow({
            files: [
                WalrusFile.from({
                    contents: new Uint8Array(await acceptedFiles[0].arrayBuffer()),
                    identifier: acceptedFiles[0].name,
                }),
            ],
        })

        await flow.encode()
        const registerTx = flow.register({
            epochs: 3,
            owner: currentAccount.address,
            deletable: true,
        })

        const { digest } = await signAndExecuteTransaction({ transaction: registerTx })
        await flow.upload({ digest })

        const certifyTx = flow.certify()
        const { digest: certifyDigest } = await signAndExecuteTransaction({ transaction: certifyTx })

        showSuiTxToast(certifyDigest)
    }

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    // Mint NFT
    const handleMint = async () => {
        if (!currentAccount) {
            alert("Please connect your wallet first.")
            return
        }
        const tx = new Transaction()
        tx.moveCall({
            target: `${packageId}::kani::mint_to_sender`,
            arguments: [
                tx.object("0x8663f81e392b6cd4e724b6ba793f17bc51f2d606abf8cab84f60cc2e61846aed"),
                tx.pure.string("Kani FCFS NFT"),
                tx.pure.string(
                    "Kani FCFS NFT is a limited edition NFT that is only available for a limited time."
                ),
                tx.pure.string(blobId),
                tx.pure.address(currentAccount.address),
            ],
        })
        const result = await signAndExecuteTransaction({ transaction: tx })
        showSuiTxToast(result.digest)
    }

    return (
        <div className="w-[400px] mx-auto text-center">
            <div className="text-2xl font-bold">Mint NFT</div>
            <Spacer y={4} />

            <div className="rounded-medium border p-6 py-12 border-dashed border-foreground-500">
                <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    {isDragActive ? (
                        <div className="flex flex-col items-center justify-center gap-2">
                            <FolderOpenIcon className="w-12 h-12" />
                            <div className="text-xs text-foreground-500">Drop files here to upload</div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-2">
                            <FolderIcon className="w-12 h-12" />
                            <div className="text-xs text-foreground-500">
								Drag &apos;n&apos; drop files here, or click to select
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Spacer y={6} />
            <div className="text-2xl font-bold">NFT Preview</div>
            <Spacer y={2} />
            <KaniImage src={defaultImage} alt="NFT Preview" className="w-full h-full object-cover" />
            <Spacer y={2} />

            <KaniAlert
                description={
                    <div>
                        <div>Walrus Blob ID:</div>
                        <div className="text-xs break-all">{blobId}</div>
                    </div>
                }
            />

            <Spacer y={6} />
            <KaniButton size="lg" color="primary" fullWidth onPress={handleMint}>
				Mint to Sender
            </KaniButton>
            <Spacer y={6} />
        </div>
    )
}

export default Page