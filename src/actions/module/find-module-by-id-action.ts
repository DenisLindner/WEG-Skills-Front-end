"use server";

import {runAction} from "@/lib/action-result";
import {moduleService} from "@/services/module.service";

export async function findModuleByIdAction(id: number) {
    return runAction(() => {
        return moduleService.findModuleById(id);
    });
}
