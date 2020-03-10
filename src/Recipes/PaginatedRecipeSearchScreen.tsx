import React, { useState, useEffect, useRef, FormEvent } from 'react'
import { useLocation, useHistory } from 'react-router'
import { PaginatedRestResponse, ApiError, RestResponse, PaginationMeta } from '../lib/Api/RestResponse'
import { Link } from 'react-router-dom'
import * as R from 'ramda'
import ApiLoadingMessage from '../lib/Api/ApiLoadingMessage'
import ApiErrorMessage from '../lib/Api/ApiErrorMessage'
import Recipe from '../Contracts/Recipe'
import RecipeCardList from '../Recipes/RecipeCardList'
import Recipes from '../Api/Recipes'
import qs from 'qs'

type QueryState = {
    query?: string,
    page?: string,
}

type QueryValues = {
    query: string,
    page: number,
}

function usePagination<T>() {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<ApiError>()
    const [items, setItems] = useState<Recipe[]>([])
    const [config, setConfig] = useState<PaginationMeta>({
        current_page: 1,
        last_page: 1,
        per_page: 20
    })
    
    const [query, setQuery] = useState<QueryValues>({
        query: '',
        page: 1
    })

    useEffect(() => {
        setIsLoading(true)
        Recipes.search(query).then((response: PaginatedRestResponse<Recipe[]>) => {
            setItems(response.data)
            setConfig(response.meta)
        }).catch((response: RestResponse<ApiError>) => {
            setError(response.data)
        }).finally(() => {setIsLoading(false)})
    }, [query])

    return { isLoading, error, items, config, setQuery }
}

interface PaginationLinksProps {
    meta: PaginationMeta,
    links: number,
    includeEnds: boolean,
}

const PaginationLinks = (props: PaginationLinksProps) => {
    const { links, meta } = props
    const location = useLocation()
    let queryString = new URLSearchParams(location.search)

    const pageLinks = R.range(1, links + 1).map((pageNumber) => {
        queryString.set('page', pageNumber.toString())
        return <Link
            key={pageNumber}
            className={meta.current_page === pageNumber ? 'active' : ''}
            to={location.pathname + '?' + queryString}
        >
            {pageNumber}
        </Link>
    })

    return <div className="Pagination__Links">
        {pageLinks}
    </div>
}

export default function PaginatedRecipeSearchScreen() {
    let history = useHistory()

    const { isLoading, error, items, config, setQuery } = usePagination<Recipe>()
    const queryValue = useRef<HTMLInputElement>(null)

    history.listen((location) => {
        const values: QueryState = qs.parse(location.search)
        setQuery({
            query: values.query || '',
            page: +(values.page || '1')
        })
    })
    
    function searchSubmitHandler(event: FormEvent): void {
        event.preventDefault()
        const queryString = queryValue.current?.value || ''
        history.push('/?query=' + queryString + '&page=1')
    }

    return (
        <div className="RecipeSearchScreen">
            <Link to="/recipes/create">Add a recipe</Link>
            <form noValidate className="RecipeSearchScreen__Form" onSubmit={searchSubmitHandler}>
                <input type="search" name="query" defaultValue={''} ref={queryValue} id="RecipeSearch_QueryInput" />
                <button type="submit">Search</button>
            </form>
            <ApiErrorMessage error={error} />
            <ApiLoadingMessage isLoading={isLoading} />
            <RecipeCardList recipes={items} />
            <PaginationLinks meta={config} links={5} includeEnds={false}/>
        </div>
    )
}