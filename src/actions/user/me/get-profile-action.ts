"use server";

import {runAction} from "@/lib/action-result";
import {userService} from "@/services/user.service";

export async function getProfileAction() {
    return runAction(() => {
        return userService.meProfile();
    });
}
