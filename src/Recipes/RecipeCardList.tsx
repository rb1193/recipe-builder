import React, { ReactElement } from 'react'
import Recipe from '../Contracts/Recipe'
import RecipeCard from './RecipeCard'
import { useLocation } from 'react-router'
import qs from 'qs'
import './RecipeCardList.css'

type RecipeCardListProps = {
    recipes: Recipe[],
    isLoading: boolean,
}

type QueryState = {
    query?: string
    page?: string
}

export default function RecipeCardList(props: RecipeCardListProps): ReactElement
{
    const { recipes, isLoading } = props
    const params: QueryState = qs.parse(useLocation().search.slice(1))

    if (recipes.length > 0) {
        return (
            <ul className="RecipeCardList">
                {recipes.map((recipe: Recipe) => {return <RecipeCard key={recipe.id} recipe={recipe}/>})}
            </ul>
        )
    }

    return (<>{params.hasOwnProperty('query') && !isLoading && <p>No recipes found. Try another search.</p>}</>)
}