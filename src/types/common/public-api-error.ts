import {ApiFieldErrors} from "@/types/common/api-field-errors";

export type PublicApiError = {
    code: string
    message: string
    fieldErrors?: ApiFieldErrors
}