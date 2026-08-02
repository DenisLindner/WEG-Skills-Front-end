import {apiResponse} from "@/lib/response";
import {userService} from "@/services/user.service";

export async function meProfileRoute() {
    return apiResponse(() => {
        return userService.meProfile();
    })
}