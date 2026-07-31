import {ListParams} from "@/types/common/list-params";
import {backendFetch, toQuery} from "@/services/backend.service";
import {pageQuery} from "@/lib/utils";
import {SpringPage} from "@/types/common/spring-page";
import {Course} from "@/types/course/course";
import {CourseWithRating} from "@/types/course/course-with-rating";
import {CourseInput} from "@/types/course/course-input";
import {Certificate} from "@/types/certificate/certificate";
import {MediaUploadInput} from "@/types/media/media-upload-input";
import {UploadTicket} from "@/types/media/upload-ticket";
import {CourseProgress} from "@/types/course/course-progress";

export const courseService = {
    listCoursesPublished: (params: ListParams = {}) => {
        const base = params.title ? 'courses/title?' : 'courses?';
        const query = toQuery({
            title: params.title,
            page: params.page ?? 0,
            size: params.size ?? 12
        });
        return backendFetch<SpringPage<Course>>(`${base}${query}`);
    },
    listCoursesPrivate: (params: ListParams = {}) => {
        const base = params.title ? 'courses/private/title?' : 'courses/private?';
        const query = toQuery({
            title: params.title,
            page: params.page ?? 0,
            size: params.size ?? 12
        });
        return backendFetch<SpringPage<Course>>(`${base}${query}`);
    },
    listCoursesAdmin: (params: ListParams = {}) => {
        return backendFetch<SpringPage<Course>>(`courses/admin?${pageQuery(params)}`);
    },
    topCourses: () => {
        return backendFetch<CourseWithRating[]>(`courses/top-courses`, {auth: false});
    },
    findCourseById: (id: number) => {
        return backendFetch<Course>(`courses/${id}`);
    },
    progressCourse: (id: number) => {
        return backendFetch<CourseProgress>(`courses/${id}/progress/me`);
    },
    createCourse: (input: CourseInput) => {
        return backendFetch<Course>(`courses`, {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },
    updateCourse: (id: number, input: Partial<CourseInput>) => {
        return backendFetch<Course>(`courses/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(input)
        });
    },
    removeCourse: (id: number) => {
        return backendFetch<void>(`courses/${id}`, {
            method: 'DELETE'
        });
    },
    publishCourse: (id: number) => {
        return backendFetch<Course>(`courses/${id}/publish`, {
            method: 'PATCH'
        });
    },
    certificateCourse: (id: number) => {
        return backendFetch<Certificate>(`courses/${id}/certificate`, {
            method: 'PUT'
        });
    },
    createImageUpload: (id: number, input: MediaUploadInput) => {
        return backendFetch<UploadTicket>(`courses/${id}/images/upload`, {
            method: 'POST',
            body: JSON.stringify(input)
        });
    }
}