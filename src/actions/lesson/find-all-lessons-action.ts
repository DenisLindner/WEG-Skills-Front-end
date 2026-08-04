"use server";

import {runAction} from "@/lib/action-result";
import {lessonService} from "@/services/lesson.service";

export async function findAllLessonsAction(moduleId: number, page = 0, size = 100) {
    return runAction(() => {
        return lessonService.listByModule(moduleId, page, size);
    });
}
