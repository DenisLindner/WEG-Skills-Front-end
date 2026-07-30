import {
  apiResponse,
  optionalString,
  pagination,
  positiveInteger,
  readJsonObject,
  RequestValidationError,
  requiredString,
} from "@/lib/bff"
import { moduleService } from "@/services/module.service"

export async function GET(request: Request) {
  return apiResponse(async () => {
    const searchParams = new URL(request.url).searchParams
    const courseId = positiveInteger(searchParams.get("courseId"), "courseId")
    const { page, size } = pagination(searchParams)
    return moduleService.listByCourse(courseId, page, size)
  })
}

export async function POST(request: Request) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    return moduleService.create({
      courseId: positiveInteger(body.courseId, "courseId"),
      title: requiredString(body.title, "title", { min: 3, max: 128 }),
      description: optionalString(body.description, "description", { min: 3, max: 255 }),
    })
  }, { status: 201 })
}

export async function PATCH(request: Request) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    if (!Array.isArray(body.orderedIds) || body.orderedIds.length < 1 || body.orderedIds.length > 100) {
      throw new RequestValidationError("Lista de ordenação inválida.")
    }
    return moduleService.reposition({
      parentId: positiveInteger(body.parentId, "parentId"),
      orderedIds: body.orderedIds.map((id) => positiveInteger(id, "orderedIds")),
    })
  })
}
