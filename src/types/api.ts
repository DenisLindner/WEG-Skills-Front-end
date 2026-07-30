export type ApiFieldErrors = Record<string, string>

export type PublicApiError = {
  code: string
  message: string
  fieldErrors?: ApiFieldErrors
}

export type SpringPage<T> = {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  numberOfElements: number
  first: boolean
  last: boolean
  empty: boolean
}

export type PaginationParams = {
  page?: number
  size?: number
}

