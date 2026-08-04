"use server";

import {runAction} from "@/lib/action-result";
import {lessonService} from "@/services/lesson.service";

export async function deleteLessonAction(id: number) {
    return runAction(() => {
        return lessonService.remove(id);
    });
}
