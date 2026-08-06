import {SessionResponse} from "@/types/auth/session";
import {UserRole} from "@/types/user/user-role";

export function hasRole(session: SessionResponse, ...roles: UserRole[]) {
    return session.authenticated && roles.some((role) => session.roles.includes(role));
}