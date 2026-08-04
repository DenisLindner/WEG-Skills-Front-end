"use server";

import {runAction} from "@/lib/action-result";
import {lessonService} from "@/services/lesson.service";
import {RepositionInput} from "@/types/common/reposition-input";

export async function repositionLessonsAction(input: RepositionInput) {
    return runAction(() => {
        return lessonService.reposition(input);
    });
}
