import React from 'react'
import { LinkButton } from './lib/Buttons/Buttons'
import LogoutButton from './Auth/LogoutButton'
import './Nav.css'

export default function Nav(): React.ReactElement {
    return (
        <nav className="Nav Nav--Main">
            <div className="Nav__Item">
                <LinkButton to="/" text="Search Recipes" />
            </div>
            <div className="Nav__Item">
                <LinkButton to="/recipes/create" text="Add Recipe" />
            </div>
            <div className="Nav__Item">
                <LinkButton to="/recipes/all" text="All Recipes" />
            </div>
            <div className="Nav__Item">
                <LogoutButton />
            </div>
        </nav>
    )
}
