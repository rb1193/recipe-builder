import React, { ReactElement } from 'react'
import { ApiError } from './RestResponse'

type ApiErrorMessageProps = {
    error?: ApiError,
}

export default function ApiErrorMessage(props: ApiErrorMessageProps): ReactElement
{
    const { error } = props

    if (error) {
        const list = error.errors && error.errors.map((error) => {
            return <li key={error.key}>{error.message}</li>
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