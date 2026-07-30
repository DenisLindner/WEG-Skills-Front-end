import {
  apiResponse,
  optionalString,
  positiveInteger,
  readJsonObject,
} from "@/lib/bff"
import { courseService } from "@/services/course.service"

type Context = { params: Promise<{ id: string }> }

export async function GET(_: Request, context: Context) {
  return apiResponse(async () => courseService.findById(positiveInteger((await context.params).id, "id")))
}

export async function PATCH(request: Request, context: Context) {
  return apiResponse(async () => {
    const id = positiveInteger((await context.params).id, "id")
    const body = await readJsonObject(request)
    return courseService.update(id, {
      title: optionalString(body.title, "title", { min: 3, max: 128 }),
      description: optionalString(body.description, "description", { min: 3, max: 255 }),
    })
  })
}

export async function DELETE(request: Request, context: Context) {
  return apiResponse(async () => {
    await readJsonObject(request)
    return courseService.remove(positiveInteger((await context.params).id, "id"))
  })
}

