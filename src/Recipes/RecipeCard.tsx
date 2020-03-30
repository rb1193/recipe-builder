import React, { ReactElement } from 'react'
import Recipe from '../Contracts/Recipe'
import { LinkButton } from '../lib/Buttons/Buttons'
import './RecipeCard.css'

interface RecipeCardProps {
    recipe: Recipe
}

export default function RecipeCard(props: RecipeCardProps): ReactElement {
    const { recipe } = props
    return (
        <li className="RecipeCard">
            <h2 className="RecipeCard__Title">{recipe.name}</h2>
            <p>{recipe.description}</p>
            <p>Cooking time: {recipe.cooking_time} minutes</p>
            <LinkButton to={`/recipes/${recipe.id}`} text="View full recipe" />
        </li>
    )
}
