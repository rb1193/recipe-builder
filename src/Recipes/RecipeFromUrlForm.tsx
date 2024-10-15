import React, { useState } from 'react'
import { useNavigate } from 'react-router'
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
import { Box, Heading, VStack } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'

type UrlFormValues = {
  url: string
}

export default function RecipeFromUrlForm(): React.ReactElement {
  let navigate = useNavigate()
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
        if (!res.ok) {
          res.json().then(json => {
            throw new RequestError(json);
          })
        }
        return  res.json()
      })
      .then((json: RestResponse<Recipe>) => {
        const data = json.data
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
        navigate('/recipes/' + data.id)
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
    <VStack spacing="8" alignItems="stretch">
      <Heading size="lg">Add a New Recipe from the Web</Heading>
      <Box alignSelf="start"><LinkButton to="/recipes/create" text="Add Manually" /></Box>
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
