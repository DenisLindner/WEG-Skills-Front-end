import {apiResponse} from "@/lib/response";
import {courseService} from "@/services/course.service";

export async function courseProgressRoute(id: number) {
    return apiResponse(() => {
        return courseService.progressCourse(id);
    })
}