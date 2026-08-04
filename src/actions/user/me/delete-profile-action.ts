"use server";

import {userService} from "@/services/user.service";
import {cookies} from "next/headers";
import {runAction} from "@/lib/action-result";
import {COOKIE_NAME} from "@/lib/session-config";

export async function deleteProfileAction() {
    return runAction(async () => {
        await userService.removeProfile();
        (await cookies()).delete(COOKIE_NAME);
    });
}
