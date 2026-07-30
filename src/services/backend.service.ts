import "server-only"

import { getAccessToken } from "@/lib/session"
import { ApiError } from "./api-error"

type BackendOptions = RequestInit & {
  auth?: boolean
}

function getBaseUrl() {
  const configured = process.env.BACKEND_API_URL
  if (!configured) throw new Error("BACKEND_API_URL não configurada")
  return configured.replace(/\/$/, "")
}

export async function backendFetch<T>(
  path: `/${string}`,
  options: BackendOptions = {},
): Promise<T> {
  const headers = new Headers(options.headers)
  const isFormData = options.body instanceof FormData

  headers.set("Accept", "application/json")
  if (options.body && !isFormData && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json")
  }

  if (options.auth !== false) {
    const token = await getAccessToken()
    if (token) headers.set("Authorization", `Bearer ${token}`)
  }

  const response = await fetch(`${getBaseUrl()}${path}`, {
    ...options,
    headers,
    cache: options.cache ?? "no-store",
  })

  if (!response.ok) throw await ApiError.fromResponse(response)
  if (response.status === 204) return undefined as T

  return response.json() as Promise<T>
}

export function toQuery(params: Record<string, string | number | undefined>) {
  const query = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value))
  })
  return query.toString()
}

