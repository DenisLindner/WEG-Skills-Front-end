"use server";

import {runAction} from "@/lib/action-result";
import {enrollmentService} from "@/services/enrollment.service";

export async function findEnrollmentsAction(page = 0, size = 100) {
    return runAction(() => {
        return enrollmentService.mineEnrollment(page, size);
    });
}
