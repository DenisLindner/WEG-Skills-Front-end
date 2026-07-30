import { apiResponse, positiveInteger } from "@/lib/bff"
import { courseService } from "@/services/course.service"

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
  return apiResponse(async () => courseService.progress(positiveInteger((await context.params).id, "id")))
}

