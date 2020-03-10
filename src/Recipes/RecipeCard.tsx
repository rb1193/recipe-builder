import React, { ReactElement } from 'react';
import Recipe from '../Contracts/Recipe';
import { Link } from 'react-router-dom';

interface RecipeCardProps {
    recipe: Recipe,
}

export default function RecipeCard(props: RecipeCardProps): ReactElement {
    const {recipe} = props;
    return (
        <li>
            <h2>{recipe.name}</h2>
            <p>{recipe.description}</p>
            <p>Cooking time: {recipe.cooking_time} minutes</p>
            <Link to={"/recipes/" + recipe.id}>View full recipe</Link>
        </li>
    );
}