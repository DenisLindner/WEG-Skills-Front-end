"use server";

import {runAction} from "@/lib/action-result";
import {reviewService} from "@/services/review.service";

export async function updateReviewAction(id: number, rate: number) {
    return runAction(() => {
        return reviewService.updateReview(id, rate);
    });
}
