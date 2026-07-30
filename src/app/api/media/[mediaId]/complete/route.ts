import { apiResponse, positiveInteger, readJsonObject, requiredString, RequestValidationError } from "@/lib/bff"
import { mediaService, type MediaTarget } from "@/services/media.service"

const targets: MediaTarget[] = ["course", "module", "lesson", "me"]

export async function POST(
  request: Request,
  context: { params: Promise<{ mediaId: string }> },
) {
  return apiResponse(async () => {
    const body = await readJsonObject(request)
    const target = requiredString(body.target, "target") as MediaTarget
    if (!targets.includes(target)) throw new RequestValidationError("Destino de mídia inválido.")
    const targetId = target === "me" ? undefined : positiveInteger(body.targetId, "targetId")
    return mediaService.complete(
      positiveInteger((await context.params).mediaId, "mediaId"),
      target,
      targetId,
    )
  })
}
