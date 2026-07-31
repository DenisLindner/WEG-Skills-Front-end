import { Lesson } from "./lesson";

export type LessonDetails = Lesson & {
  videoUrl: string | null
};