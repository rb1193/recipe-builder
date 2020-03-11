import React from 'react';
import User from './Contracts/User';
import { NotificationReducerAction } from './lib/Notifications/useNotifications'

export const UserContext = React.createContext<User | null>(null)

type NotificationContext = {
    dispatch(action: NotificationReducerAction): void,
}

export const NotificationContext = React.createContext<NotificationContext>({
    dispatch: () => {},
})