import {apiResponse} from "@/lib/response";
import {moduleService} from "@/services/module.service";

export async function findAllModulesRoute(courseId: number) {
    return apiResponse(() => {
        return moduleService.listModulesByCourse(courseId);
    })
}