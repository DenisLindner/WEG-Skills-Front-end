import {MediaUploadInput} from "@/types/media/media-upload-input";
import {apiResponse} from "@/lib/response";
import {courseService} from "@/services/course.service";

export async function imageCourseUploadRoute(id: number, input: MediaUploadInput) {
    return apiResponse(() => {
        return courseService.createImageUpload(id, input);
    })
}