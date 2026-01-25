import { Alert } from '@chakra-ui/react'
import { MdError } from 'react-icons/md'
import React, { ReactElement } from 'react'
import { ApiError } from './RestResponse'

type ApiErrorMessageProps = {
  error?: ApiError
}

export default function ApiErrorMessage(
  props: ApiErrorMessageProps,
): ReactElement | null {
  const { error } = props

  if (error) {
    const list =
      error.errors &&
      Object.keys(error.errors).map((message, key) => {
        return <li key={key}>{message}</li>
      })

    return (
      <Alert.Root
        status="error"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <Alert.Indicator>
          <MdError />
        </Alert.Indicator>
        <Alert.Title mr="2">{error.message}</Alert.Title>
        {list && <Alert.Description as="ul">{list}</Alert.Description>}
      </Alert.Root>
    )
  }

  return null
}
