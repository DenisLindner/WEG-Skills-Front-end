"use server";

import {runAction} from "@/lib/action-result";
import {lessonService} from "@/services/lesson.service";
import {LessonInput} from "@/types/lesson/lesson-input";

export async function updateLessonAction(id: number, input: Partial<Omit<LessonInput, "moduleId">>) {
    return runAction(() => {
        return lessonService.update(id, input);
    });
}
