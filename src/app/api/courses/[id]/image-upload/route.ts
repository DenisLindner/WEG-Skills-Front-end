import { apiResponse, positiveInteger, readJsonObject, requiredString } from "@/lib/bff"
import { courseService } from "@/services/course.service"

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    return courseService.createImageUpload(positiveInteger((await context.params).id, "id"), {
      fileName: requiredString(body.fileName, "fileName", { max: 255 }),
      contentType: requiredString(body.contentType, "contentType", { max: 100 }),
      size: positiveInteger(body.size, "size"),
    })
  }, { status: 201 })
}
