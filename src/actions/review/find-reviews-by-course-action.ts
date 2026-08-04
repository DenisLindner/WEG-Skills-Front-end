"use server";

import {runAction} from "@/lib/action-result";
import {reviewService} from "@/services/review.service";

export async function findReviewsByCourseAction(courseId: number, page = 0, size = 12) {
    return runAction(() => {
        return reviewService.listReviewsByCourse(courseId, page, size);
    });
}
