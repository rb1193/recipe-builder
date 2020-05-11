import React, { ReactElement, useState, useEffect, useContext } from "react";
import { useParams, useLocation, useHistory } from "react-router";
import { RequestError } from '../Api/RequestError';
import parseRequestError from '../Api/parseRequestError';
import Recipe from "../Contracts/Recipe";
import Recipes from "../Api/Recipes";
import { RestResponse, ApiError } from "../lib/Api/RestResponse";
import ApiLoadingMessage from "../lib/Api/ApiLoadingMessage";
import ApiErrorMessage from "../lib/Api/ApiErrorMessage";
import { NotificationContext } from '../Context';
import { NotificationActionType, NotificationLevel } from '../lib/Notifications/useNotifications'
import ConfirmationModal from "../lib/Modals/ConfirmationModal";
import { LinkButton } from "../lib/Buttons/Buttons";

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
        fetch(Recipes.one(recipeId || '')).then((res: Response) => {
            if (!res.ok) throw new RequestError(res)
            return res.json()
        }).then((res: RestResponse<Recipe>) => {
            setRecipe(res.data)
        }).catch((err) => {
            setError(parseRequestError(err))
        }).finally(() => setIsLoading(false))
    }, [recipeId])

    const handleDelete = async () => {
        if (!recipe) return
        try {
            await fetch(Recipes.delete(recipe.id))
            dispatch({
                type: NotificationActionType.ADD,
                payload: {
                    message: `${recipe.name} deleted successfully`,
                    level: NotificationLevel.info
                }
            })
            history.push('/')
        } catch (err) {
            setError(parseRequestError(err))
        }
    }
    
    return (
        <article className="RecipeFull">
            <LinkButton to="/" text="Back To Search" />
            <ApiLoadingMessage isLoading={isLoading} />
            <ApiErrorMessage error={error} />
            {recipe && 
                <>
                    <h1 className="RecipeFull__Name">{recipe.name}</h1>
                    <p>Cooking time: {recipe.cooking_time}</p>
                    <p>{recipe.description}</p>
                    <h2>Method</h2>
                    <p>{recipe.method}</p>
                    <h2>Ingredients</h2>
                    <p>{recipe.ingredients}</p>
                    {recipe.url &&
                        <p><a href={recipe.url}>View online</a></p>
                    }
                    <LinkButton to={`${location.pathname}/edit`} text="Edit" />
                    <ConfirmationModal
                        confirmationMessage="Are you sure you want to delete this recipe?"
                        onConfirm={handleDelete}
                        buttonClass="Button Button--Danger"
                        buttonText="Delete"
                    />
                </>
            }
        </article>
    )
}