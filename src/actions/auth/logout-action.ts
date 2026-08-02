"use server"

import {cookies} from "next/headers";
import {COOKIE_NAME} from "@/lib/session-config";
import {redirect} from "next/navigation";

export async function logoutAction() {
    (await cookies()).delete(COOKIE_NAME);

    redirect('/login');
}