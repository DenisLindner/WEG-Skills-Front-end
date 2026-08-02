import {apiResponse} from "@/lib/response";
import {reviewService} from "@/services/review.service";

export async function findMineReviewsRoute(page?: number, size?: number) {
    return apiResponse(() => {
        return reviewService.mineReviews(page, size);
    })
}