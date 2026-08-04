"use server";

import {revalidatePath} from "next/cache";
import {clearSession, getSession} from "@/lib/session";
import {ApiError} from "@/services/api-error";
import {lessonService} from "@/services/lesson.service";

export type CompleteLessonState = {
    success?: boolean;
    error?: string;
};

export async function completeLessonAction(
    lessonId: number,
    courseId: number,
    _previousState: CompleteLessonState,
): Promise<CompleteLessonState> {
    void _previousState;

    if (!Number.isSafeInteger(lessonId) || lessonId <= 0) {
        return {error: "Aula inválida."};
    }

    if (!Number.isSafeInteger(courseId) || courseId <= 0) {
        return {error: "Curso inválido."};
    }

    const session = await getSession();
    if (!session.authenticated) {
        return {error: "Sua sessão expirou. Entre novamente para concluir a aula."};
    }

    try {
        await lessonService.complete(lessonId);
        revalidatePath(`/student/course/${courseId}`);

        return {success: true};
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 401) {
                await clearSession();
                return {error: "Sua sessão expirou. Entre novamente."};
            }

            return {error: error.message};
        }

        return {error: "Não foi possível concluir a aula."};
    }
}
