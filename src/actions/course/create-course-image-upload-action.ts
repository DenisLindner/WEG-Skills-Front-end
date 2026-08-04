"use server";

import {MediaUploadInput} from "@/types/media/media-upload-input";
import {runAction} from "@/lib/action-result";
import {courseService} from "@/services/course.service";

export async function createCourseImageUploadAction(id: number, input: MediaUploadInput) {
    return runAction(() => {
        return courseService.createImageUpload(id, input);
    });
}
