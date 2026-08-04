"use server";

import {runAction} from "@/lib/action-result";
import {reviewService} from "@/services/review.service";

export async function findMyReviewsAction(page = 0, size = 100) {
    return runAction(() => {
        return reviewService.mineReviews(page, size);
    });
}
