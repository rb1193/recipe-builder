import React from 'react';

import * as R from 'ramda';
import {
  Redirect,
  Route,
  RouteProps,
} from 'react-router';

import User from '../Contracts/User';

interface GuardProps extends RouteProps {
    user: User | null
}

export default function GuardedRoute(props: GuardProps): any {
    const { user } = props
    if (!user) {
        return (<Redirect to="/" />)
    }

    const routeProps = R.omit('user', props)

    return (
        <Route {...routeProps} />
    )
}