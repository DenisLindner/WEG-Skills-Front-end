import {apiResponse} from "@/lib/response";
import {moduleService} from "@/services/module.service";

export async function deleteModuleRoute(id: number) {
    return apiResponse(() => {
        return moduleService.removeModule(id);
    })
}