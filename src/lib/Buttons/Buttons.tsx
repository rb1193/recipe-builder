import React from 'react'
import { Link } from 'react-router-dom'
import './Buttons.css'

export function ActionButton(props: {text: string, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void}) {
    return (<button className="Button Button--Action Button--Primary" type="button" onClick={props.onClick}>{props.text}</button>)
}

export function SubmitButton(props: {text: string}): React.ReactElement
{
    return (<button className="Button Button--Submit Button--Primary" type="submit">{props.text}</button>)
}

export function LinkButton(props: {to: string, text: string}): React.ReactElement
{
    return (<Link to={props.to} className="Button Button--Link Button--Primary">{props.text}</Link>)
}