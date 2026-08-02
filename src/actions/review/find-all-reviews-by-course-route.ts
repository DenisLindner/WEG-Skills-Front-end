import {apiResponse} from "@/lib/response";
import {reviewService} from "@/services/review.service";

export async function findAllReviewsByCourseRoute(courseId: number, page?: number, size?: number) {
    return apiResponse(() => {
        return reviewService.listReviewsByCourse(courseId, page, size);
    })
}