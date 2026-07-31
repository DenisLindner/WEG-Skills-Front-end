import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {ListParams} from "@/types/common/list-params";
import {toQuery} from "@/services/backend.service";
import {RequestValidationError} from "@/lib/response";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pageQuery(params: ListParams = {}) {
  return toQuery({ page: params.page ?? 0, size: params.size ?? 12 })
}

export function pagination(searchParams: URLSearchParams) {
  const page = Number(searchParams.get("page") ?? 0)
  const size = Number(searchParams.get("size") ?? 12)
  if (!Number.isSafeInteger(page) || page < 0 || !Number.isSafeInteger(size) || size < 1 || size > 100) {
    throw new RequestValidationError("Paginação inválida.")
  }
  return { page, size }
}