import {
  apiResponse,
  optionalString,
  readJsonObject,
} from "@/lib/bff"
import { userService } from "@/services/user.service"

export async function GET() {
  return apiResponse(() => userService.me())
}

export async function PATCH(request: Request) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    return userService.update({
      name: optionalString(body.name, "name", { min: 3, max: 128 }),
      email: optionalString(body.email, "email", { max: 128 }),
      birthday: optionalString(body.birthday, "birthday", { max: 10 }),
      phone: optionalString(body.phone, "phone", { min: 7, max: 20 }),
      city: optionalString(body.city, "city", { min: 3, max: 128 }),
      state: optionalString(body.state, "state", { min: 3, max: 128 }),
      country: optionalString(body.country, "country", { min: 3, max: 128 }),
    })
  })
}

export async function DELETE(request: Request) {
  return apiResponse(async () => {
    await readJsonObject(request)
    return userService.remove()
  })
}
