import React, { ReactElement, useContext } from "react";
import { Formik, Form, FormikHelpers, FormikErrors } from "formik";
import * as Yup from "yup";
import TextInput, { TextInputTypes } from "../lib/Forms/TextInput";
import TextAreaInput from "../lib/Forms/TextAreaInput";
import Recipes from "../Api/Recipes";
import { useHistory } from "react-router";
import Recipe from "../Contracts/Recipe";
import { fetchApiRequest, SuccessfulRequest, FailedRequest } from "../lib/Api/ApiRequest";
import { NotificationContext } from "../Context";
import { NotificationLevel } from "../lib/Notifications/NotificationBanner";
import { NotificationActionType } from "../lib/Notifications/useNotifications";

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
        fetchApiRequest(Recipes.store(values)).then((request: SuccessfulRequest<Recipe>) => {
            // Complete submission before redirecting using history API, don't be tempted to use finally()
            actions.setSubmitting(false);
            dispatch({
                type: NotificationActionType.ADD,
                payload: {
                    message: `${request.payload.data.name} created successfully`,
                    level: NotificationLevel.info
                }
            })
            history.push('/recipes/' + request.payload.data.id);
        }).catch((request: FailedRequest) => {
            if (request.payload.data && request.payload.data.errors) {
                actions.setErrors(request.payload.data.errors as FormikErrors<CreateRecipeFormValues>);
            }
            actions.setSubmitting(false);
        });
    }

    return (
        <Formik component={form} initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}/>
    );
}