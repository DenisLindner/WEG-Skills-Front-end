import "server-only"

import { cookies, headers } from "next/headers"
import { NextResponse } from "next/server"
import { ApiError } from "@/services/api-error"
import { COOKIE_NAME } from "./session"

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
    if (error.status === 401) (await cookies()).delete(COOKIE_NAME)

    const response = NextResponse.json(error.publicBody(), { status: error.status })
    response.headers.set("Cache-Control", "no-store")
    if (error.retryAfter) response.headers.set("Retry-After", error.retryAfter)
    return response
  }

  const message =
    error instanceof RequestValidationError
      ? error.message
      : "Ocorreu um erro inesperado. Tente novamente."

  const response = NextResponse.json(
    {
      code: error instanceof RequestValidationError ? error.code : "internal-error",
      message,
      ...(error instanceof RequestValidationError && error.fieldErrors
        ? { fieldErrors: error.fieldErrors }
        : {}),
    },
    { status: error instanceof RequestValidationError ? error.status : 500 },
  )
  response.headers.set("Cache-Control", "no-store")
  return response
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

export async function assertMutationRequest(request: Request) {
  const contentType = request.headers.get("content-type")?.toLowerCase() ?? ""
  if (!contentType.startsWith("application/json")) {
    throw new RequestValidationError(
      "O corpo da requisição deve ser enviado como JSON.",
      415,
      "unsupported-media-type",
    )
  }

  const origin = request.headers.get("origin")
  if (!origin) {
    throw new RequestValidationError("Origem da requisição ausente.", 403, "invalid-origin")
  }

  const requestUrl = new URL(request.url)
  const allowedOrigins = new Set([requestUrl.origin])
  const configuredOrigin = process.env.APP_URL
  if (configuredOrigin) allowedOrigins.add(new URL(configuredOrigin).origin)

  const requestHeaders = await headers()
  const forwardedHost = requestHeaders.get("x-forwarded-host")
  if (forwardedHost) {
    const protocol = requestHeaders.get("x-forwarded-proto") ?? "https"
    allowedOrigins.add(`${protocol}://${forwardedHost}`)
  }

  let normalizedOrigin: string
  try {
    normalizedOrigin = new URL(origin).origin
  } catch {
    throw new RequestValidationError("Origem da requisição inválida.", 403, "invalid-origin")
  }

  if (!allowedOrigins.has(normalizedOrigin)) {
    throw new RequestValidationError("Origem da requisição não permitida.", 403, "invalid-origin")
  }
}

export async function readJsonObject(request: Request) {
  await assertMutationRequest(request)
  let value: unknown
  try {
    value = await request.json()
  } catch {
    throw new RequestValidationError("JSON inválido.")
  }

  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new RequestValidationError("Corpo da requisição inválido.")
  }
  return value as Record<string, unknown>
}

export function requiredString(
  value: unknown,
  field: string,
  { min = 1, max = 10_000 }: { min?: number; max?: number } = {},
) {
  const normalized = typeof value === "string" ? value.trim() : ""
  if (normalized.length < min || normalized.length > max) {
    throw new RequestValidationError("Confira os campos informados.", 400, "invalid-fields", {
      [field]: `Informe entre ${min} e ${max} caracteres.`,
    })
  }
  return normalized
}

export function optionalString(
  value: unknown,
  field: string,
  { min = 0, max = 10_000 }: { min?: number; max?: number } = {},
) {
  if (value === undefined || value === null || value === "") return undefined
  return requiredString(value, field, { min, max })
}

export function positiveInteger(value: unknown, field: string) {
  const number = typeof value === "number" ? value : Number(value)
  if (!Number.isSafeInteger(number) || number <= 0) {
    throw new RequestValidationError("Confira os campos informados.", 400, "invalid-fields", {
      [field]: "Informe um número inteiro positivo.",
    })
  }
  return number
}

export function pagination(searchParams: URLSearchParams) {
  const page = Number(searchParams.get("page") ?? 0)
  const size = Number(searchParams.get("size") ?? 12)
  if (!Number.isSafeInteger(page) || page < 0 || !Number.isSafeInteger(size) || size < 1 || size > 100) {
    throw new RequestValidationError("Paginação inválida.")
  }
  return { page, size }
}
