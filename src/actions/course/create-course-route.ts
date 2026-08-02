import {apiResponse} from "@/lib/response";
import {CourseInput} from "@/types/course/course-input";
import {courseService} from "@/services/course.service";

export async function createCourseRoute(input: CourseInput) {
    return apiResponse(() => {
        return courseService.createCourse(input);
    }, {
        status: 201
    })
}