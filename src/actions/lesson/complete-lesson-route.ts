import {apiResponse} from "@/lib/response";
import {lessonService} from "@/services/lessonServices.service";

export async function completeLessonRoute(id: number) {
    return apiResponse(() => {
        return lessonService.complete(id);
    })
}