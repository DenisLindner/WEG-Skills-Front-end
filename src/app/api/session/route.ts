import { apiResponse } from "@/lib/bff"
import { getSession } from "@/lib/session"
import { userService } from "@/services/user.service"

export async function GET() {
  return apiResponse(async () => {
    const session = await getSession()
    if (!session.authenticated) return session
    const user = await userService.me()
    return { ...session, user }
  })
}

