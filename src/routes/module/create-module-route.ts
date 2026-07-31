import {ModuleInput} from "@/types/module/module-input";
import {apiResponse} from "@/lib/response";
import {moduleService} from "@/services/module.service";

export async function createModuleRoute(input: ModuleInput) {
    return apiResponse(() => {
        return moduleService.createModule(input);
    }, {
        status: 201
    })
}