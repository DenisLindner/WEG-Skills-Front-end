import {apiResponse} from "@/lib/response";
import {courseService} from "@/services/course.service";

export async function findCourseByIdRoute(id: number) {
    return apiResponse(() => {
        return courseService.findCourseById(id);
    })
}