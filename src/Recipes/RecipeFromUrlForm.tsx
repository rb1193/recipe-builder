import React, { useContext, useState } from 'react'
import { NotificationContext } from '../Context'
import { useHistory } from 'react-router'
import { ApiError, RestResponse } from '../lib/Api/RestResponse'
import * as Yup from 'yup'
import { Formik, Form, FormikHelpers } from 'formik'
import TextInput, { TextInputTypes } from '../lib/Forms/TextInput'
import { SubmitButton } from '../lib/Buttons/Buttons'
import ApiLoadingMessage from '../lib/Api/ApiLoadingMessage'
import ApiErrorMessage from '../lib/Api/ApiErrorMessage'
import { LinkButton } from '../lib/Buttons/Buttons'
import Recipe from '../Contracts/Recipe'
import Recipes from '../Api/Recipes'
import { RequestError } from '../Api/RequestError'
import { NotificationActionType, NotificationLevel } from '../lib/Notifications/useNotifications'
import parseRequestError from '../Api/parseRequestError'

type UrlFormValues = {
    url: string
}

export default function RecipeFromUrlForm(): React.ReactElement {
    let history = useHistory()
    const { dispatch } = useContext(NotificationContext)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<ApiError>()

    const initialValues: UrlFormValues = {
        url: '',
    }

    const validationSchema = Yup.object().shape({
        url: Yup.string().required().url().label('Link'),
    })

    const form = () => {
        return (
            <Form noValidate>
                <TextInput type={TextInputTypes.Text} name="url" label="Link" />
                <SubmitButton text="Fetch recipe" />
            </Form>
        )
    }

    const handleSubmit = (
        values: UrlFormValues,
        actions: FormikHelpers<UrlFormValues>,
    ) => {
        setIsLoading(true)
        fetch(Recipes.scrape(values))
            .then((res: Response) => {
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
                dispatch({
                    type: NotificationActionType.ADD,
                    payload: {
                        message: `${data.name} created successfully`,
                        level: NotificationLevel.info,
                    },
                })
                history.push('/recipes/' + data.id)
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
            <LinkButton to="/" text="Back To Search" />
            <LinkButton to="/recipes/create" text="Add Manually" />
            <h2>Add a New Recipe from the Web</h2>
            <ApiLoadingMessage isLoading={isLoading} message="Fetching data..."/>
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
