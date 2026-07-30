import { apiResponse, pagination, positiveInteger, readJsonObject } from "@/lib/bff"
import { enrollmentService } from "@/services/enrollment.service"

export async function GET(request: Request) {
  return apiResponse(async () => {
    const { page, size } = pagination(new URL(request.url).searchParams)
    return enrollmentService.mine(page, size)
  })
}

export async function POST(request: Request) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    return enrollmentService.enroll(positiveInteger(body.courseId, "courseId"))
  }, { status: 201 })
}

