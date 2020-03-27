import { useEffect, useState } from 'react'
import Recipe from '../../Contracts/Recipe'
import Recipes from '../../Api/Recipes'
import {
    ApiError,
    PaginatedRestResponse,
    PaginationMeta,
} from '../Api/RestResponse'
import parseRequestError from '../../Api/parseRequestError'
import { RequestError } from '../../Api/RequestError'

type QueryValues = {
    query: string
    page: string
}

export default function usePagination<T, P>(initialParams: P) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<ApiError>()
    const [items, setItems] = useState<Recipe[]>([])
    const [config, setConfig] = useState<PaginationMeta>({
        current_page: 1,
        last_page: 1,
        per_page: 20,
    })

    const [query, setQuery] = useState<P>(initialParams)

    useEffect(() => {
        setIsLoading(true)
        fetch(Recipes.search((query as unknown) as QueryValues))
            .then((res: Response) => {
                if (!res.ok) throw new RequestError(res)
                return res.json()
            })
            .then((response: PaginatedRestResponse<Recipe[]>) => {
                setItems(response.data)
                setConfig(response.meta)
            })
            .catch((err) => {
                parseRequestError(err).then((err: ApiError) => setError(err))
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [query])

    return { isLoading, error, items, config, setQuery }
}
