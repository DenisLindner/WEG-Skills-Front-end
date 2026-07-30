import {UserRole} from "@/types/user/user-role";

export type Session = {
    authenticated: true
    userId: number
    email: string
    roles: UserRole[]
    expiresAt: string
};

export type AnonymousSession = {
    authenticated: false
};

export type SessionResponse = Session | AnonymousSession;