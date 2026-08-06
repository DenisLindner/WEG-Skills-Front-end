import {CourseStatus} from "@/types/course/course-status";

export type Course = {
    id: number
    title: string
    description: string
    status: CourseStatus
    imageUrl: string | null
}