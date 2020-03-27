import React, { ReactElement, useContext, useState } from "react";
import { Formik, Form, FormikHelpers, FormikErrors } from "formik";
import * as Yup from "yup";
import TextInput, { TextInputTypes } from "../lib/Forms/TextInput";
import TextAreaInput from "../lib/Forms/TextAreaInput";
import Recipes from "../Api/Recipes";
import { useHistory } from "react-router";
import Recipe from "../Contracts/Recipe";
import { NotificationContext } from "../Context";
import { NotificationLevel } from "../lib/Notifications/NotificationBanner";
import { NotificationActionType } from "../lib/Notifications/useNotifications";
import { RestResponse, ApiError } from "../lib/Api/RestResponse";
import ApiLoadingMessage from "../lib/Api/ApiLoadingMessage";
import ApiErrorMessage from "../lib/Api/ApiErrorMessage";
import { Link } from "react-router-dom";

export interface CreateRecipeFormValues {
    name: string,
    description: string,
    method: string,
    cooking_time: number | '',
    ingredients: string,
}

export default function CreateRecipeForm(): ReactElement {
    let history = useHistory();
    const { dispatch } = useContext(NotificationContext)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<ApiError>()

    const initialValues: CreateRecipeFormValues = {
        name: '',
        description: '',
        method: '',
        cooking_time: '',
        ingredients: '',
    }

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
            <button type="submit">Create</button>
        </Form>
    }

    function handleSubmit(values: CreateRecipeFormValues, actions: FormikHelpers<CreateRecipeFormValues>): void {
        setIsLoading(true)
        Recipes.store(values).then((res: RestResponse<Recipe>) => {
            // Complete submission before redirecting using history API, don't be tempted to use finally()
            actions.setSubmitting(false);
            dispatch({
                type: NotificationActionType.ADD,
                payload: {
                    message: `${res.data.name} created successfully`,
                    level: NotificationLevel.info
                }
            })
            history.push('/recipes/' + res.data.id);
        }).catch((request: RestResponse<ApiError>) => {
            setError(error)
            if (request.data && request.data.errors) {
                actions.setErrors(request.data.errors as FormikErrors<CreateRecipeFormValues>);
            }
            actions.setSubmitting(false);
        }).finally(() => setIsLoading(false));
    }

    return (
        <>
            <Link to='/'>Back to search</Link>
            <ApiLoadingMessage isLoading={isLoading} />
            <ApiErrorMessage error={error} />
            <Formik component={form} initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}/>
        </>
    );
}