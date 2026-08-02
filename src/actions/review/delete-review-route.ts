import {apiResponse} from "@/lib/response";
import {reviewService} from "@/services/review.service";

export async function deleteReviewRoute(id: number) {
    return apiResponse(() => {
        return reviewService.removeReview(id);
    })
}