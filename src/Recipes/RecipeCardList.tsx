import React, { ReactElement } from 'react'
import Recipe from '../Contracts/Recipe'
import RecipeCard from './RecipeCard'
import './RecipeCardList.css'

type RecipeCardListProps = {
    recipes: Recipe[],
    isLoading: boolean,
}

export default function RecipeCardList(props: RecipeCardListProps): ReactElement
{
    const { recipes, isLoading } = props

    if (recipes.length > 0) {
        return (
            <ul className="RecipeCardList">
                {recipes.map((recipe: Recipe) => {return <RecipeCard key={recipe.id} recipe={recipe}/>})}
            </ul>
        )
    }

    return (<>{!isLoading && <p>No recipes found</p>}</>)
}