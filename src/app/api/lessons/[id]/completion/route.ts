import { apiResponse, positiveInteger, readJsonObject } from "@/lib/bff"
import { lessonService } from "@/services/lesson.service"

export async function PUT(request: Request, context: { params: Promise<{ id: string }> }) {
  return apiResponse(async () => {
    await readJsonObject(request)
    return lessonService.complete(positiveInteger((await context.params).id, "id"))
  })
}

