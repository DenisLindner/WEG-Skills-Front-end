import {MediaUploadInput} from "@/types/media/media-upload-input";
import {moduleService} from "@/services/module.service";
import {apiResponse} from "@/lib/response";

export async function imageModuleUpdateRoute(id: number, input: MediaUploadInput) {
    return apiResponse(() => {
        return moduleService.createImageUpload(id, input);
    })
}