import {MediaStatus} from "@/types/media/media-status";
import {MediaType} from "@/types/media/media-type";

export type Media = {
    id: number
    mediaStatus: MediaStatus
    mediaType: MediaType
}