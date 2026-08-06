"use server";

import {runAction} from "@/lib/action-result";
import {mediaService} from "@/services/media.service";
import {MediaTarget} from "@/types/media/media-target";

export async function completeUploadAction(mediaId: number, mediaTarget: MediaTarget, targetId?: number) {
    return runAction(() => {
        return mediaService.complete(mediaId, mediaTarget, targetId);
    });
}
