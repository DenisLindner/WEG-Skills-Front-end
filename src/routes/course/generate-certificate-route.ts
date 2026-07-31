import {apiResponse} from "@/lib/response";
import {courseService} from "@/services/course.service";

export async function generateCertificateRoute(id: number) {
    return apiResponse(() => {
        return courseService.certificateCourse(id);
    })
}