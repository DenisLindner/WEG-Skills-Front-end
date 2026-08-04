"use server";

import {runAction} from "@/lib/action-result";
import {moduleService} from "@/services/module.service";

export async function findAllModulesAction(courseId: number, page = 0, size = 100) {
    return runAction(() => {
        return moduleService.listModulesByCourse(courseId, page, size);
    });
}
