"use server";

import {runAction} from "@/lib/action-result";
import {moduleService} from "@/services/module.service";

export async function deleteModuleAction(id: number) {
    return runAction(() => {
        return moduleService.removeModule(id);
    });
}
