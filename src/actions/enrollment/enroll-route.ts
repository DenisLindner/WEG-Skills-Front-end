import {apiResponse} from "@/lib/response";
import {enrollmentService} from "@/services/enrollment.service";

export async function enrollRoute(courseId: number) {
    return apiResponse(() => {
        return enrollmentService.enroll(courseId);
    }, {
        status: 201
    })
}