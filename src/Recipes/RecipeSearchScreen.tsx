import React, { ReactElement, useState, FormEvent, useEffect, useRef } from "react";
import Recipe from '../Contracts/Recipe';
import RecipeCardList from './RecipeCardList';
import Recipes from "../Api/Recipes";
import { Link, useHistory, useLocation } from "react-router-dom";
import ApiErrorMessage from '../lib/Api/ApiErrorMessage';
import ApiLoadingMessage from '../lib/Api/ApiLoadingMessage';

export interface RecipeSearchFormValues {
    query: string,
    page: number,
}

function useLoadMoreRecipes() {
    const query = new URLSearchParams(useLocation().search);
    const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [state, setState] = useState<RecipeSearchFormValues>({ query: query.get('query') || '', page: 1 })
    const [error, setError] = useState<Error>()
    const [recipes, setRecipes] = useState<Recipe[]>([])

    useEffect(() => {
        async function fetchRecipes() {
            try {
                setIsLoadingMore(true)
                const response = await Recipes.search({query: state.query, page: state.page})
                setRecipes((recipes: Recipe[]) => {
                    return state.page === 1 ? response.data : recipes.concat(response.data);
                })
                setIsLoadingMore(false)
                setHasMore(response.meta.last_page > state.page)
            } catch (e) {
                if (e.data) setError(e.data)
            }
        }
        fetchRecipes()
    }, [state])

    return {
        state: state,
        setState: setState,
        hasMore: hasMore,
        isLoadingMore: isLoadingMore,
        error: error,
        recipes: recipes,
    }
}

export default function RecipeSearchScreen(): ReactElement {
    let history = useHistory()
    const { state, setState, hasMore, isLoadingMore, error, recipes } = useLoadMoreRecipes()
    const queryValue = useRef<HTMLInputElement>(null)

    function searchSubmitHandler(event: FormEvent): void {
        event.preventDefault()
        const queryString = queryValue.current?.value || ''
        setState({ query: queryString, page: 1})
        history.push('/?query=' + queryString)
    }

    function loadMoreHandler() {
        setState({query: state.query, page: state.page + 1 })
    }
    
    return (
        <div className="RecipeSearchScreen">
            <Link to="/recipes/create">Add a recipe</Link>
            <form noValidate className="RecipeSearchScreen__Form" onSubmit={searchSubmitHandler}>
                <input type="search" name="query" defaultValue={state.query} ref={queryValue} id="RecipeSearch_QueryInput" />
                <button type="submit">Search</button>
            </form>
            <RecipeCardList recipes={recipes} />
            <ApiLoadingMessage isLoading={isLoadingMore} />
            <ApiErrorMessage error={error} />
            {hasMore && <button type="button" onClick={loadMoreHandler}>Load More</button>}
        </div>
    );
}