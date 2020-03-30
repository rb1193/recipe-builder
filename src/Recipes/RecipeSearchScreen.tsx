import React, { useRef, FormEvent, useEffect } from 'react'
import { useHistory } from 'react-router'
import { Link } from 'react-router-dom'
import ApiLoadingMessage from '../lib/Api/ApiLoadingMessage'
import ApiErrorMessage from '../lib/Api/ApiErrorMessage'
import Recipe from '../Contracts/Recipe'
import Recipes from '../Api/Recipes'
import RecipeCardList from './RecipeCardList'
import usePagination from '../lib/Pagination/usePagination'
import PaginationLinks from '../lib/Pagination/PaginationLinks'
import qs from 'qs'
import './RecipeSearchScreen.css'

type QueryState = {
    query?: string,
    page?: string,
}

export default function RecipeSearchScreen() {
    let history = useHistory()

    const { isLoading, error, items, config, load } = usePagination<Recipe>(Recipes.search)
    const queryValue = useRef<HTMLInputElement>(null)

    useEffect(() => {
        const unregister = history.listen((location) => {
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
            <Link to="/recipes/create" className="RecipeSearchScreen__AddRecipeLink">Add a recipe</Link>
            <h2>Search your recipes:</h2>
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