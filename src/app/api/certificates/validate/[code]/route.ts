import { apiResponse, requiredString } from "@/lib/bff"
import { certificateService } from "@/services/certificate.service"

export async function GET(_: Request, context: { params: Promise<{ code: string }> }) {
  return apiResponse(async () => {
    const code = requiredString((await context.params).code, "code", { max: 128 })
    return certificateService.validate(code)
  })
}

