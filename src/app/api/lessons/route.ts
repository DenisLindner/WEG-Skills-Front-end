import {
  apiResponse,
  optionalString,
  pagination,
  positiveInteger,
  readJsonObject,
  RequestValidationError,
  requiredString,
} from "@/lib/bff"
import { lessonService } from "@/services/lesson.service"

export async function GET(request: Request) {
  return apiResponse(async () => {
    const searchParams = new URL(request.url).searchParams
    const moduleId = positiveInteger(searchParams.get("moduleId"), "moduleId")
    const { page, size } = pagination(searchParams)
    return lessonService.listByModule(moduleId, page, size)
  })
}

export async function POST(request: Request) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    return lessonService.create({
      moduleId: positiveInteger(body.moduleId, "moduleId"),
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
    return lessonService.reposition({
      parentId: positiveInteger(body.parentId, "parentId"),
      orderedIds: body.orderedIds.map((id) => positiveInteger(id, "orderedIds")),
    })
  })
}
