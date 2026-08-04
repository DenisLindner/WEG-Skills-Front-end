"use server";

import {ModuleInput} from "@/types/module/module-input";
import {runAction} from "@/lib/action-result";
import {moduleService} from "@/services/module.service";

export async function createModuleAction(input: ModuleInput) {
    return runAction(() => {
        return moduleService.createModule(input);
    });
}
