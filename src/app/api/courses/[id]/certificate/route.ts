import { apiResponse, positiveInteger, readJsonObject } from "@/lib/bff"
import { courseService } from "@/services/course.service"

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  return apiResponse(async () => {
    await readJsonObject(request)
    return courseService.certificate(positiveInteger((await context.params).id, "id"))
  })
}

