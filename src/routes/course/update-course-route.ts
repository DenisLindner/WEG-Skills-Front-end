import {apiResponse} from "@/lib/response";
import {courseService} from "@/services/course.service";
import {CourseInput} from "@/types/course/course-input";

export async function updateCourseRoute(id: number, input: Partial<CourseInput>) {
    return apiResponse(() => {
        return courseService.updateCourse(id, input);
    })
}