import {backendFetch, toQuery} from "@/services/backend.service";
import {Enrollment} from "@/types/enrollment/enrollment";
import {SpringPage} from "@/types/common/spring-page";

export const enrollmentService = {
    enroll: (courseId: number) => {
        return backendFetch<Enrollment>('enrollments', {
            method: 'POST',
            body: JSON.stringify({courseId})
        });
    },
    mineEnrollment: (page = 0, size = 100) => {
        return backendFetch<SpringPage<Enrollment>>(`enrollments/me?${toQuery({page, size})}`);
    }
}