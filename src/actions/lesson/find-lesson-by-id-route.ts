import {apiResponse} from "@/lib/response";
import {lessonService} from "@/services/lesson.service";

export async function findLessonByIdRoute(id: number) {
    return apiResponse(() => {
        return lessonService.findById(id);
    })
}