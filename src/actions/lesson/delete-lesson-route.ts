import {apiResponse} from "@/lib/response";
import {lessonService} from "@/services/lesson.service";

export async function deleteLesson(id: number) {
    return apiResponse(() => {
        return lessonService.remove(id);
    })
}