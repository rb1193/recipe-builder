import { ApiError } from "../lib/Api/RestResponse";
import { RequestError } from "./RequestError";

export default async function parseRequestError(err: Error): Promise<ApiError> {
    if (err instanceof RequestError) {
        return await err.getError()
    }

    return new Promise<ApiError>((resolve) => resolve({
        message: 'Unknown server or network error'
    }))
}