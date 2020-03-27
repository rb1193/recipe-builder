import { useEffect, useState } from 'react'
import Recipe from '../../Contracts/Recipe'
import Recipes from '../../Api/Recipes'
import { ApiError, RestResponse, PaginatedRestResponse, PaginationMeta } from '../Api/RestResponse' 

type QueryValues = {
    query: string,
    page: string,
}

export default function usePagination<T, P>(initialParams: P) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<ApiError>()
    const [items, setItems] = useState<Recipe[]>([])
    const [config, setConfig] = useState<PaginationMeta>({
        current_page: 1,
        last_page: 1,
        per_page: 20
    })
    
    const [query, setQuery] = useState<P>(initialParams)

    useEffect(() => {
        setIsLoading(true)
        Recipes.search(query as unknown as QueryValues).then((response: PaginatedRestResponse<Recipe[]>) => {
            setItems(response.data)
            setConfig(response.meta)
        }).catch((response: RestResponse<ApiError>) => {
            setError(response.data)
        }).finally(() => {setIsLoading(false)})
    }, [query])

    return { isLoading, error, items, config, setQuery }
}