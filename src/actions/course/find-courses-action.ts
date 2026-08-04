"use server";

import {runAction} from "@/lib/action-result";
import {courseService} from "@/services/course.service";
import {ListParams} from "@/types/common/list-params";

type CourseScope = "published" | "private" | "admin";

export async function findCoursesAction(params: ListParams = {}, scope: CourseScope = "published") {
    return runAction(() => {
        if (scope === "private") {
            return courseService.listCoursesPrivate(params);
        }
        if (scope === "admin") {
            return courseService.listCoursesAdmin(params);
        }
        return courseService.listCoursesPublished(params);
    });
}
