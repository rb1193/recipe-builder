import React, { ReactElement } from 'react';
import Recipe from '../Contracts/Recipe';
import RecipeCard from './RecipeCard';

type RecipeCardListProps = {
    recipes: Recipe[]
}

export default function RecipeCardList(props: RecipeCardListProps): ReactElement
{
    const { recipes } = props;

    if (recipes) {
        return (
            <ul className="RecipeSearchScreen__Results">
                {recipes.map((recipe: Recipe) => {return <RecipeCard key={recipe.id} recipe={recipe}/>})}
            </ul>
        )
    }

    return (<p>No recipes found. Try another search.</p>)
}