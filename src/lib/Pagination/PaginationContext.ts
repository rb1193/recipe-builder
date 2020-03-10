import React from 'react'
import Recipe from '../../Contracts/Recipe'
import { ApiError } from '../Api/RestResponse'

export type PaginationState<T> = {
    current_page: number,
    last_page: number,
    isLoading: boolean,
    setIsLoading(isLoading: boolean): void,
    items: T[],
    setItems(items: T[]): void,
    error?: ApiError,
    setError?(error: ApiError): void,
}

export const PaginationContext = React.createContext<PaginationState<Recipe>>({
    current_page: 1,
    last_page: 1,
    items: [],
    setItems: function (items: Recipe[]) {},
    isLoading: false,
    setIsLoading: function (isLoading: boolean) {},
})