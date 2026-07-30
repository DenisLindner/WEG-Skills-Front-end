import {ListParams} from "@/types/common/list-params";
import {backendFetch, toQuery} from "@/services/backend.service";
import {pageQuery} from "@/lib/utils";
import {SpringPage} from "@/types/common/spring-page";
import {Course} from "@/types/course/course";
import {CourseWithRating} from "@/types/course/course-with-rating";

export const courseService = {
    listCoursesPublished: (params: ListParams = {}) => {
        const base = params.title ? '/courses/title' : '/courses';
        const query = toQuery({
            title: params.title,
            page: params.page ?? 0,
            size: params.size ?? 12
        });
        return backendFetch<SpringPage<Course>>(`${base}${query}`);
    },
    listCoursesPrivate: (params: ListParams = {}) => {
        const base = params.title ? '/courses/private/title' : '/courses/private';
        const query = toQuery({
            title: params.title,
            page: params.page ?? 0,
            size: params.size ?? 12
        });
        return backendFetch<SpringPage<Course>>(`${base}${query}`);
    },
    listCoursesAdmin: (params: ListParams = {}) => {
        return backendFetch<SpringPage<Course>>(`/courses/admin?${pageQuery(params)}`);
    },
    topCourses: () => {
        return backendFetch<CourseWithRating[]>(`/courses/top-courses`, {auth: false});
    }
}