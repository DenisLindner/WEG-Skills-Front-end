"use server";

import {runAction} from "@/lib/action-result";
import {userService} from "@/services/user.service";

export async function findInstructorsAction(page = 0, size = 12) {
    return runAction(() => {
        return userService.listInstructors({page, size});
    });
}
