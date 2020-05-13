import React, {
  ReactElement,
  useContext,
  useEffect,
  useState,
} from 'react';

import {
  Form,
  Formik,
  FormikHelpers,
} from 'formik';
import {
  useHistory,
  useParams,
} from 'react-router';
import * as Yup from 'yup';

import parseRequestError from '../Api/parseRequestError';
import Recipes from '../Api/Recipes';
import { RequestError } from '../Api/RequestError';
import { NotificationContext } from '../Context';
import Recipe from '../Contracts/Recipe';
import ApiErrorMessage from '../lib/Api/ApiErrorMessage';
import ApiLoadingMessage from '../lib/Api/ApiLoadingMessage';
import {
  ApiError,
  RestResponse,
} from '../lib/Api/RestResponse';
import {
  LinkButton,
  SubmitButton,
} from '../lib/Buttons/Buttons';
import TextAreaInput from '../lib/Forms/TextAreaInput';
import TextInput, { TextInputTypes } from '../lib/Forms/TextInput';
import {
  NotificationActionType,
  NotificationLevel,
} from '../lib/Notifications/useNotifications';

export type EditRecipeFormValues = Omit<Recipe, 'id'>

export default function EditRecipeForm(): ReactElement {
    let history = useHistory()
    const { dispatch } = useContext(NotificationContext)
    const { recipeId } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<ApiError>()
    const [recipe, setRecipe] = useState<Recipe>()

    useEffect(() => {
        setIsLoading(true)
        fetch(Recipes.one(recipeId || ''))
            .then(res => {
                return Promise.all<Response, RestResponse<Recipe | ApiError>>([res, res.json()])
            })
            .then(([res, resJson]) => {
                if (!res.ok) {
                    throw new RequestError(resJson as RestResponse<ApiError>)
                }
                setRecipe(resJson.data as Recipe)
            })
            .catch((err) => {
                setError(parseRequestError(err))
            })
            .finally(() => setIsLoading(false))
    }, [recipeId])

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required()
            .label('Name'),
        description: Yup.string()
            .required()
            .label('Description'),
        method: Yup.string()
            .required()
            .label('Method'),
        cooking_time: Yup.number()
            .required()
            .positive()
            .integer()
            .label('Cooking Time'),
        ingredients: Yup.string()
            .required()
            .label('Ingredients'),
        url: Yup.string()
            .url()
            .label('Link')
    })

    function form() {
        return (
            <Form noValidate>
                <TextInput
                    type={TextInputTypes.Text}
                    name="name"
                    label="Name"
                />
                <TextAreaInput name="description" label="Short Description" />
                <TextAreaInput name="method" label="Method" />
                <TextAreaInput name="ingredients" label="Ingredients" />
                <TextInput
                    type={TextInputTypes.Number}
                    name="cooking_time"
                    label="Cooking Time (Minutes)"
                />
                <TextInput type={TextInputTypes.Text} name="url" label="Link"/>
                <SubmitButton text="Save Changes" />
            </Form>
        )
    }

    function handleSubmit(
        values: EditRecipeFormValues,
        actions: FormikHelpers<EditRecipeFormValues>,
    ): void {
        if (!recipeId) throw Error
        setIsLoading(true)
        fetch(Recipes.update(recipeId, values))
            .then((res) => {
                return Promise.all<Response, RestResponse<Recipe | ApiError>>([res, res.json()])
            })
            .then(([res, resJson]) => {
                if (!res.ok) {
                    throw new RequestError(resJson as RestResponse<ApiError>)
                }
                const data = resJson.data as Recipe
                // Complete submission before redirecting using history API, don't be tempted to use finally()
                actions.setSubmitting(false)
                setIsLoading(false)

                // Dispatch a notification
                dispatch({
                    type: NotificationActionType.ADD,
                    payload: {
                        message: `${data.name} updated successfully`,
                        level: NotificationLevel.info,
                    },
                })

                // Redirect to recipe page
                history.push('/recipes/' + data.id)
            })
            .catch((err) => {
                const apiError = parseRequestError(err)
                setError(apiError)
                if (apiError.errors) {
                    actions.setErrors(apiError.errors)
                }
                actions.setSubmitting(false)
                setIsLoading(false)
            })
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
            <LinkButton to="/" text="Back To Search" />
            <ApiLoadingMessage isLoading={isLoading} />
            <ApiErrorMessage error={error} />
            {recipe && <>
                <h2>Edit "{recipe.name}"</h2>
                <Formik
                    component={form}
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                />
            </>}
        </div>
    )
}
