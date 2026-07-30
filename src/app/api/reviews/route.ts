import { apiResponse, pagination, positiveInteger, readJsonObject } from "@/lib/bff"
import { RequestValidationError } from "@/lib/bff"
import { reviewService } from "@/services/review.service"

function rate(value: unknown) {
  const number = Number(value)
  if (!Number.isInteger(number) || number < 0 || number > 10) {
    throw new RequestValidationError("A nota deve ser um inteiro entre 0 e 10.")
  }
  return number
}

export async function GET(request: Request) {
  return apiResponse(async () => {
    const searchParams = new URL(request.url).searchParams
    const { page, size } = pagination(searchParams)
    const courseId = searchParams.get("courseId")
    return courseId
      ? reviewService.listByCourse(positiveInteger(courseId, "courseId"), page, size)
      : reviewService.mine(page, size)
  })
}

export async function POST(request: Request) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    return reviewService.create(positiveInteger(body.courseId, "courseId"), rate(body.rate))
  }, { status: 201 })
}

export async function PATCH(request: Request) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    return reviewService.update(positiveInteger(body.id, "id"), rate(body.rate))
  })
}

export async function DELETE(request: Request) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    return reviewService.remove(positiveInteger(body.id, "id"))
  })
}

