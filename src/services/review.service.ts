import {backendFetch} from "@/services/backend.service";
import {toQuery} from "@/lib/query";
import {Review} from "@/types/review/review";
import {SpringPage} from "@/types/common/spring-page";

export const reviewService = {
    listReviewsByCourse: (courseId: number, page = 0, size = 12) => {
        return backendFetch<SpringPage<Review>>(
            `reviews/${courseId}?${toQuery({ page, size })}`,
        );
    },
    mineReviews: (page = 0, size = 100) => {
        return backendFetch<SpringPage<Review>>(`reviews/me?${toQuery({ page, size })}`);
    },
    createReview: (courseId: number, rate: number) => {
        return backendFetch<Review>('reviews', {
            method: 'POST',
            body: JSON.stringify({ courseId, rate })
        });
    },
    updateReview: (id: number, rate: number) => {
        return backendFetch<Review>(`reviews/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ rate })
        });
    },
    removeReview: (id: number) => {
        return backendFetch<void>(`reviews/${id}`, {
            method: 'DELETE'
        });
    }
}
