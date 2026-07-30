import "server-only"

import type { SpringPage } from "@/types/api"
import type {
  Certificate,
  Course,
  CourseInput,
  CourseProgress,
  CourseWithRating,
  ListParams,
  MediaUploadInput,
  UploadTicket,
} from "@/types/domain"
import { backendFetch, toQuery } from "./backend.service"

function pageQuery(params: ListParams = {}) {
  return toQuery({ page: params.page ?? 0, size: params.size ?? 12 })
}

export const courseService = {
  listPublished: (params: ListParams = {}) => {
    const base = params.title ? "/courses/title" : "/courses"
    const query = toQuery({
      title: params.title,
      page: params.page ?? 0,
      size: params.size ?? 12,
    })
    return backendFetch<SpringPage<Course>>(`${base}?${query}`)
  },
  listPrivate: (params: ListParams = {}) => {
    const base = params.title ? "/courses/private/title" : "/courses/private"
    const query = toQuery({
      title: params.title,
      page: params.page ?? 0,
      size: params.size ?? 12,
    })
    return backendFetch<SpringPage<Course>>(`${base}?${query}`)
  },
  listAdmin: (params: ListParams = {}) =>
    backendFetch<SpringPage<Course>>(`/courses/admin?${pageQuery(params)}`),
  top: () => backendFetch<CourseWithRating[]>("/courses/top-courses", { auth: false }),
  findById: (id: number) => backendFetch<Course>(`/courses/${id}`),
  progress: (id: number) =>
    backendFetch<CourseProgress>(`/courses/${id}/progress/me`),
  create: (input: CourseInput) =>
    backendFetch<Course>("/courses", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  update: (id: number, input: Partial<CourseInput>) =>
    backendFetch<Course>(`/courses/${id}`, {
      method: "PATCH",
      body: JSON.stringify(input),
    }),
  remove: (id: number) => backendFetch<void>(`/courses/${id}`, { method: "DELETE" }),
  publish: (id: number) =>
    backendFetch<Course>(`/courses/${id}/publish`, { method: "PATCH" }),
  certificate: (id: number) =>
    backendFetch<Certificate>(`/courses/${id}/certificate`, { method: "PUT" }),
  createImageUpload: (id: number, input: MediaUploadInput) =>
    backendFetch<UploadTicket>(`/courses/${id}/images/upload`, {
      method: "POST",
      body: JSON.stringify(input),
    }),
}

