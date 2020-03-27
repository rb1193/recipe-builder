import React, { ReactElement, useState, useEffect, useContext } from "react";
import { Formik, Form, FormikHelpers, FormikErrors } from "formik";
import * as Yup from "yup";
import TextInput, { TextInputTypes } from "../lib/Forms/TextInput";
import TextAreaInput from "../lib/Forms/TextAreaInput";
import Recipes from "../Api/Recipes";
import { useHistory, useParams } from "react-router";
import Recipe from "../Contracts/Recipe";
import { NotificationContext } from "../Context";
import { NotificationLevel } from "../lib/Notifications/NotificationBanner";
import { NotificationActionType } from '../lib/Notifications/useNotifications';
import { RestResponse, ApiError } from "../lib/Api/RestResponse";
import ApiLoadingMessage from "../lib/Api/ApiLoadingMessage";
import ApiErrorMessage from "../lib/Api/ApiErrorMessage";
import { Link } from "react-router-dom";

export type EditRecipeFormValues = Omit<Recipe, 'id'>

export default function EditRecipeForm(): ReactElement {
    let history = useHistory();
    const { dispatch } = useContext(NotificationContext)
    const { recipeId } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<ApiError>()
    const [recipe, setRecipe] = useState<Recipe>()

    useEffect(() => {
        Recipes.one(recipeId || '').then((res: RestResponse<Recipe>) => {
            setRecipe(res.data)
        }).catch((res: RestResponse<ApiError>) => {
            setError(res.data)
        }).finally(() => setIsLoading(true))
    }, [recipeId])

    const validationSchema = Yup.object().shape({
        name: Yup.string().required().label('Name'),
        description: Yup.string().required().label('Description'),
        method: Yup.string().required().label('Method'),
        cooking_time: Yup.number().required().positive().integer().label('Cooking Time'),
        ingredients: Yup.string().required().label('Ingredients'),
    })

    function form() {
        return <Form noValidate>
            <TextInput type={TextInputTypes.Text} name="name" label="Name"/>
            <TextAreaInput name="description" label="Short Description"/>
            <TextAreaInput name="method" label="Method"/>
            <TextAreaInput name="ingredients" label="Ingredients"/>
            <TextInput type={TextInputTypes.Number} name="cooking_time" label="Cooking Time (Minutes)"/>
            <button type="submit">Save</button>
        </Form>
    }

    function handleSubmit(values: EditRecipeFormValues, actions: FormikHelpers<EditRecipeFormValues>): void {
        if (!recipeId) throw Error
        setIsLoading(true)
        Recipes.update(recipeId, values).then((request: RestResponse<Recipe>) => {
            // Complete submission before redirecting using history API, don't be tempted to use finally()
            actions.setSubmitting(false);

            // Dispatch a notification
            dispatch({
                type: NotificationActionType.ADD,
                payload: {
                    message: `${request.data.name} updated successfully`,
                    level: NotificationLevel.info
                }
            })

            // Redirect to recipe page
            history.push('/recipes/' + request.data.id);
        }).catch((res: RestResponse<ApiError>) => {
            setError(res.data)
            if (res.data.errors) {
                actions.setErrors(res.data.errors as FormikErrors<EditRecipeFormValues>);
            }
            actions.setSubmitting(false);
        }).finally(() => setIsLoading(false));
    }

    const initialValues = {
        name: recipe?.name || '',
        description: recipe?.description || '',
        cooking_time: recipe?.cooking_time || 0,
        method: recipe?.method || '',
        ingredients: recipe?.ingredients || '',
    }

    return (
        <div className="RecipeEditForm">
            <Link to='/'>Back to search</Link>
            <ApiLoadingMessage isLoading={isLoading} />
            <ApiErrorMessage error={error} />
            <Formik component={form} enableReinitialize={true} initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}/>
        </div>
    );
}