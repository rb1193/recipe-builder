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
                if (!res.ok) throw new RequestError(res)
                return res.json()
            })
            .then((response: PaginatedRestResponse<T[]>) => {
                setItems(response.data)
                setConfig(response.meta)
            })
            .catch((err: Error) => {
                parseRequestError(err).then((err: ApiError) => setError(err))
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    return { isLoading, error, items, config, load }
}
