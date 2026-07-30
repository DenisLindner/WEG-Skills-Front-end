import "server-only";

import type {SpringPage} from "@/types/api";
import type {
    Lesson,
    LessonCompletion,
    LessonDetails,
    LessonInputs,
    MediaUploadInput,
    RepositionInput,
    UploadTicket,
} from "@/types/domain";

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
    
    update: (id: number, input: Partial<Omit<LessonInputs, "moduleId">>) =>
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