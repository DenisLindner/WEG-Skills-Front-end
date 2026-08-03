import {apiResponse} from "@/lib/response";
import {lessonService} from "@/services/lesson.service";

export async function completeLessonRoute(id: number) {
    return apiResponse(() => {
        return lessonService.complete(id);
    })
}