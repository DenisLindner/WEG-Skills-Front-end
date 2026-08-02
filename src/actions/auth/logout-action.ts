import {cookies} from "next/headers";
import {apiErrorResponse} from "@/lib/response";
import {COOKIE_NAME} from "@/lib/session-config";

export async function logoutAction() {
    try {
        (await cookies()).delete(COOKIE_NAME);
        return new Response(null, {status: 204, headers: {'Cache-Control': 'no-store'}});
    } catch (error) {
        return apiErrorResponse(error);
    }
}