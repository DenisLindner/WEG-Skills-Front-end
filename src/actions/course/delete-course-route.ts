import {apiResponse} from "@/lib/response";
import {courseService} from "@/services/course.service";

export async function deleteCourseRoute(id: number) {
    return apiResponse(() => {
        return courseService.removeCourse(id);
    })
}