import { Alert, AlertDescription, AlertIcon, AlertTitle } from '@chakra-ui/alert'
import React, { ReactElement } from 'react'
import { ApiError } from './RestResponse'

type ApiErrorMessageProps = {
    error?: ApiError,
}

export default function ApiErrorMessage(props: ApiErrorMessageProps): ReactElement | null
{
    const { error } = props

    if (error) {
        const list = error.errors && Object.keys(error.errors).map((message, key) => {
            return <li key={key}>{message}</li>
        })

        return (
            <Alert status="error">
                <AlertIcon />
                <AlertTitle mr="2">{error.message}</AlertTitle>
                <AlertDescription>{list && <ul>{list}</ul>}</AlertDescription>
            </Alert>
        )
    }

    return null
}