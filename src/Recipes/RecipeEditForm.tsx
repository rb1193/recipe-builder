import React, { ReactElement, useEffect, useState } from 'react'

import { Form, Formik, FormikHelpers } from 'formik'
import { useHistory, useParams } from 'react-router'
import * as Yup from 'yup'

import parseRequestError from '../Api/parseRequestError'
import Recipes from '../Api/Recipes'
import { RequestError } from '../Api/RequestError'
import Recipe from '../Contracts/Recipe'
import ApiErrorMessage from '../lib/Api/ApiErrorMessage'
import ApiLoadingMessage from '../lib/Api/ApiLoadingMessage'
import { ApiError, RestResponse } from '../lib/Api/RestResponse'
import { SubmitButton } from '../lib/Buttons/Buttons'
import TextAreaInput from '../lib/Forms/TextAreaInput'
import TextInput, { TextInputTypes } from '../lib/Forms/TextInput'
import { Heading, VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'

export type EditRecipeFormValues = Omit<Recipe, 'id'>

export default function EditRecipeForm(): ReactElement {
  let history = useHistory()
  const { recipeId } = useParams<{ recipeId?: string }>()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<ApiError>()
  const [recipe, setRecipe] = useState<Recipe>()
  const toast = useToast()

  useEffect(() => {
    setIsLoading(true)
    fetch(Recipes.one(recipeId || ''))
      .then((res) => {
        return Promise.all<Response, RestResponse<Recipe | ApiError>>([
          res,
          res.json(),
        ])
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
      .notRequired()
      .nullable()
      .url()
      .label('Link'),
  })

  function form() {
    return (
      <Form noValidate>
        <VStack spacing="8">
          <TextInput type={TextInputTypes.Text} name="name" label="Name" />
          <TextAreaInput name="description" label="Short Description" />
          <TextAreaInput name="method" label="Method" />
          <TextAreaInput name="ingredients" label="Ingredients" />
          <TextInput
            type={TextInputTypes.Number}
            name="cooking_time"
            label="Cooking Time (Minutes)"
          />
          <TextInput type={TextInputTypes.Text} name="url" label="Link" />
          <SubmitButton text="Save Changes"  isLoading={isLoading}/>
        </VStack>
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
        return Promise.all<Response, RestResponse<Recipe | ApiError>>([
          res,
          res.json(),
        ])
      })
      .then(([res, resJson]) => {
        if (!res.ok) {
          throw new RequestError(resJson as RestResponse<ApiError>)
        }
        const data = resJson.data as Recipe
        // Complete submission before redirecting using history API, don't be tempted to use finally()
        actions.setSubmitting(false)
        setIsLoading(false)

        toast({
            title: "Recipe saved.",
            description: `${data.name} saved successfully`,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: 'top-left',
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

  const initialValues: Omit<Recipe, 'id'> = {
    name: recipe?.name || '',
    description: recipe?.description || '',
    cooking_time: recipe?.cooking_time || 0,
    method: recipe?.method || '',
    ingredients: recipe?.ingredients || '',
    url: recipe?.url,
  }

  return (
    <>
      <ApiLoadingMessage isLoading={isLoading} />
      <ApiErrorMessage error={error} />
      {recipe && (
        <>
          <Heading size="lg" my="8">Edit "{recipe.name}"</Heading>
          <Formik
            component={form}
            enableReinitialize={true}
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          />
        </>
      )}
    </>
  )
}
