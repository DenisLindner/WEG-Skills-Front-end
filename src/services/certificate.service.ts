import "server-only"

import type { Certificate } from "@/types/domain"
import { backendFetch } from "./backend.service"

export const certificateService = {
  validate: (code: string) =>
    backendFetch<Certificate>(`/certificates/validate/${encodeURIComponent(code)}`, {
      auth: false,
    }),
}

