import { apiResponse } from "@/lib/bff"
import { courseService } from "@/services/course.service"

export async function GET() {
  return apiResponse(() => courseService.top())
}

