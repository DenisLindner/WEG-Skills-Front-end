import { apiResponse, positiveInteger, readJsonObject } from "@/lib/bff"
import { courseService } from "@/services/course.service"

export async function PATCH(request: Request, context: { params: Promise<{ id: string }> }) {
  return apiResponse(async () => {
    await readJsonObject(request)
    return courseService.publish(positiveInteger((await context.params).id, "id"))
  })
}

