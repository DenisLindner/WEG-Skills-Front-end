import {backendFetch} from "@/services/backend.service";
import {toQuery} from "@/lib/query";
import {SpringPage} from "@/types/common/spring-page";
import {Module} from "@/types/module/module";
import {ModuleInput} from "@/types/module/module-input";
import {RepositionInput} from "@/types/common/reposition-input";
import {MediaUploadInput} from "@/types/media/media-upload-input";
import {UploadTicket} from "@/types/media/upload-ticket";

export const moduleService = {
    listModulesByCourse: (courseId: number, page = 0, size = 100) => {
        return backendFetch<SpringPage<Module>>(
            `modules/course/${courseId}?${toQuery({ page, size })}`
        );
    },
    createModule: (input: ModuleInput) => {
        return backendFetch<Module>('modules', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },
    updateModule: (id: number, input: Partial<Omit<ModuleInput, 'courseId'>>) => {
        return backendFetch<Module>(`modules/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(input)
        });
    },
    removeModule: (id: number) => {
        return backendFetch<void>(`modules/${id}`, {
            method: 'DELETE'
        });
    },
    repositionModules: (input: RepositionInput) => {
        return backendFetch<void>("modules/reposition", {
            method: 'PATCH',
            body: JSON.stringify(input)
        })
    },
    createImageUpload: (id: number, input: MediaUploadInput) => {
        return backendFetch<UploadTicket>(`modules/${id}/images/upload`, {
            method: 'POST',
            body: JSON.stringify(input)
        });
    }
}
