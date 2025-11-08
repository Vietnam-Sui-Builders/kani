// Helper to display toast notifications based on GraphQL API responses
import { GraphQLResponse } from "@/modules"
import { addToast } from "@heroui/toast"
import { centerPad } from "@/modules/utils"

// Show a toast depending on whether the GraphQL response was successful or not
export const showGraphQLToast = <T>(response: GraphQLResponse<T>) => {
    const { success, message } = response

    const description =
        message || (success ? "Operation completed." : "Something went wrong.")

    addToast({
        title: success ? "Success" : "Error",
        description,
        color: success ? "success" : "danger",
    })
}

// Show a toast when the user is not authorized to access a resource
export const showUnauthorizedToast = () => {
    addToast({
        title: "Unauthorized",
        description: "You are not authorized to access this resource.",
        color: "danger",
    })
}

export interface RunGraphQLWithToastOptions {
    showSuccessToast?: boolean
    showErrorToast?: boolean
}
// Execute an API action and automatically show a toast based on the result
export const runGraphQLWithToast = async <T>(
    action: () => Promise<GraphQLResponse<T>>,
    options: RunGraphQLWithToastOptions = {
        showSuccessToast: true,
        showErrorToast: true,
    },
) => {
    try {
        const response = await action()
        if (options?.showSuccessToast) {
            showGraphQLToast(response)
        }
    } catch (error) {
        const _error = error as Error
        if (_error.message.toLowerCase().includes("unauthorized")) {
            if (options?.showErrorToast) {
                showUnauthorizedToast()
            }
            return
        }
        if (options?.showErrorToast) {
            addToast({
                title: "Error",
                description: _error.message,
                color: "danger",
            })
        }
    }
}

export const showSuiTxToast = (txHash: string) => {
    addToast({
        title: "Transaction Submitted",
        description: `Tx ${centerPad(txHash, 10, 6)} submitted successfully.`,
        color: "success",
    })   
}