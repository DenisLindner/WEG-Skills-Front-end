"use server";

import {runAction} from "@/lib/action-result";
import {reviewService} from "@/services/review.service";

export async function deleteReviewAction(id: number) {
    return runAction(() => {
        return reviewService.removeReview(id);
    });
}
