import React, { useContext } from "react"
import { NotificationContext } from '../../Context'
import classNames from 'classnames'
import { NotificationActionType } from "./useNotifications"

export enum NotificationLevel {
    info = 'info',
    warning = 'warning',
    error = 'error'
}

export type AppNotification = {
    message: string,
    level: NotificationLevel
}

interface NotificationBannerProps {
    notifications: AppNotification[]
}

export default function NotificationBanner(props: NotificationBannerProps) {
    const { dispatch } = useContext(NotificationContext)
    const { notifications } = props

    const items = notifications.map((item, index) => {
        const classes = classNames(
            `NotificationBanner__Notification`,
            `NotificationBanner__Notification__${item.level}`,
        )
        return <div key={`notification_${index}`} className={classes}>
            <span>{item.message}</span>
            <button type="button" className="NotificationBenner__NotificationDismiss"
                onClick={() => {dispatch({type: NotificationActionType.REMOVE, payload: item})}}>
                Dismiss
            </button>
        </div>
    })

    return (<div className="NotificationBanner">{items}</div>)
}