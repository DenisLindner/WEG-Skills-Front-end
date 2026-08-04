"use server";

import {runAction} from "@/lib/action-result";
import {getSession} from "@/lib/session";
import {userService} from "@/services/user.service";

export async function getSessionAction() {
    return runAction(async () => {
        const session = await getSession();
        if (!session.authenticated) {
            return session;
        }
        const user = await userService.meProfile();
        return { ...session, user };
    });
}
