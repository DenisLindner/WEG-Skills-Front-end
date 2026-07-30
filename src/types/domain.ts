import type { PaginationParams } from "./api"

export type CourseStatus = "DRAFT" | "PUBLISHED"

export type Course = {
  id: number
  title: string
  description: string | null
  status: CourseStatus
  imageUrl: string | null
}

export type CourseWithRating = Course & {
  rating: number
}

export type CourseInput = {
  title: string
  description?: string | null
}

export type LessonProgress = {
  lessonId: number
  completedAt: string
}

export type CourseProgress = {
  courseId: number
  completedLessons: number
  totalLessons: number
  percentage: number
  lessons: LessonProgress[]
}

export type Module = {
  id: number
  title: string
  description: string | null
  position: number
  imageUrl: string | null
}

export type ModuleInput = {
  title: string
  description?: string | null
  courseId: number
}

export type Lesson = {
  id: number
  title: string
  description: string | null
  position: number
}

export type LessonDetails = Lesson & {
  videoUrl: string | null
}

export type LessonInput = {
  title: string
  description?: string | null
  moduleId: number
}

export type LessonCompletion = {
  lessonId: number
  enrollmentId: number
  completedAt: string
}

export type Enrollment = {
  userId: number
  courseId: number
  enrolledAt: string
}

export type Review = {
  id: number
  rate: number
  courseTitle: string
  userName: string
  userPictureUrl: string | null
}

export type Certificate = {
  code: string
  studentName: string
  courseTitle: string
  totalLessons: number
  endDate: string
}

export type UserProfile = {
  id: number
  name: string
  email: string
  birthday: string | null
  phone: string | null
  pictureUrl: string | null
}

export type UserProfileInput = {
  name?: string
  email?: string
  birthday?: string
  phone?: string
  city?: string
  state?: string
  country?: string
}

export type InstructorInput = {
  name: string
  email: string
}

export type InstructorCreated = InstructorInput & {
  temporaryPassword: string
}

export type PasswordChangeInput = {
  actualPassword: string
  password: string
}

export type MediaUploadInput = {
  fileName: string
  contentType: string
  size: number
}

export type UploadTicket = {
  mediaId: number
  uploadUrl: string
  objectKey: string
  fields: Record<string, string>
  expiresAt: string
}

export type Media = {
  id: number
  mediaStatus: "PENDING_UPLOAD" | "READY" | "DELETED"
  mediaType: "COURSE_IMAGE" | "MODULE_IMAGE" | "LESSON_VIDEO" | "USER_IMAGE"
}

export type RepositionInput = {
  parentId: number
  orderedIds: number[]
}

export type ListParams = PaginationParams & {
  title?: string
}

