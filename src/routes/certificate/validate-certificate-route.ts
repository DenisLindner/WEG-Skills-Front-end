import {apiResponse} from "@/lib/response";
import {certificateService} from "@/services/certificate.service";

export async function validateCertificateRoute(code: string) {
    return apiResponse(() => {
        return certificateService.validate(code);
    })
}