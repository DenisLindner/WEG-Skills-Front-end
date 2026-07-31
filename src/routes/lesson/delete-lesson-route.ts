import {apiResponse} from "@/lib/response";
import {lessonService} from "@/services/lessonServices.service";

export async function deleteLesson(id: number) {
    return apiResponse(() => {
        return lessonService.remove(id);
    })
}