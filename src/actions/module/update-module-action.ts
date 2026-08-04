"use server";

import {ModuleInput} from "@/types/module/module-input";
import {runAction} from "@/lib/action-result";
import {moduleService} from "@/services/module.service";

export async function updateModuleAction(id: number, input: Partial<Omit<ModuleInput, 'courseId'>>) {
    return runAction(() => {
        return moduleService.updateModule(id, input);
    });
}
