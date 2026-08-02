import {apiResponse} from "@/lib/response";
import {reviewService} from "@/services/review.service";

export async function updateReviewRoute(id: number, rate: number) {
    return apiResponse(() => {
        return reviewService.updateReview(id, rate);
    })
}