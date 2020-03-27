export interface ApiError {
    message: string,
    errors?: { [key: string]: string },
}

export type PaginationMeta = {
    current_page: number,
    last_page: number,
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