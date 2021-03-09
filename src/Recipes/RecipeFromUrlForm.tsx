import React, {  useState } from 'react'
import { useHistory } from 'react-router'
import { ApiError, RestResponse } from '../lib/Api/RestResponse'
import * as Yup from 'yup'
import { Formik, Form, FormikHelpers } from 'formik'
import TextInput, { TextInputTypes } from '../lib/Forms/TextInput'
import { SubmitButton } from '../lib/Buttons/Buttons'
import ApiErrorMessage from '../lib/Api/ApiErrorMessage'
import { LinkButton } from '../lib/Buttons/Buttons'
import Recipe from '../Contracts/Recipe'
import Recipes from '../Api/Recipes'
import { RequestError } from '../Api/RequestError'
import parseRequestError from '../Api/parseRequestError'
import { Heading, VStack } from '@chakra-ui/layout'
import { useToast } from '@chakra-ui/toast'

type UrlFormValues = {
  url: string
}

export default function RecipeFromUrlForm(): React.ReactElement {
  let history = useHistory()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<ApiError>()
  const toast = useToast()

  const initialValues: UrlFormValues = {
    url: '',
  }

  const validationSchema = Yup.object().shape({
    url: Yup.string()
      .required()
      .url()
      .label('Link'),
  })

  const form = () => {
    return (
      <Form noValidate>
        <VStack spacing="8">
          <TextInput type={TextInputTypes.Text} name="url" label="Link" />
          <SubmitButton isLoading={isLoading} text="Fetch recipe" />
        </VStack>
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
      })
      .finally(() => setIsLoading(false))
  }

  return (
    <VStack spacing="8">
      <LinkButton to="/recipes/create" text="Add Manually" />
      <Heading size="lg">Add a New Recipe from the Web</Heading>
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
