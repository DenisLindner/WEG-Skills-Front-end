import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {ListParams} from "@/types/common/list-params";
import {toQuery} from "@/services/backend.service";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function pageQuery(params: ListParams = {}) {
  return toQuery({ page: params.page ?? 0, size: params.size ?? 12 })
}