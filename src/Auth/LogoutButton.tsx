import React, { useContext } from 'react'
import { NotificationContext, UserContext } from '../Context'
import { NotificationActionType, NotificationLevel } from '../lib/Notifications/useNotifications'
import Auth from '../Api/Auth'
import { ActionButton } from '../lib/Buttons/Buttons'

export default function LogoutButton(): React.ReactElement {
    const { setUser } = useContext(UserContext)
    const { dispatch } = useContext(NotificationContext)

    const logout = async() => {
        try {
            await Auth.logout()
            setUser(null)
        } catch (error) {
            dispatch({
                type: NotificationActionType.ADD,
                payload: {
                    message: `Unable to reach server`,
                    level: NotificationLevel.info,
                },
            })
        }
    }

    return (<ActionButton text="Log Out" onClick={logout} />)
}