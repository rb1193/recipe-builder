import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@chakra-ui/react'
import { AlertIcon } from '@chakra-ui/icons'
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
      <Alert
        status="error"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
      >
        <AlertIcon />
        <AlertTitle mr="2">{error.message}</AlertTitle>
        {list && <AlertDescription as="ul">{list}</AlertDescription>}
      </Alert>
    )
  }

  return null
}
