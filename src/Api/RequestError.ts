import { ApiError, RestResponse } from "../lib/Api/RestResponse"

export class RequestError extends Error {
    res: Response
    
    constructor(res: Response) {
        super('API request failed')
        this.res = res
    }

    public async getError(): Promise<ApiError> 
    {
        return this.res.json().then((res: RestResponse<ApiError>) => res.data)
    }
}