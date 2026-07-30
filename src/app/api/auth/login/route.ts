import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { apiErrorResponse, readJsonObject, requiredString } from "@/lib/bff"
import { COOKIE_NAME, cookieOptions } from "@/lib/session"
import { authService } from "@/services/auth.service"

export async function POST(request: Request) {
  try {
    const body = await readJsonObject(request)
    const email = requiredString(body.email, "email", { max: 128 })
    const password = requiredString(body.password, "password", { max: 72 })
    const auth = await authService.login({ email, password })

    ;(await cookies()).set(COOKIE_NAME, auth.accessToken, {
      ...cookieOptions,
      expires: new Date(auth.expiresAt),
    })

    const response = NextResponse.json({ authenticated: true, expiresAt: auth.expiresAt })
    response.headers.set("Cache-Control", "no-store")
    return response
  } catch (error) {
    return apiErrorResponse(error)
  }
}
