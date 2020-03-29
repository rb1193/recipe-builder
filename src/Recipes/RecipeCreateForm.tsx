import React, { ReactElement, useContext, useState } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import TextInput, { TextInputTypes } from '../lib/Forms/TextInput'
import TextAreaInput from '../lib/Forms/TextAreaInput'
import Recipes from '../Api/Recipes'
import { useHistory } from 'react-router'
import Recipe from '../Contracts/Recipe'
import { NotificationContext } from '../Context'
import { NotificationActionType, NotificationLevel } from '../lib/Notifications/useNotifications'
import { RestResponse, ApiError } from '../lib/Api/RestResponse'
import ApiLoadingMessage from '../lib/Api/ApiLoadingMessage'
import ApiErrorMessage from '../lib/Api/ApiErrorMessage'
import { Link } from 'react-router-dom'
import { RequestError } from '../Api/RequestError'
import parseRequestError from '../Api/parseRequestError'

export default function CreateRecipeForm(): ReactElement {
    let history = useHistory()
    const { dispatch } = useContext(NotificationContext)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<ApiError>()

    const initialValues: Omit<Recipe, 'id'> = {
        name: '',
        description: '',
        method: '',
        cooking_time: 0,
        ingredients: '',
    }

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
                <button type="submit">Create</button>
            </Form>
        )
    }

    function handleSubmit(
        values: Omit<Recipe, 'id'>,
        actions: FormikHelpers<Omit<Recipe, 'id'>>,
    ): void {
        setIsLoading(true)
        fetch(Recipes.store(values))
            .then((res: Response) => {
                if (!res.ok) throw new RequestError(res)
                return res.json()
            })
            .then((res: RestResponse<Recipe>) => {
                // Complete submission before redirecting using history API, don't be tempted to use finally()
                actions.setSubmitting(false)
                dispatch({
                    type: NotificationActionType.ADD,
                    payload: {
                        message: `${res.data.name} created successfully`,
                        level: NotificationLevel.info,
                    },
                })
                history.push('/recipes/' + res.data.id)
            })
            .catch((err) => {
                const apiError = parseRequestError(err)
                setError(apiError)
                if (apiError.errors) {
                    actions.setErrors(apiError.errors)
                }
                actions.setSubmitting(false)
            })
            .finally(() => setIsLoading(false))
    }

    return (
        <>
            <Link to="/">Back to search</Link>
            <ApiLoadingMessage isLoading={isLoading} />
            <ApiErrorMessage error={error} />
            <Formik
                component={form}
                initialValues={initialValues}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
            />
        </>
    )
}
