import {ModuleInput} from "@/types/module/module-input";
import {apiResponse} from "@/lib/response";
import {moduleService} from "@/services/module.service";

export async function updateCourseRoute(id: number, input: Partial<Omit<ModuleInput, 'courseId'>>) {
    return apiResponse(() => {
        return moduleService.updateModule(id, input);
    })
}