import {apiResponse} from "@/lib/response";
import {lessonService} from "@/services/lessonServices.service";

export async function findAllLessonsRoute(moduleId: number) {
    return apiResponse(() => {
        return lessonService.listByModule(moduleId);
    })
}