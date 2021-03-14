import { Spinner } from '@chakra-ui/spinner';
import React, { ReactElement } from 'react'

type ApiErrorMessageProps = {
    isLoading: boolean,
    message?: string
}

export default function ApiLoadingMessage(props: ApiErrorMessageProps): ReactElement | null
{
    const { isLoading } = props

    if (isLoading) {
        return (
            <Spinner />
        )
    }

    return null;
}