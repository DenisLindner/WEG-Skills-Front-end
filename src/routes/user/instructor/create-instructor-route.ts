import {userService} from "@/services/user.service";
import {apiResponse} from "@/lib/response";
import {InstructorInput} from "@/types/user/instructor-input";

export async function createInstructorRoute(input: InstructorInput) {
    return apiResponse(() => {
        return userService.createInstructor(input);
    }, { status: 201 });
}