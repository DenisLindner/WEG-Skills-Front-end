import "server-only"

import type { SpringPage } from "@/types/api"
import type {
  MediaUploadInput,
  Module,
  ModuleInput,
  RepositionInput,
  UploadTicket,
} from "@/types/domain"
import { backendFetch, toQuery } from "./backend.service"

export const moduleService = {
  listByCourse: (courseId: number, page = 0, size = 100) =>
    backendFetch<SpringPage<Module>>(
      `/modules/course/${courseId}?${toQuery({ page, size })}`,
    ),
  findById: (id: number) => backendFetch<Module>(`/modules/${id}`),
  create: (input: ModuleInput) =>
    backendFetch<Module>("/modules", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  update: (id: number, input: Partial<Omit<ModuleInput, "courseId">>) =>
    backendFetch<Module>(`/modules/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),
  remove: (id: number) => backendFetch<void>(`/modules/${id}`, { method: "DELETE" }),
  reposition: (input: RepositionInput) =>
    backendFetch<void>("/modules/reposition", {
      method: "PATCH",
      body: JSON.stringify(input),
    }),
  createImageUpload: (id: number, input: MediaUploadInput) =>
    backendFetch<UploadTicket>(`/modules/${id}/images/upload`, {
      method: "POST",
      body: JSON.stringify(input),
    }),
}

