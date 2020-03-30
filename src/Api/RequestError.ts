import { ApiError, RestResponse } from "../lib/Api/RestResponse"

export class RequestError extends Error {
    res: Response
    error: ApiError | undefined
    
    constructor(res: Response) {
        super('API request failed')
        this.res = res
    }

    public getError(): ApiError 
    {
        this.res.json().then((res: RestResponse<ApiError>) => this.error = res.data)
        return this.error || { message: this.res.statusText }
    }
}