"use server";

import {runAction} from "@/lib/action-result";
import {lessonService} from "@/services/lesson.service";
import {MediaUploadInput} from "@/types/media/media-upload-input";

export async function createLessonVideoUploadAction(id: number, input: MediaUploadInput) {
    return runAction(() => {
        return lessonService.createVideoUpload(id, input);
    });
}
