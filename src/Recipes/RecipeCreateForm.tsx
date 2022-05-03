import React, { ReactElement, useState } from 'react'
import { Formik, Form, FormikHelpers } from 'formik'
import * as Yup from 'yup'
import TextInput, { TextInputTypes } from '../lib/Forms/TextInput'
import TextAreaInput from '../lib/Forms/TextAreaInput'
import Recipes from '../Api/Recipes'
import { useHistory } from 'react-router'
import Recipe from '../Contracts/Recipe'
import { RestResponse, ApiError } from '../lib/Api/RestResponse'
import ApiErrorMessage from '../lib/Api/ApiErrorMessage'
import { RequestError } from '../Api/RequestError'
import parseRequestError from '../Api/parseRequestError'
import { LinkButton, SubmitButton } from '../lib/Buttons/Buttons'
import { Box, Heading, VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'

export default function CreateRecipeForm(): ReactElement {
  let history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiError>()
  const toast = useToast()

  const initialValues: Omit<Recipe, 'id'> = {
    name: '',
    description: '',
    method: '',
    cooking_time: 0,
    ingredients: '',
    url: '',
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
            type={TextInputTypes.Text}
            name="servings"
            label="Servings"
          />
          <TextInput
            type={TextInputTypes.Number}
            name="cooking_time"
            label="Cooking Time (Minutes)"
          />
          <TextInput type={TextInputTypes.Text} name="url" label="Link" />
          <SubmitButton text="Create Recipe" isLoading={isLoading}/>
        </VStack>
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
        // Complete submission before redirectbeth.paxton@hotmail.co.uking using history API, don't be tempted to use finally()
        actions.setSubmitting(false)
        setIsLoading(false);
        toast({
            title: "Recipe created.",
            description: `${data.name} created successfully`,
            status: "success",
            duration: 9000,
            isClosable: true,
            position: 'top-left',
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
        setIsLoading(false)
      })
  }

  return (
    <VStack spacing="8" alignItems="stretch">
      <Heading size="lg">Add a New Recipe</Heading>
      <Box alignSelf="start"><LinkButton to="/recipes/create-from-url" text="Add from the web"/></Box>
      <ApiErrorMessage error={error} />
      <Formik
        component={form}
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
      />
    </VStack>
  )
}
