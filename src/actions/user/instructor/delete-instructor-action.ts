"use server";

import {runAction} from "@/lib/action-result";
import {userService} from "@/services/user.service";

export async function deleteInstructorAction(id: number) {
    if (!Number.isSafeInteger(id) || id <= 0) {
        return {
            success: false as const,
            status: 400,
            error: {
                code: "invalid-instructor",
                message: "Instrutor inválido.",
            },
        }
    }

    return runAction(() => {
        return userService.removeInstructor(id);
    });
}
