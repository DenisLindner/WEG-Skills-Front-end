import {backendFetch} from "@/services/backend.service";
import {Certificate} from "@/types/certificate/certificate";

export const certificateService = {
    validate: (code: string) => {
        return backendFetch<Certificate>(`/certificates/validate/${encodeURIComponent(code)}`, {
            auth: false
        });
    }
}