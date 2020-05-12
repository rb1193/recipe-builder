import React, { ReactElement } from 'react'

type ApiErrorMessageProps = {
    isLoading: boolean,
    message?: string
}

export default function ApiLoadingMessage(props: ApiErrorMessageProps): ReactElement
{
    const { isLoading, message } = props

    if (isLoading) {
        return (
            <div className="ApiLoadingMessage">
                <p>{message || 'Loading'}</p>
            </div>
        )
    }

    return (<></>);
}