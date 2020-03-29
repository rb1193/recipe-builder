import React from 'react';
import User from './Contracts/User';
import { NotificationReducerAction } from './lib/Notifications/useNotifications'

type UserContext = {
    user: User | null,
    setUser: React.Dispatch<React.SetStateAction<User|null>>
}

export const UserContext = React.createContext<UserContext>({user: null, setUser: () => {}})

type NotificationContext = {
    dispatch(action: NotificationReducerAction): void,
}

export const NotificationContext = React.createContext<NotificationContext>({
    dispatch: () => {},
})