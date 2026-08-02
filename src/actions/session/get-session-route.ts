import {apiResponse} from "@/lib/response";
import {getSession} from "@/lib/session";
import {userService} from "@/services/user.service";

export async function getSessionRoute() {
    return apiResponse(async () => {
        const session = await getSession();
        if (!session.authenticated) {
            return session;
        }
        const user = await userService.meProfile();
        return { ...session, user };
    })
}