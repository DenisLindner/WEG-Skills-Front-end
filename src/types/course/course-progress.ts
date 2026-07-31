import {LessonProgress} from "@/types/lesson/lesson-progress";

export type CourseProgress = {
    courseId: number
    completedLessons: number
    totalLessons: number
    percentage: number
    lessons: LessonProgress[]
}