"use server";

import {userService} from "@/services/user.service";
import {runAction} from "@/lib/action-result";
import {InstructorInput} from "@/types/user/instructor-input";

export async function createInstructorAction(input: InstructorInput) {
    return runAction(() => {
        return userService.createInstructor(input);
    });
}
