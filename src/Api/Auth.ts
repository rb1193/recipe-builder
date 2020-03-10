import { LoginFormValues } from "../Auth/LoginForm";
import { RegisterFormValues } from "../Auth/RegisterFormContainer";
import GqlResponse from "./GqlResponse";

function delay() {
    return new Promise<GqlResponse>(resolve => {
        setTimeout(() => {
            resolve(JSON.parse('{"data": {"email": "test@test.com"}}'));
        }, 2000);
    });
}

function delayToken() {
    return new Promise<GqlResponse>(resolve => {
        setTimeout(() => {
            resolve(JSON.parse('{"data": {"token": "absksdifosdf"}}'));
        }, 2000);
    });
}

function delayError() {
    return new Promise<GqlResponse>(resolve => {
        setTimeout(() => {
            resolve(JSON.parse('{"error": {"graphQLErrors": {"email": "Email is invalid"}}}'));
        }, 2000);
    });
}

const Auth = {
    register: async (values: RegisterFormValues): Promise<GqlResponse> => {
        if (values.email === 'error@error.com') {
            const res = await delayError();
            throw res;
        }
        return await delay();
    },
    login: async (values: LoginFormValues): Promise<GqlResponse> => {
        if (values.email === 'error@error.com') {
            const res = await delayError();
            throw res;
        }
        return await delayToken();
    },
    user: async (): Promise<GqlResponse> => {
        return new Promise<GqlResponse>((resolve, reject) => {
            setTimeout(() => {
                //reject(new Error('Unauthenticated'))
                resolve(JSON.parse('{"data": {"email": "test@test.com"}}'))
            }, 250);
        });
    }
}

export default Auth