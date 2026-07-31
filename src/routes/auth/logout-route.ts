import {cookies} from "next/headers";
import {COOKIE_NAME} from "@/lib/session";
import {apiErrorResponse} from "@/lib/response";

export async function logoutRoute() {
    try {
        (await cookies()).delete(COOKIE_NAME);
        return new Response(null, {status: 204, headers: {'Cache-Control': 'no-store'}});
    } catch (error) {
        return apiErrorResponse(error);
    }
}