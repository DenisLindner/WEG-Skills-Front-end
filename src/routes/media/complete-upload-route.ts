import {apiResponse} from "@/lib/response";
import {mediaService} from "@/services/media.service";
import {MediaTarget} from "@/types/media/media-target";

export async function completeUploadRoute(mediaId: number, mediaTarget: MediaTarget, targetId: number) {
    return apiResponse(() => {
        return mediaService.complete(mediaId, mediaTarget, targetId);
    })
}