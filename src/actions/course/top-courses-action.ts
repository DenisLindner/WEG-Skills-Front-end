"use server";

import {runAction} from "@/lib/action-result";
import {courseService} from "@/services/course.service";

export async function topCoursesAction() {
    return runAction(() => {
        return courseService.topCourses();
    });
}
