"use server";

import {runAction} from "@/lib/action-result";
import {courseService} from "@/services/course.service";
import {CourseInput} from "@/types/course/course-input";

export async function updateCourseAction(id: number, input: Partial<CourseInput>) {
    return runAction(() => {
        return courseService.updateCourse(id, input);
    });
}
