import {apiResponse} from "@/lib/response";
import {courseService} from "@/services/course.service";

export async function publishCourseRoute(id: number) {
    return apiResponse(() => {
        return courseService.publishCourse(id);
    })
}