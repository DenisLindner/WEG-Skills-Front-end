import { apiResponse, readJsonObject, requiredString } from "@/lib/bff"
import { userService } from "@/services/user.service"

export async function POST(request: Request) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    return userService.createInstructor({
      name: requiredString(body.name, "name", { min: 3, max: 128 }),
      email: requiredString(body.email, "email", { max: 128 }),
    })
  }, { status: 201 })
}

