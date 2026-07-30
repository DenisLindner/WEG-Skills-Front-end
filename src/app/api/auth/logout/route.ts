import { cookies } from "next/headers"
import { apiErrorResponse, assertMutationRequest } from "@/lib/bff"
import { COOKIE_NAME } from "@/lib/session"

export async function POST(request: Request) {
  try {
    await assertMutationRequest(request)
    ;(await cookies()).delete(COOKIE_NAME)
    return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } })
  } catch (error) {
    return apiErrorResponse(error)
  }
}
