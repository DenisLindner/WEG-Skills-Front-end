import {apiResponse} from "@/lib/response";
import {moduleService} from "@/services/module.service";

export async function findModuleById(id: number) {
    return apiResponse(() => {
        return moduleService.findModuleById(id);
    })
}