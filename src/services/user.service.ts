import {backendFetch} from "@/services/backend.service";
import {UserProfile} from "@/types/user/user-profile";
import {UserProfileInput} from "@/types/user/user-profile-input";
import {PasswordChangeInput} from "@/types/user/password-change-input";
import {InstructorInput} from "@/types/user/instructor-input";
import {InstructorCreated} from "@/types/user/instructor-created";
import {MediaUploadInput} from "@/types/media/media-upload-input";
import {UploadTicket} from "@/types/media/upload-ticket";

export const userService = {
    meProfile: () => {
        return backendFetch<UserProfile>('/users/me');
    },
    updateProfile: (input: UserProfileInput) => {
        return backendFetch<UserProfile>('/users/me', {
            method: 'PATCH',
            body: JSON.stringify(input)
        })
    },
    changePassword: (input: PasswordChangeInput) => {
        return backendFetch<void>('/users/me/password', {
            method: 'PATCH',
            body: JSON.stringify(input)
        })
    },
    removeProfile: () => {
        return backendFetch<void>('/users/me', {
            method: 'DELETE'
        });
    },
    createInstructor: (input: InstructorInput) => {
        return backendFetch<InstructorCreated>('/users/instructor', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    },
    createImageUpload: (input: MediaUploadInput) => {
        return backendFetch<UploadTicket>('/users/me/images/upload', {
            method: 'POST',
            body: JSON.stringify(input)
        });
    }
}