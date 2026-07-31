import {apiResponse} from "@/lib/response";
import {courseService} from "@/services/course.service";

export async function topCoursesRoute() {
    return apiResponse(() => {
        return courseService.topCourses();
    })
}