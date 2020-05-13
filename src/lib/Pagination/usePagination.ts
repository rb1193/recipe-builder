import { useState } from 'react'
import {
    ApiError,
    PaginatedRestResponse,
    PaginationMeta,
} from '../Api/RestResponse'
import parseRequestError from '../../Api/parseRequestError'
import { RequestError } from '../../Api/RequestError'

type requestFn = (params: any) => Request

export default function usePagination<T>(requestFn: requestFn) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<ApiError>()
    const [items, setItems] = useState<T[]>([])
    const [config, setConfig] = useState<PaginationMeta>({
        current_page: 1,
        last_page: 0,
        per_page: 20,
    })

    const load = (params: any) => {
        setIsLoading(true)
        fetch(requestFn(params))
            .then((res: Response) => {
                return Promise.all<Response, PaginatedRestResponse<T[] | ApiError>>([res, res.json()])
            })
            .then(([res, resJson]) => {
                if (!res.ok) {
                    throw new RequestError(resJson as PaginatedRestResponse<ApiError>)
                }
                const verified = resJson as PaginatedRestResponse<T[]>
                setItems(verified.data)
                setConfig(verified.meta)
            })
            .catch((err: Error) => {
                setError(parseRequestError(err))
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return { isLoading, error, items, config, load }
}
