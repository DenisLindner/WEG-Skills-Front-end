import type { PublicApiError } from "@/types/api"

export class ClientApiError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly fieldErrors?: Record<string, string>,
  ) {
    super(message)
    this.name = "ClientApiError"
  }
}

export async function apiFetch<T>(url: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers)
  if (options.body && !headers.has("Content-Type")) headers.set("Content-Type", "application/json")

  const response = await fetch(url, {
    ...options,
    headers,
    credentials: "same-origin",
    cache: "no-store",
  })

  if (!response.ok) {
    let error: PublicApiError = {
      code: `http-${response.status}`,
      message: "Não foi possível concluir a solicitação.",
    }
    try {
      error = (await response.json()) as PublicApiError
    } catch {
      // Keep the stable public fallback.
    }
    throw new ClientApiError(response.status, error.code, error.message, error.fieldErrors)
  }

  if (response.status === 204) return undefined as T
  return response.json() as Promise<T>
}

export function friendlyError(error: unknown) {
  if (!(error instanceof ClientApiError)) return "Algo deu errado. Tente novamente."
  if (error.status === 401) return "Sua sessão expirou. Entre novamente."
  if (error.status === 403) return "Você não tem permissão para realizar esta ação."
  if (error.status === 409) return error.message || "Esta ação entra em conflito com dados existentes."
  if (error.status === 429) return "Muitas tentativas. Aguarde um minuto e tente novamente."
  return error.message
}

