import {CourseStatus} from "@/types/course/course-status";

export type CourseWithRating = {
    id: number
    title: string
    description: string
    status: CourseStatus
    rating: number
    imageUrl: string | null
}