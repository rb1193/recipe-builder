import { LoginFormValues } from "../Auth/LoginForm";
import { RegisterFormValues } from "../Auth/RegisterFormContainer";
import { RestResponse } from "../lib/Api/RestResponse";
import defaultRequestOptions from './defaultRequestOptions';
import User from "../Contracts/User";

const Auth = {
    register: async (values: RegisterFormValues): Promise<RestResponse<User>> => {
        return new Promise<RestResponse<User>>(resolve => {
            setTimeout(() => {
                resolve(JSON.parse('{"data": {"email": "test@test.com"}}'));
            }, 2000);
        });
    },
    login: async (values: LoginFormValues): Promise<RestResponse<User>> => {
        const fetchOptions: RequestInit = {
            ...defaultRequestOptions,
            body: JSON.stringify({ username: values.email, password: values.password }),
            method: 'POST',
        }
        return fetch(`${process.env.REACT_APP_API_URL}/login`, fetchOptions).then((response: Response) => {
            if (!response.ok) {
                throw Error('Authentication failed')
            }
            return response.json()
        })
    },
    user: async (): Promise<RestResponse<User>> => {
        const fetchOptions: RequestInit = {
            ...defaultRequestOptions,
            method: 'GET',
        }
        return fetch(`${process.env.REACT_APP_API_URL}/user`, fetchOptions).then((res) => {
            return res.json()
        })
    }
}

export default Auth