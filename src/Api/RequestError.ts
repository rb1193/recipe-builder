import { ApiError, RestResponse } from "../lib/Api/RestResponse"

export class RequestError extends Error {
    error: ApiError
    
    constructor(res: RestResponse<ApiError>) {
        super('API request failed')
        this.error = res.data
    }
}