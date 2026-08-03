import {apiResponse} from "@/lib/response";
import {lessonService} from "@/services/lesson.service";
import {LessonInput} from "@/types/lesson/lesson-input";

export async function createLessonRoute(input: LessonInput) {
    return apiResponse(() => {
        return lessonService.create(input);
    }, {
        status: 201
    })
}