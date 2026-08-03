"use server";

import { revalidatePath } from "next/cache";
import { enrollmentService } from "@/services/enrollment.service";
import { ApiError } from "@/services/api-error";
import { getSession } from "@/lib/session";

export type EnrollState = {
    success?: boolean;
    error?: string;
};

export async function enrollAction(courseId: number, _previousState: EnrollState): Promise<EnrollState> {
    void _previousState;

    if (!Number.isSafeInteger(courseId) || courseId <= 0) {
        return { error: "Curso inválido." };
    }

    const session = await getSession();
    if (!session.authenticated) {
        return { error: "Sua sessão expirou. Entre novamente para se matricular." };
    }

    try {
        await enrollmentService.enroll(courseId);
        revalidatePath(`/courses/${courseId}`);

        return { success: true };
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 401) {
                return { error: "Sua sessão expirou. Entre novamente." };
            }

            return { error: error.message };
        }

        return { error: "Erro ao matricular-se no curso." };
    }
}
