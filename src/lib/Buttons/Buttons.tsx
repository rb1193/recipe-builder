import React from 'react'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import './Buttons.css'

export function ActionButton(props: {text: string, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void}) {
    return (<Button colorScheme="teal" type="button" onClick={props.onClick}>{props.text}</Button>)
}

export function SubmitButton(props: {text: string}): React.ReactElement
{
    return (<Button colorScheme="teal" type="submit">{props.text}</Button>)
}

export function LinkButton(props: {to: string, text: string}): React.ReactElement
{
    return (<Link to={props.to} className="Button Button--Link Button--Primary">{props.text}</Link>)
}