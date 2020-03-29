import React, { useContext } from 'react';
import { ReactElement } from 'react';
import { Form, FormikValues, FormikHelpers, Formik } from 'formik';
import Auth from '../Api/Auth';
import TextInput, {TextInputTypes} from '../lib/Forms/TextInput';
import { UserContext } from '../Context';

export interface LoginFormValues extends FormikValues {
    email: string,
    password: string,
}

function LoginForm(): ReactElement {
    const { setUser } = useContext(UserContext)

    const initialValues: LoginFormValues = {
        email: "",
        password: "",
    }

    function submitHandler(values: LoginFormValues, actions: FormikHelpers<LoginFormValues>): void {
        Auth.login(values).then((res) => {
            setUser(res.data)
        }).catch(() => {
            actions.setErrors({email: 'Invalid credentials provided'});
        }).finally(() => {
            actions.setSubmitting(false);
        });
    }

    function form() {
        return <Form noValidate>
            <TextInput name="email" label="Email" type={TextInputTypes.Email} id="login_email"></TextInput>
            <TextInput name="password" label="Password" type={TextInputTypes.Password} id="login_password"></TextInput>
            <button type="submit">Log In</button>
        </Form>
    }

    return (
        <div className="LoginForm">
            <Formik component={form} initialValues={initialValues} onSubmit={submitHandler} />
        </div>
    );
}

export default LoginForm;