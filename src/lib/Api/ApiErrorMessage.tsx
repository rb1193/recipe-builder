import React, { ReactElement } from 'react'
import { ApiError } from './RestResponse'
import './ApiErrorMessage.css'

type ApiErrorMessageProps = {
    error?: ApiError,
}

export default function ApiErrorMessage(props: ApiErrorMessageProps): ReactElement
{
    const { error } = props

    if (error) {
        const list = error.errors && Object.keys(error.errors).map((message, key) => {
            return <li key={key}>{message}</li>
        })

        return (
            <div className="ApiErrorMessage">
                <p>{error.message}</p>
                {list && <ul>{list}</ul>}
            </div>
        )
    }

    return (<></>)
}