import "server-only"

import type { SpringPage } from "@/types/api"
import type { Review } from "@/types/domain"
import { backendFetch, toQuery } from "./backend.service"

export const reviewService = {
  listByCourse: (courseId: number, page = 0, size = 12) =>
    backendFetch<SpringPage<Review>>(
      `/reviews/${courseId}?${toQuery({ page, size })}`,
    ),
  mine: (page = 0, size = 100) =>
    backendFetch<SpringPage<Review>>(`/reviews/me?${toQuery({ page, size })}`),
  create: (courseId: number, rate: number) =>
    backendFetch<Review>("/reviews", {
      method: "POST",
      body: JSON.stringify({ courseId, rate }),
    }),
  update: (id: number, rate: number) =>
    backendFetch<Review>(`/reviews/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ rate }),
    }),
  remove: (id: number) => backendFetch<void>(`/reviews/${id}`, { method: "DELETE" }),
}

