import "server-only";

import type {Media} from "@/types/media/media";
import {backendFetch} from "./backend.service";
import { MediaTarget } from "@/types/media/media-target";

export const mediaService = {
    complete : (mediaId: number, target: MediaTarget, targetId?: number) => {
        if (target !== "me" && targetId === undefined) {
            throw new Error("Target id is required");
        }

        const suffix = target === "me" ? "me/complete" : `${target}/${targetId}/complete`;
        return backendFetch<Media>(`medias/${mediaId}/${suffix}`, {method: "POST"});
    },
}
