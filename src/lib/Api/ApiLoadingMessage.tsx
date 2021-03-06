import { Text } from '@chakra-ui/layout';
import React, { ReactElement } from 'react'

type ApiErrorMessageProps = {
    isLoading: boolean,
    message?: string
}

export default function ApiLoadingMessage(props: ApiErrorMessageProps): ReactElement | null
{
    const { isLoading, message } = props

    if (isLoading) {
        return (
            <Text>{message || 'Loading'}</Text>
        )
    }

    return null;
}