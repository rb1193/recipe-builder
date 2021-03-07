import React from 'react'
import { Button } from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export function ActionButton(props: {text: string, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void}) {
    return (<Button colorScheme="teal" type="button" onClick={props.onClick}>{props.text}</Button>)
}

export function SubmitButton(props: {text: string, isLoading: boolean}): React.ReactElement
{
    return (<Button isLoading={props.isLoading} colorScheme="teal" type="submit">{props.text}</Button>)
}

export function LinkButton(props: {to: string, text: string}): React.ReactElement
{
    return (<Button as={Link} to={props.to}>{props.text}</Button>)
}