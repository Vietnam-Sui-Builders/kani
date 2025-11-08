import { ExplorerId } from "@/modules/blockchain"
import { ChainId } from "@/modules/types"

export interface ExplorerMetadata {
    /** Human-readable name of the explorer */
    name: string
    /** Base URL of the explorer */
    url: string
    /** Whether this explorer is recommended for this chain */
    recommended: boolean
    /** Whether this is the default explorer for the chain */
    isDefault: boolean
    /** Blockchain network this explorer belongs to */
    chainId: ChainId
    /** Unique ID of the explorer */
    explorerId: ExplorerId
}

export interface GetExplorerMetadataParams {
    /** Chain ID to get default explorer for */
    chainId: ChainId
    /** Specific explorer ID to get metadata for (optional) */
    explorerId?: ExplorerId
}

/**
 * Static map of explorer metadata per chain.
 * We do NOT store this in DB — used only for rendering and selection in UI.
 */
export const explorerMetadatas: Partial<Record<ChainId, Partial<Record<ExplorerId, ExplorerMetadata>>>> = {
    [ChainId.Sui]: {
        [ExplorerId.SuiVision]: {
            name: "SuiVision",
            url: "https://suivision.xyz/",
            chainId: ChainId.Sui,
            recommended: true,
            isDefault: true,
            explorerId: ExplorerId.SuiVision,
        },
        [ExplorerId.SuiScan]: {
            name: "SuiScan",
            url: "https://suiscan.xyz",
            chainId: ChainId.Sui,
            recommended: true,
            isDefault: false,
            explorerId: ExplorerId.SuiScan,
        },
    },
    [ChainId.Solana]: {
        [ExplorerId.SolanaExplorer]: {
            name: "SolanaExplorer",
            url: "https://solanaexplorer.xyz",
            chainId: ChainId.Solana,
            recommended: true,
            isDefault: true,
            explorerId: ExplorerId.SolanaExplorer,
        },
        [ExplorerId.SolanaFM]: {
            name: "SolanaFM",
            url: "https://solanafm.xyz",
            chainId: ChainId.Solana,
            recommended: true,
            isDefault: false,
            explorerId: ExplorerId.SolanaFM,
        },
        [ExplorerId.Solscan]: {
            name: "Solscan",
            url: "https://solscan.io",
            chainId: ChainId.Solana,
            recommended: true,
            isDefault: false,
            explorerId: ExplorerId.Solscan,
        },
    },
}

/**
 * Returns metadata for a given explorerId.
 * Falls back to the default explorer of the chain if not provided.
 */
export const getExplorerMetadata = ({
    chainId,
    explorerId,
}: GetExplorerMetadataParams): ExplorerMetadata => {
    // if explorerId is provided, return the metadata for the explorer
    if (explorerId) {
        for (const chain of Object.values(explorerMetadatas)) {
            const meta = chain[explorerId]
            if (meta) return meta
        }
        throw new Error(`Unsupported explorerId: ${explorerId}`)
    }
  
    // if explorerId is not provided, return the default explorer for the chain
    const chainExplorers = explorerMetadatas[chainId]
    if (!chainExplorers) {
        throw new Error(`Unsupported chainId: ${chainId}`)
    }
  
    const defaultExplorer = Object.values(chainExplorers).find((e) => e.isDefault)
    if (!defaultExplorer) {
        throw new Error(`No default explorer defined for chain ${chainId}`)
    }
  
    return defaultExplorer
}