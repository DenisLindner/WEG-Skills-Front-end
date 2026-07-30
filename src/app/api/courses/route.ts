import {
  apiResponse,
  optionalString,
  pagination,
  readJsonObject,
  requiredString,
} from "@/lib/bff"
import { courseService } from "@/services/course.service"

export async function GET(request: Request) {
  return apiResponse(async () => {
    const searchParams = new URL(request.url).searchParams
    const params = { ...pagination(searchParams), title: searchParams.get("title")?.trim() || undefined }
    const scope = searchParams.get("scope") ?? "published"
    if (scope === "private") return courseService.listPrivate(params)
    if (scope === "admin") return courseService.listAdmin(params)
    return courseService.listPublished(params)
  })
}

export async function POST(request: Request) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    return courseService.create({
      title: requiredString(body.title, "title", { min: 3, max: 128 }),
      description: optionalString(body.description, "description", { min: 3, max: 255 }),
    })
  }, { status: 201 })
}

