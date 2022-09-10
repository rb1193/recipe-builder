import { useState, useCallback } from 'react'
import {
    ApiError,
    PaginatedRestResponse,
    PaginationMeta,
} from '../Api/RestResponse'
import parseRequestError from '../../Api/parseRequestError'
import { RequestError } from '../../Api/RequestError'

type requestFn = (params: any) => Request

export function usePagination<T>(requestFn: requestFn) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<ApiError>()
    const [items, setItems] = useState<T[]>([])
    const [config, setConfig] = useState<PaginationMeta>({
        current_page: 1,
        last_page: 0,
        per_page: 20,
    })

    const load = useCallback((params: any) => {
        setIsLoading(true)
        return fetch(requestFn(params))
            .then((res: Response) => {
                if (!res.ok) {
                    res.json().then(json => {
                        throw new RequestError(json)
                    })
                    
                }
                return res.json()
            })
            .then((verified: PaginatedRestResponse<T[]>) => {
                setItems(verified.data)
                setConfig(verified.meta)
            })
            .catch((err: Error) => {
                setError(parseRequestError(err))
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [requestFn])

    return { isLoading, error, items, config, load }
}