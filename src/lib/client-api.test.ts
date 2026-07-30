import { afterEach, describe, expect, it, vi } from "vitest"
import { apiFetch, ClientApiError, friendlyError } from "./client-api"

describe("apiFetch", () => {
  afterEach(() => vi.unstubAllGlobals())

  it("returns JSON and always uses same-origin credentials", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ id: 7 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    )
    vi.stubGlobal("fetch", fetchMock)

    await expect(apiFetch<{ id: number }>("/api/example")).resolves.toEqual({ id: 7 })
    expect(fetchMock).toHaveBeenCalledWith(
      "/api/example",
      expect.objectContaining({ credentials: "same-origin", cache: "no-store" }),
    )
  })

  it("supports empty 204 responses", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response(null, { status: 204 })))
    await expect(apiFetch<void>("/api/example", { method: "DELETE" })).resolves.toBeUndefined()
  })

  it("normalizes public BFF errors", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(
          JSON.stringify({
            code: "invalid-fields",
            message: "Confira os campos.",
            fieldErrors: { email: "E-mail inválido" },
          }),
          { status: 400, headers: { "Content-Type": "application/json" } },
        ),
      ),
    )

    const error = await apiFetch("/api/example").catch((reason: unknown) => reason)
    expect(error).toBeInstanceOf(ClientApiError)
    expect(error).toMatchObject({
      status: 400,
      code: "invalid-fields",
      fieldErrors: { email: "E-mail inválido" },
    })
  })
})

describe("friendlyError", () => {
  it("provides a dedicated message for expired sessions", () => {
    expect(friendlyError(new ClientApiError(401, "unauthorized", "Unauthorized"))).toContain(
      "sessão expirou",
    )
  })
})

