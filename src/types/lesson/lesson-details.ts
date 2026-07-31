import { Lesson } from "./lesson";

export type LessonDetails = {
  id: number
  title: string
  description: string | null
  position: number
  videoUrl: string | null
};