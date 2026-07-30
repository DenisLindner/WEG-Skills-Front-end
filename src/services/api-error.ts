import "server-only"

import type { ApiFieldErrors, PublicApiError } from "@/types/api"

type SpringProblem = {
  type?: unknown
  title?: unknown
  detail?: unknown
  errors?: unknown
}

export class ApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly fieldErrors?: ApiFieldErrors,
    readonly retryAfter?: string,
  ) {
    super(message)
    this.name = "ApiError"
  }

  static async fromResponse(response: Response) {
    let problem: SpringProblem = {}

    try {
      problem = (await response.json()) as SpringProblem
    } catch {
      // The public error below intentionally avoids forwarding a raw response.
    }

    const type = typeof problem.type === "string" ? problem.type : ""
    const code = type.startsWith("urn:problem:")
      ? type.slice("urn:problem:".length)
      : `http-${response.status}`
    const message =
      typeof problem.detail === "string" && problem.detail.trim()
        ? problem.detail
        : "Não foi possível concluir a solicitação."
    const fieldErrors = isFieldErrors(problem.errors) ? problem.errors : undefined

    return new ApiError(
      response.status,
      code,
      message,
      fieldErrors,
      response.headers.get("Retry-After") ?? undefined,
    )
  }

  publicBody(): PublicApiError {
    return {
      code: this.code,
      message: this.message,
      ...(this.fieldErrors ? { fieldErrors: this.fieldErrors } : {}),
    }
  }
}

function isFieldErrors(value: unknown): value is ApiFieldErrors {
  return Boolean(
    value &&
      typeof value === "object" &&
      Object.values(value).every((item) => typeof item === "string"),
  )
}

