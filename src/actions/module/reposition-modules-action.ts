"use server";

import {runAction} from "@/lib/action-result";
import {moduleService} from "@/services/module.service";
import {RepositionInput} from "@/types/common/reposition-input";

export async function repositionModulesAction(input: RepositionInput) {
    return runAction(() => {
        return moduleService.repositionModules(input);
    });
}
