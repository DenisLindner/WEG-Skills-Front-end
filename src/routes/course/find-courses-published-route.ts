import {apiResponse} from "@/lib/response";
import {courseService} from "@/services/course.service";
import {pagination} from "@/lib/utils";

export async function findCoursesPublishedRoute(request: Request) {
    return apiResponse(() => {
        const searchParams = new URL(request.url).searchParams;
        const params = {
            ...pagination(searchParams), title: searchParams.get("title")?.trim() || undefined
        };
        const scope = searchParams.get("scope") ?? "published";
        if (scope === "private") {
            return courseService.listCoursesPrivate(params);
        }
        if (scope === "admin") {
            return courseService.listCoursesAdmin(params);
        }
        return courseService.listCoursesPublished(params);
    })
}