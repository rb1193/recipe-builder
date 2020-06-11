import React, { useRef, FormEvent, useEffect } from 'react'
import { useHistory } from 'react-router'
import ApiLoadingMessage from '../lib/Api/ApiLoadingMessage'
import ApiErrorMessage from '../lib/Api/ApiErrorMessage'
import Recipe from '../Contracts/Recipe'
import Recipes from '../Api/Recipes'
import RecipeCardList from './RecipeCardList'
import { usePagination } from '../lib/Pagination/usePagination'
import PaginationLinks from '../lib/Pagination/PaginationLinks'
import qs from 'qs'
import './RecipeSearchScreen.css'
import { SubmitButton } from '../lib/Buttons/Buttons'

type QueryState = {
    query?: string
    page?: string
}

export default function RecipeSearchScreen() {
    let history = useHistory()

    const { isLoading, error, items, config, load } = usePagination<Recipe>(Recipes.search)
    const queryValue = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const unregister = history.listen(location => {
            // Do not attempt to load data if user has left this screen
            if (location.pathname !== '/') {
                return
            }

            const values: QueryState = qs.parse(location.search.slice(1))
            load({
                query: values.query || '',
                page: values.page || '1',
            })
        })

        return () => {
            unregister()
        }
    }, [history, load])

    function searchSubmitHandler(event: FormEvent): void {
        event.preventDefault()
        const queryString = queryValue.current?.value || ''
        history.push('/?query=' + queryString + '&page=1')
    }

    return (
        <div className="RecipeSearchScreen">
            <form
                noValidate
                className="RecipeSearchScreen__Form"
                onSubmit={searchSubmitHandler}
            >
                <input
                    aria-label="Recipe search input"
                    autoComplete="off"
                    className="RecipeSearchScreen__SearchInput"
                    type="search"
                    name="query"
                    defaultValue={''}
                    ref={queryValue}
                    id="RecipeSearch_QueryInput"
                    placeholder="Enter some ingredients..."
                />
                <SubmitButton text="Search recipes" />
            </form>
            <ApiErrorMessage error={error} />
            <ApiLoadingMessage isLoading={isLoading} />
            <RecipeCardList isLoading={isLoading} recipes={items} />
            <PaginationLinks meta={config} links={5} includeEnds={false} />
        </div>
    )
}
