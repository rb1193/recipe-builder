import React from 'react'
import { Button, ButtonProps } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export function ActionButton(props: {text: string, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void}) {
    return (<Button colorPalette="teal" type="button" onClick={props.onClick}>{props.text}</Button>)
}

export function SubmitButton(props: {text: string, loading: boolean}): React.ReactElement
{
    return (<Button loading={props.loading} colorPalette="teal" type="submit">{props.text}</Button>)
}

export function LinkButton(props: {to: string, text: string, disabled?: boolean, variant?: ButtonProps['variant']}): React.ReactElement
{
    return (<Button asChild variant={props.variant} disabled={props.disabled ?? false}><Link to={props.to}>{props.text}</Link></Button>)
}
