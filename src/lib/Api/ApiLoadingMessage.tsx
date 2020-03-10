import React, { ReactElement } from 'react'

type ApiErrorMessageProps = {
    isLoading: boolean,
}

export default function ApiLoadingMessage(props: ApiErrorMessageProps): ReactElement
{
    const { isLoading } = props

    if (isLoading) {
        return (
            <div className="ApiLoadingMessage">
                <p>Loading</p>
            </div>
        )
    }

    return (<></>);
}