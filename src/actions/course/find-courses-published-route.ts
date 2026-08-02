import {apiResponse} from "@/lib/response";
import {courseService} from "@/services/course.service";

export async function findCoursesPublishedRoute(page: number, size: number, scope: string) {
    return apiResponse(() => {
        if (scope === "private") {
            return courseService.listCoursesPrivate({page, size});
        }
        if (scope === "admin") {
            return courseService.listCoursesAdmin({page, size});
        }
        return courseService.listCoursesPublished({page, size});
    })
}