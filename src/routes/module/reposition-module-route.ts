import {apiResponse} from "@/lib/response";
import {moduleService} from "@/services/module.service";
import {RepositionInput} from "@/types/common/reposition-input";

export async function repositionModuleRoute(input: RepositionInput) {
    return apiResponse(() => {
        return moduleService.repositionModules(input);
    })
}