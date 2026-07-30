import {
  apiResponse,
  readJsonObject,
  RequestValidationError,
  requiredString,
} from "@/lib/bff"
import { userService } from "@/services/user.service"

const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$/

export async function PATCH(request: Request) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    const password = requiredString(body.password, "password", { min: 8, max: 72 })

    if (!strongPassword.test(password)) {
      throw new RequestValidationError(
        "Confira os campos informados.",
        400,
        "invalid-fields",
        { password: "Use maiúscula, minúscula, número e caractere especial." },
      )
    }

    return userService.changePassword({
      actualPassword: requiredString(body.actualPassword, "actualPassword", { max: 72 }),
      password,
    })
  })
}
