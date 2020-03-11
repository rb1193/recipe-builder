import { useReducer, Reducer } from "react";
import { AppNotification } from "./NotificationBanner";

export enum NotificationActionType {
    ADD = 'add',
    REMOVE = 'remove',
}

export type NotificationReducerAction = {
    type: NotificationActionType,
    payload: AppNotification
}

function notificationsReducer(state: AppNotification[], action: NotificationReducerAction) {
    switch(action.type) {
        case NotificationActionType.ADD:
            return [...state, action.payload]
        case NotificationActionType.REMOVE:
            return state.filter(item => !Object.is(action.payload, item))
    }
}

export default function useNotifications() {
    return useReducer<Reducer<AppNotification[], NotificationReducerAction>>(notificationsReducer, [])
}