import React, { ReactElement, useState, useEffect } from "react";
import { Formik, Form, FormikHelpers, FormikErrors } from "formik";
import * as Yup from "yup";
import TextInput, { TextInputTypes } from "../lib/Forms/TextInput";
import TextAreaInput from "../lib/Forms/TextAreaInput";
import Recipes from "../Api/Recipes";
import { useHistory, useParams } from "react-router";
import Recipe from "../Contracts/Recipe";
import { ApiRequest, ApiRequestStatus, fetchApiRequest, SuccessfulRequest, FailedRequest } from "../lib/Api/ApiRequest";

export interface EditRecipeFormValues {
    name: string,
    description: string,
    method: string,
    cooking_time: number | '',
    ingredients: string,
}

export default function EditRecipeForm(): ReactElement {
    let history = useHistory();

    const { recipeId } = useParams()

    const [recipeRequest, setRecipeRequest] = useState<ApiRequest<Recipe>>({status: ApiRequestStatus.new})

    useEffect(() => {
        fetchApiRequest(Recipes.one(recipeId || '')).then((request: ApiRequest<Recipe>) => {
            setRecipeRequest(request)
        })
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
        fetchApiRequest(Recipes.update(recipeId, values)).then((request: SuccessfulRequest<Recipe>) => {
            // Complete submission before redirecting using history API, don't be tempted to use finally()
            actions.setSubmitting(false);
            history.push('/recipes/' + request.payload.data.id);
        }).catch((request: FailedRequest) => {
            if (request.payload.data && request.payload.data.errors) {
                actions.setErrors(request.payload.data.errors as FormikErrors<EditRecipeFormValues>);
            }
            actions.setSubmitting(false);
        });
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
            const initialValues: EditRecipeFormValues = recipeRequest.payload.data
            return (
                <Formik component={form} initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}/>
            );
            
    }
}