"use server"

import {lessonService} from "@/services/lesson.service";
import {clearSession, getSession} from "@/lib/session";
import {ApiError} from "@/services/api-error";
import {LessonDetails} from "@/types/lesson/lesson-details";

export type LessonState = {
    success?: boolean;
    lesson?: LessonDetails;
    error?: string;
};

export async function findLessonByIdAction(lessonId: number, _previousState: LessonState): Promise<LessonState> {
    void _previousState;

    if (!Number.isSafeInteger(lessonId) || lessonId <= 0) {
        return { error: "Aula inválida." };
    }

    const session = await getSession();
    if (!session.authenticated) {
        return { error: "Sua sessão expirou. Entre novamente para buscar a aula." };
    }

    try {
        const lesson = await lessonService.findById(lessonId);

        return { success: true, lesson };
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 401) {
                await clearSession();
                return { error: "Sua sessão expirou. Entre novamente." };
            }

            return { error: error.message };
        }

        return { error: "Erro ao buscar aula." };
    }
}
