import {apiResponse} from "@/lib/response";
import {userService} from "@/services/user.service";
import {PasswordChangeInput} from "@/types/user/password-change-input";

export async function changePasswordRoute(input: PasswordChangeInput) {
    return apiResponse(() => {
        return userService.changePassword(input);
    })
}