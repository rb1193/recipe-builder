import React, { ReactElement, useState, useEffect, useContext } from "react";
import { useParams, useLocation, useHistory } from "react-router";
import { Link } from 'react-router-dom';
import Recipe from "../Contracts/Recipe";
import Recipes from "../Api/Recipes";
import { RestResponse, ApiError } from "../lib/Api/RestResponse";
import ApiLoadingMessage from "../lib/Api/ApiLoadingMessage";
import ApiErrorMessage from "../lib/Api/ApiErrorMessage";
import { NotificationContext } from '../Context';
import { NotificationActionType } from '../lib/Notifications/useNotifications'
import { NotificationLevel } from "../lib/Notifications/NotificationBanner";

export default function RecipeFull(): ReactElement
{
    const { recipeId } = useParams()
    const location = useLocation()
    const history = useHistory()
    const { dispatch } = useContext(NotificationContext)

    const [isLoading, setIsLoading] = useState(true)
    const [recipe, setRecipe] = useState<Recipe>()
    const [error, setError] = useState<ApiError>()

    useEffect(() => {
        setIsLoading(true)
        Recipes.one(recipeId || '').then((res: RestResponse<Recipe>) => {
            setRecipe(res.data)
        }).catch((res: RestResponse<ApiError>) => {
            setError(res.data)
        }).finally(() => setIsLoading(false))
    }, [recipeId])

    const handleDelete = async () => {
        if (!recipe) return
        await Recipes.delete(recipe.id)
        dispatch({
            type: NotificationActionType.ADD,
            payload: {
                message: `${recipe.name} deleted successfully`,
                level: NotificationLevel.info
            }
        })
        history.push('/')
    }
    
    return (
        <article className="RecipeFull">
            <Link to='/'>Back to search</Link>
            <ApiLoadingMessage isLoading={isLoading} />
            <ApiErrorMessage error={error} />
            {recipe && 
                <>
                    <h1 className="RecipeFull__Name">{recipe?.name}</h1>
                    <p>Cooking time: {recipe?.cooking_time}</p>
                    <p>{recipe?.description}</p>
                    <h2>Method</h2>
                    <p>{recipe?.method}</p>
                    <h2>Ingredients</h2>
                    <p>{recipe?.ingredients}</p>
                    <Link to={location.pathname + '/edit'}>Edit recipe</Link>
                    <button type="button" onClick={handleDelete}>Delete recipe</button>
                </>
            }
        </article>
    )
}