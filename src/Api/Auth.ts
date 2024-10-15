import { LoginFormValues } from "../Auth/LoginForm"
import { RestResponse } from "../lib/Api/RestResponse"
import defaultRequestOptions from './defaultRequestOptions'
import User from "../Contracts/User"

const Auth = {
    login: async (values: LoginFormValues): Promise<RestResponse<User>> => {
        const fetchOptions: RequestInit = {
            ...defaultRequestOptions,
            body: JSON.stringify({ username: values.email, password: values.password }),
            method: 'POST',
        }
        return fetch(`${import.meta.env.VITE_API_URL}/login`, fetchOptions).then((response: Response) => {
            if (!response.ok) {
                throw Error('Authentication failed')
            }
            return response.json()
        })
    },
    logout: async(): Promise<null> => {
        const options: RequestInit = {
            ...defaultRequestOptions,
            method: 'POST',
        }
        return fetch(`${import.meta.env.VITE_API_URL}/logout`, options).then((res: Response) => {
            if (!res.ok) throw new Error('Logout failed')
            return null
        })
    },
    user: async (): Promise<RestResponse<User>> => {
        const fetchOptions: RequestInit = {
            ...defaultRequestOptions,
            method: 'GET',
        }
        return fetch(`${import.meta.env.VITE_API_URL}/user`, fetchOptions).then((res) => {
            return res.json()
        })
    }
}

export default Auth