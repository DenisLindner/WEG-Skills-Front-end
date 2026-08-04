"use server";

import {runAction} from "@/lib/action-result";
import {userService} from "@/services/user.service";
import {UserProfileInput} from "@/types/user/user-profile-input";

export async function updateProfileAction(input: UserProfileInput) {
    return runAction(() => {
        return userService.updateProfile(input);
    });
}
