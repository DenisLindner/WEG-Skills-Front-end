"use server";

import {runAction} from "@/lib/action-result";
import {courseService} from "@/services/course.service";

export async function findCourseByIdAction(id: number) {
    return runAction(() => {
        return courseService.findCourseById(id);
    });
}
