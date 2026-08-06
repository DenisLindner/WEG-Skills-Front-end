"use server"

import {clearSession, getSession} from "@/lib/session";
import {ApiError} from "@/services/api-error";
import {courseService} from "@/services/course.service";

export type CertificateState = {
    success?: boolean;
    code?: string;
    error?: string;
};

export async function createCertificateAction(courseId: number, _previousState: CertificateState): Promise<CertificateState> {
    void _previousState;

    if (!Number.isSafeInteger(courseId) || courseId <= 0) {
        return { error: "Curso inválido." };
    }

    const session = await getSession();
    if (!session.authenticated) {
        return { error: "Sua sessão expirou. Entre novamente para gerar o certificado." };
    }

    try {
        const certificate = await courseService.certificateCourse(courseId);

        return { success: true, code: certificate.code };
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 401) {
                await clearSession();
                return { error: "Sua sessão expirou. Entre novamente." };
            }

            return { error: error.message };
        }

        return { error: "Erro ao gerar certificado do curso." };
    }
}
