"use server";

import {cookies} from "next/headers";
import {runAction} from "@/lib/action-result";
import {COOKIE_NAME} from "@/lib/session-config";
import {userService} from "@/services/user.service";
import {PasswordChangeInput} from "@/types/user/password-change-input";

export async function changePasswordAction(input: PasswordChangeInput) {
    return runAction(async () => {
        await userService.changePassword(input);
        (await cookies()).delete(COOKIE_NAME);
    }, {clearSessionOnUnauthorized: false});
}
