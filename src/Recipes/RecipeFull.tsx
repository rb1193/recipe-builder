import React, { ReactElement, useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { Link } from 'react-router-dom';
import Recipe from "../Contracts/Recipe";
import Recipes from "../Api/Recipes";
import { fetchApiRequest, ApiRequestStatus, ApiRequest } from "../lib/Api/ApiRequest";

export default function RecipeFull(): ReactElement
{
    const { recipeId } = useParams()
    const location = useLocation()

    const [recipeRequest, setRecipeRequest] = useState<ApiRequest<Recipe>>({status: ApiRequestStatus.new})

    useEffect(() => {
        fetchApiRequest(Recipes.one(recipeId || '')).then((request: ApiRequest<Recipe>) => {
            setRecipeRequest(request)
        })
    }, [recipeId])

    function component(recipe: Recipe) {
        return <article className="RecipeFull">
            <h1 className="RecipeFull__Name">{recipe.name}</h1>
            <p>Cooking time: {recipe.cooking_time}</p>
            <p>{recipe.description}</p>
            <h2>Method</h2>
            <p>{recipe.method}</p>
            <h2>Ingredients</h2>
            <p>{recipe.ingredients}</p>
            <Link to={location.pathname + '/edit'}>Edit recipe</Link>
        </article>
    }

    switch(recipeRequest.status) {
        case ApiRequestStatus.new:
        case ApiRequestStatus.pending:
            return (<div>Loading</div>)
        case ApiRequestStatus.failed:
            return recipeRequest.payload
                ? (<div>Error: {recipeRequest.payload.data.message}</div>)
                : (<div>Unknown error</div>)
        case ApiRequestStatus.success:
            return (component(recipeRequest.payload.data));
            
    }
}