"use server";

import {runAction} from "@/lib/action-result";
import {courseService} from "@/services/course.service";

export async function publishCourseAction(id: number) {
    return runAction(() => {
        return courseService.publishCourse(id);
    });
}
