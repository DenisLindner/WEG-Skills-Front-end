import { apiResponse, positiveInteger, readJsonObject, requiredString } from "@/lib/bff"
import { userService } from "@/services/user.service"

export async function POST(request: Request) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    return userService.createImageUpload({
      fileName: requiredString(body.fileName, "fileName", { max: 255 }),
      contentType: requiredString(body.contentType, "contentType", { max: 100 }),
      size: positiveInteger(body.size, "size"),
    })
  }, { status: 201 })
}

