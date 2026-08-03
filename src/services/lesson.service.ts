import "server-only";

import type { SpringPage } from "@/types/common/spring-page";

import type { Lesson } from "@/types/lesson/lesson";
import type { LessonDetails } from "@/types/lesson/lesson-details";
import type { LessonInput } from "@/types/lesson/lesson-input";
import type { RepositionInput } from "@/types/common/reposition-input";
import { backendFetch } from "./backend.service";
import { toQuery } from "@/lib/query";
import { LessonCompletion } from "@/types/lesson/lesson-completion";
import { UploadTicket } from "@/types/media/upload-ticket";
import { MediaUploadInput } from "@/types/media/media-upload-input";

export const lessonService = {
    listByModule: (moduleId: number, page = 0, size = 100) =>
        backendFetch<SpringPage<Lesson>>(
            `lessons/module/${moduleId}?${toQuery({ page, size })}`,
        ),
    findById: (id: number) => backendFetch<LessonDetails>(`lessons/${id}`),

    create: (input: LessonInput) =>
        backendFetch<Lesson>("lessons", {
            method: "POST",
            body: JSON.stringify(input),
        }),

    update: (id: number, input: Partial<Omit<LessonInput, "moduleId">>) =>
        backendFetch<Lesson>("lessons", {
            method: "POST",
            body: JSON.stringify(input),
        }),

    remove: (id: number) => backendFetch<void>(`lessons/${id}`, { method: "DELETE" }),

    reposition: (input: RepositionInput) =>
        backendFetch<void>("lessons/reposition", {
            method: "PATCH",
            body: JSON.stringify(input),
        }),
    complete: (id: number) =>
        backendFetch<LessonCompletion>(`lessons/${id}/completion`, { method: "PUT" }),

    createVideoUpload: (id: number, input: MediaUploadInput) =>
        backendFetch<UploadTicket>(`lessons/${id}/videos/upload`, {
            method: "POST",
            body: JSON.stringify(input),
        })
}
