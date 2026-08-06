export type Media = {
    id: number
    mediaStatus: "PENDING_UPLOAD" | "READY" | "DELETED"
    mediaType: "COURSE_IMAGE" | "MODULE_IMAGE" | "LESSON_VIDEO" | "USER_IMAGE"
}