import "server-only"

import type { SpringPage } from "@/types/api"
import type { Enrollment } from "@/types/domain"
import { backendFetch, toQuery } from "./backend.service"

export const enrollmentService = {
  enroll: (courseId: number) =>
    backendFetch<Enrollment>("/enrollments", {
      method: "POST",
      body: JSON.stringify({ courseId }),
    }),
  mine: (page = 0, size = 100) =>
    backendFetch<SpringPage<Enrollment>>(
      `/enrollments/me?${toQuery({ page, size })}`,
    ),
}

