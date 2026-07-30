import { apiResponse, optionalString, positiveInteger, readJsonObject } from "@/lib/bff"
import { lessonService } from "@/services/lesson.service"

type Context = { params: Promise<{ id: string }> }

export async function GET(_: Request, context: Context) {
  return apiResponse(async () =>
    lessonService.findById(positiveInteger((await context.params).id, "id")),
  )
}

export async function PATCH(request: Request, context: Context) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    return lessonService.update(positiveInteger((await context.params).id, "id"), {
      title: optionalString(body.title, "title", { min: 3, max: 128 }),
      description: optionalString(body.description, "description", { min: 3, max: 255 }),
    })
  })
}

export async function DELETE(request: Request, context: Context) {
  return apiResponse(async () => {
    await readJsonObject(request)
    return lessonService.remove(positiveInteger((await context.params).id, "id"))
  })
}
