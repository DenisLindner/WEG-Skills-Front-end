"use server";

import {runAction} from "@/lib/action-result";
import {lessonService} from "@/services/lesson.service";
import {LessonInput} from "@/types/lesson/lesson-input";

export async function createLessonAction(input: LessonInput) {
    return runAction(() => {
        return lessonService.create(input);
    });
}
