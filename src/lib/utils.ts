import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {ListParams} from "@/types/common/list-params";
import {PaginationParams} from "@/types/common/pagination-params";
import {toQuery} from "@/lib/query";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pageQuery(params: ListParams | PaginationParams = {}) {
  return toQuery({ page: params.page ?? 0, size: params.size ?? 12 })
}

export function pagination(searchParams: URLSearchParams) {
  const page = Number(searchParams.get("page") ?? 0)
  const size = Number(searchParams.get("size") ?? 12)
  return {
    page: Number.isSafeInteger(page) && page >= 0 ? page : 0,
    size: Number.isSafeInteger(size) && size >= 1 && size <= 100 ? size : 12,
  }
}
