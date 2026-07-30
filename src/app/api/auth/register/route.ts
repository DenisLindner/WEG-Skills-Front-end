import { cookies } from "next/headers"
import { NextResponse } from "next/server"
import { apiErrorResponse, readJsonObject, requiredString } from "@/lib/bff"
import { COOKIE_NAME, cookieOptions } from "@/lib/session"
import { authService } from "@/services/auth.service"

const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/

export async function POST(request: Request) {
  try {
    const body = await readJsonObject(request)
    const name = requiredString(body.name, "name", { min: 3, max: 128 })
    const email = requiredString(body.email, "email", { max: 128 })
    const password = requiredString(body.password, "password", { min: 8, max: 72 })

    if (!strongPassword.test(password)) {
      return NextResponse.json(
        {
          code: "invalid-fields",
          message: "Confira os campos informados.",
          fieldErrors: {
            password: "Use maiúscula, minúscula, número e caractere especial.",
          },
        },
        { status: 400 },
      )
    }

    const auth = await authService.register({ name, email, password })
    ;(await cookies()).set(COOKIE_NAME, auth.accessToken, {
      ...cookieOptions,
      expires: new Date(auth.expiresAt),
    })

    const response = NextResponse.json(
      { authenticated: true, expiresAt: auth.expiresAt },
      { status: 201 },
    )
    response.headers.set("Cache-Control", "no-store")
    return response
  } catch (error) {
    return apiErrorResponse(error)
  }
}
