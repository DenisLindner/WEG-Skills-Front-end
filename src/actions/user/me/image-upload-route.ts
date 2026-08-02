import {MediaUploadInput} from "@/types/media/media-upload-input";
import {apiResponse} from "@/lib/response";
import {userService} from "@/services/user.service";

export async function imageUploadRoute(input: MediaUploadInput) {
    return apiResponse(() => {
        return userService.createImageUpload(input);
    }, {
        status: 201
    })
}