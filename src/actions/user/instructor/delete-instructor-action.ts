"use server";

import {runAction} from "@/lib/action-result";
import {userService} from "@/services/user.service";

export async function deleteInstructorAction(id: number) {
    return runAction(() => {
        return userService.removeInstructor(id);
    });
}
