import {ApiFieldErrors} from "@/types/common/api-field-errors";
import {Problem} from "@/types/common/problem";
import {PublicApiError} from "@/types/common/public-api-error";

export class ApiError extends Error {
    constructor(
        readonly status: number,
        readonly code: string,
        message: string,
        readonly fieldErrors?: ApiFieldErrors,
        readonly retryAfter?: string,
    ) {
        super(message);
        this.name = "ApiError";
    }

    static async fromResponse(response: Response) {
        let problem: Problem = {};

        try {
            problem = (await response.json()) as Problem;
        } catch {}

        const type = typeof problem.type === "string" ? problem.type : "";
        const code = type.startsWith("urn:problem:")
            ? type.slice("urn:problem:".length)
            : `http-${response.status}`;
        const message =
            typeof problem.detail === "string" && problem.detail.trim()
                ? problem.detail
                : "Não foi possível concluir a solicitação.";
        const fieldErrors = isFieldErrors(problem.errors) ? problem.errors : undefined;

        return new ApiError(
            response.status,
            code,
            message,
            fieldErrors,
            response.headers.get("Retry-After") ?? undefined
        )
    }

    publicBody(): PublicApiError {
        return {
            code: this.code,
            message: this.message,
            ...(this.fieldErrors ? { fieldErrors: this.fieldErrors } : {})
        }
    }
}

function isFieldErrors(value: unknown): value is ApiFieldErrors {
    return Boolean(
        value &&
        typeof value === "object" &&
        Object.values(value).every((item) => typeof item === "string")
    )
}