import React, { useEffect } from 'react'
import { useLocation } from 'react-router'
import ApiLoadingMessage from '../lib/Api/ApiLoadingMessage'
import ApiErrorMessage from '../lib/Api/ApiErrorMessage'
import Recipe from '../Contracts/Recipe'
import Recipes from '../Api/Recipes'
import RecipeCardList from './RecipeCardList'
import { usePagination } from '../lib/Pagination/usePagination'
import PaginationLinks from '../lib/Pagination/PaginationLinks'
import qs from 'qs'

export default function RecipeListScreen() {
    let location = useLocation()

    const { isLoading, error, items, config, load } = usePagination<Recipe>(Recipes.list)

    useEffect(() => {
        if (location.pathname !== '/recipes/all') {
            return
        }

        const values = qs.parse(location.search.slice(1))
        load({
            page: values.page || '1',
        })
    }, [location, load])

    return (
        <div className="RecipeListScreen">
            <ApiErrorMessage error={error} />
            <ApiLoadingMessage isLoading={isLoading} />
            <RecipeCardList isLoading={isLoading} recipes={items} />
            <PaginationLinks meta={config} links={5} includeEnds={false} />
        </div>
    )
}
