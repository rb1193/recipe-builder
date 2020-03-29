import { ApiError } from "../lib/Api/RestResponse";
import { RequestError } from "./RequestError";

export default function parseRequestError(err: Error): ApiError {
    if (err instanceof RequestError) {
        return err.getError()
    }

    return { message: 'Unknown server or network error' }
}