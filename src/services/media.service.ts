import "server-only";

import type {Media} from "@/types/domain";
import {backendFetch} from "./backend.service";

export type MediaTarget = "course" | "module" | "lesson" | "me";

export const mediaService = {
    complete : (mediaId: number, target: MediaTarget, targetId?: number) => {
        const suffix = target === "me" ? "/me/complete" : `/${target}/${target}/${targetId}/complete`
        return backendFetch<Media> (`/medias/${mediaId}${suffix}`, {method: "POST"})
    },
}