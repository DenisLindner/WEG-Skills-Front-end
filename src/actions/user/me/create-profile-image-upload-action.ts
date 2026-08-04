"use server";

import {MediaUploadInput} from "@/types/media/media-upload-input";
import {runAction} from "@/lib/action-result";
import {userService} from "@/services/user.service";

export async function createProfileImageUploadAction(input: MediaUploadInput) {
    return runAction(() => {
        return userService.createImageUpload(input);
    });
}
