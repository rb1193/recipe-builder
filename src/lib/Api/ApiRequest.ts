import {RestResponse, ApiError} from './RestResponse';

export type NewRequest = {
    status: ApiRequestStatus.new,
}

export type PendingRequest = {
    status: ApiRequestStatus.pending,
}

export type SuccessfulRequest<T> = {
    status: ApiRequestStatus.success,
    payload: RestResponse<T>
}

export type FailedRequest = {
    status: ApiRequestStatus.failed,
    payload: RestResponse<ApiError>
}

export type ApiRequest<T> = NewRequest | PendingRequest | SuccessfulRequest<T> | FailedRequest;

export enum ApiRequestStatus {
    new = "new",
    pending = "pending",
    success = "success", 
    failed = "failed",
}

export function fetchApiRequest(fetch: Promise<RestResponse<any>>): Promise<SuccessfulRequest<any>> {
    return new Promise((resolve, reject) => {
        fetch.then((response: RestResponse<any>) => {
            if (response.code > 399) {
                reject({
                    status: ApiRequestStatus.failed,
                    payload: response
                })
            }

            resolve({
                status: ApiRequestStatus.success,
                payload: response
            })
        }).catch((response: RestResponse<any>) => {
            reject({
                status: ApiRequestStatus.failed,
                payload: response,
            })
        })
    })
}