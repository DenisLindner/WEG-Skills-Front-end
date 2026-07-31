import {reviewService} from "@/services/review.service";
import {apiResponse} from "@/lib/response";

export async function createReviewRoute(courseId: number, rate: number) {
    return apiResponse(() => {
        return reviewService.createReview(courseId, rate);
    })
}