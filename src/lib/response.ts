import {ApiError} from "@/services/api-error";
import {cookies} from "next/headers";
import {COOKIE_NAME} from "@/lib/session";
import {NextResponse} from "next/server";

type ApiResponseOptions = {
    status?: number
}

export async function apiResponse<T>(
    action: () => Promise<T>,
    options: ApiResponseOptions = {},
) {
    try {
        const value = await action()
        if (value === undefined) {
            return new Response(null, {
                status: options.status ?? 204,
                headers: { "Cache-Control": "no-store" },
            })
        }
        const response = NextResponse.json(value, { status: options.status ?? 200 })
        response.headers.set("Cache-Control", "no-store")
        return response
    } catch (error) {
        return apiErrorResponse(error)
    }
}

export async function apiErrorResponse(error: unknown) {
    if (error instanceof ApiError) {
        if (error.status === 401) {
            (await cookies()).delete(COOKIE_NAME);
        }

        const response = NextResponse.json(error.publicBody(), {status: error.status});
        response.headers.set('Cache-Control', 'no-store');
        return response;
    }

    const message = error instanceof RequestValidationError ?
        error.message : 'Ocorreu um erro inesperado. Tente novamente.';

    const response = NextResponse.json({
            code: error instanceof RequestValidationError ? error.code : "internal-error",
            message,
            ...(error instanceof RequestValidationError && error.fieldErrors
                ? { fieldErrors: error.fieldErrors }
                : {})
        }, {
            status: error instanceof RequestValidationError ? error.status : 500
        }
    );
    response.headers.set('Cache-Control', 'no-store');
    return response;
}

export class RequestValidationError extends Error {
    constructor(
        message: string,
        readonly status = 400,
        readonly code = "invalid-request",
        readonly fieldErrors?: Record<string, string>,
    ) {
        super(message)
        this.name = "RequestValidationError"
    }
}