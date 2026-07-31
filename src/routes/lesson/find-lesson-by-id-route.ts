import {apiResponse} from "@/lib/response";
import {lessonService} from "@/services/lessonServices.service";

export async function findLessonByIdRoute(id: number) {
    return apiResponse(() => {
        return lessonService.findById(id);
    })
}