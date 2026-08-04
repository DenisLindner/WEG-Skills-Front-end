"use server";

import {runAction} from "@/lib/action-result";
import {courseService} from "@/services/course.service";

export async function courseProgressAction(id: number) {
    return runAction(() => {
        return courseService.progressCourse(id);
    });
}
