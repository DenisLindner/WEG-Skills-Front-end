"use server";

import {runAction} from "@/lib/action-result";
import {CourseInput} from "@/types/course/course-input";
import {courseService} from "@/services/course.service";

export async function createCourseAction(input: CourseInput) {
    return runAction(() => {
        return courseService.createCourse(input);
    });
}
