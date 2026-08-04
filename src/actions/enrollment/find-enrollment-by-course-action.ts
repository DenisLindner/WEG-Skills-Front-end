"use server";

import {runAction} from "@/lib/action-result";
import {enrollmentService} from "@/services/enrollment.service";

export async function findEnrollmentByCourseAction(courseId: number) {
    return runAction(() => {
        return enrollmentService.mineEnrollmentByCourse(courseId);
    });
}
