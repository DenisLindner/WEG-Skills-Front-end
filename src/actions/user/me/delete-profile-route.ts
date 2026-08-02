import {userService} from "@/services/user.service";
import {apiResponse} from "@/lib/response";

export async function deleteProfileRoute() {
    return apiResponse(() => {
        return userService.removeProfile();
    })
}