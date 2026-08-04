import "server-only";

import {clearSession} from "@/lib/session";
import {ApiError} from "@/services/api-error";
import {PublicApiError} from "@/types/common/public-api-error";

export type ActionResult<T> =
    | { success: true; data: T }
    | { success: false; status: number; error: PublicApiError };

export async function runAction<T>(action: () => Promise<T>): Promise<ActionResult<T>> {
    try {
        return {
            success: true,
            data: await action(),
        };
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 401) {
                await clearSession();
            }

            return {
                success: false,
                status: error.status,
                error: error.publicBody(),
            };
        }

        console.error("Server action failed", error);

        return {
            success: false,
            status: 500,
            error: {
                code: "internal-error",
                message: "Ocorreu um erro inesperado. Tente novamente.",
            },
        };
    }
}
