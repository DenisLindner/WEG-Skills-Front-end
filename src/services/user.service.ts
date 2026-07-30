import "server-only"

import type {
  InstructorCreated,
  InstructorInput,
  MediaUploadInput,
  PasswordChangeInput,
  UploadTicket,
  UserProfile,
  UserProfileInput,
} from "@/types/domain"
import { backendFetch } from "./backend.service"

export const userService = {
  me: () => backendFetch<UserProfile>("/users/me"),
  update: (input: UserProfileInput) =>
    backendFetch<UserProfile>("/users/me", {
      method: "PATCH",
      body: JSON.stringify(input),
    }),
  changePassword: (input: PasswordChangeInput) =>
    backendFetch<void>("/users/me/password", {
      method: "PATCH",
      body: JSON.stringify(input),
    }),
  remove: () => backendFetch<void>("/users/me", { method: "DELETE" }),
  createInstructor: (input: InstructorInput) =>
    backendFetch<InstructorCreated>("/users/instructor", {
      method: "POST",
      body: JSON.stringify(input),
    }),
  createImageUpload: (input: MediaUploadInput) =>
    backendFetch<UploadTicket>("/users/me/images/upload", {
      method: "POST",
      body: JSON.stringify(input),
    }),
}

