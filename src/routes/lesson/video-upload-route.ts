import {apiResponse} from "@/lib/response";
import {lessonService} from "@/services/lessonServices.service";
import {MediaUploadInput} from "@/types/media/media-upload-input";

export async function videoUploadRoute(id: number, input: MediaUploadInput) {
    return apiResponse(() => {
        return lessonService.createVideoUpload(id, input);
    }, {
        status: 201
    });
}