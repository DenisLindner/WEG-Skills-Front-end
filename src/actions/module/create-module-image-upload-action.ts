"use server";

import {MediaUploadInput} from "@/types/media/media-upload-input";
import {moduleService} from "@/services/module.service";
import {runAction} from "@/lib/action-result";

export async function createModuleImageUploadAction(id: number, input: MediaUploadInput) {
    return runAction(() => {
        return moduleService.createImageUpload(id, input);
    });
}
