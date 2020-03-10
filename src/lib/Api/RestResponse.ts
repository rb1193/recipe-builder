export type ApiError = { message: string, errors?: {key: string, message: string}[]}

export type PaginationMeta = {
    last_page: number,
    current_page: number,
    per_page: number,
}

export interface RestResponse<T> {
    code: number,
    data: T,
}

export interface PaginatedRestResponse<T> extends RestResponse<T> {
    code: number,
    data: T,
    meta: PaginationMeta,
}