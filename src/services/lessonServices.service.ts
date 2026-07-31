import "server-only";

import type {SpringPage} from "@/types/common/spring-page";

import type { Lesson } from "@/types/lesson/lesson";
import type { LessonCompletion } from "@/types/lesson/lesson-completion";
import type { LessonDetails } from "@/types/lesson/lesson-details";
import type { LessonInput } from "@/types/lesson/lesson-input";
import type { MediaUploadInput } from "@/types/media/mediaUploadInput";
import type { RepositionInput } from "@/types/common/repositionInput";
import type { UploadTicket } from "@/types/media/UploadTicket";

import { backendFetch } from "./backend.service";
import { toQuery } from "./backend.service";


export const lessonService = {
    listByModule : (moduleId: number, page = 0, size = 100) => 
        backendFetch<SpringPage<Lesson>>(
            `/lessons/module/${moduleId}?${toQuery({page, size})}`,
        ),
    findById: (id: number) => backendFetch<LessonDetails>(`/lessons/${id}`),
    
    create: (input: LessonInput) => 
        backendFetch<Lesson>("/lessons", {
            method: "POST",
            body: JSON.stringify(input),
        }),
    
    update: (id: number, input: Partial<Omit<LessonInput, "moduleId">>) =>
        backendFetch<Lesson>("/lessons", {
            method: "POST",
            body: JSON.stringify(input),
        }),

    remove: (id: number) => backendFetch<void>(`/lessons/${id}`, {method: "DELETE"}),
    
    reposition: (input: RepositionInput) => 
        backendFetch<void>("/lessons/reposition", {
            method: "PATCH",
            body: JSON.stringify(input),
        }),
}