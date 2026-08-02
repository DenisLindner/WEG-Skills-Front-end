import {apiResponse} from "@/lib/response";
import {lessonService} from "@/services/lessonServices.service";
import {RepositionInput} from "@/types/common/reposition-input";

export async function repositionLessonRoute(input: RepositionInput) {
    return apiResponse(() => {
        return lessonService.reposition(input);
    })
}