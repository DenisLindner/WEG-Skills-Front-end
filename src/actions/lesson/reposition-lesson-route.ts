import {apiResponse} from "@/lib/response";
import {lessonService} from "@/services/lesson.service";
import {RepositionInput} from "@/types/common/reposition-input";

export async function repositionLessonRoute(input: RepositionInput) {
    return apiResponse(() => {
        return lessonService.reposition(input);
    })
}