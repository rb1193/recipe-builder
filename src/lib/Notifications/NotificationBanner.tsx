import React, { useContext } from "react"
import { NotificationContext } from '../../Context'
import classNames from 'classnames'
import { NotificationActionType, NotificationLevel } from "./useNotifications"
import './NotificationBanner.css'

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
            `NotificationBanner__Notification--${item.level}`,
        )
        return <div key={`notification_${index}`} className={classes}>
            <span>{item.message}</span>
            <button type="button" className="NotificationBanner__DismissButton"
                onClick={() => {dispatch({type: NotificationActionType.REMOVE, payload: item})}}>
                Dismiss
            </button>
        </div>
    })

    return (<section className="NotificationBanner">
        <div className="NotificationBanner__Container">{items}</div>
    </section>)
}