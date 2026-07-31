import {apiResponse} from "@/lib/response";
import {enrollmentService} from "@/services/enrollment.service";

export async function findEnrollsRoute(page: number, size: number) {
    return apiResponse(() => {
        return enrollmentService.mineEnrollment(page, size);
    })
}