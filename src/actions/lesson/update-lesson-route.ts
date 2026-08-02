import {apiResponse} from "@/lib/response";
import {lessonService} from "@/services/lessonServices.service";
import {LessonInput} from "@/types/lesson/lesson-input";

export async function updateLessonRoute(id: number, input: Partial<Omit<LessonInput, "moduleId">>) {
    return apiResponse(() => {
        return lessonService.update(id, input);
    })
}