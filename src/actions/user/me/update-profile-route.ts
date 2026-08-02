import {apiResponse} from "@/lib/response";
import {userService} from "@/services/user.service";
import {UserProfileInput} from "@/types/user/user-profile-input";

export async function updateProfileRoute(input: UserProfileInput) {
    return apiResponse(() => {
        return userService.updateProfile(input);
    })
}