import React from 'react';
import { ReactElement } from 'react';
import { Formik, FormikValues, FormikHelpers } from 'formik';
import RegisterForm from './RegisterForm';
import * as Yup from 'yup';
import Auth from '../Api/Auth';
import { RestResponse, ApiError } from '../lib/Api/RestResponse';
import User from '../Contracts/User';

export interface RegisterFormValues extends FormikValues {
    email: string,
    password: string,
    password_confirmation: string
}

function RegisterFormContainer(): ReactElement {
    const initialValues: RegisterFormValues = {
        email: '',
        password: '',
        password_confirmation: '',
    }

    const validationSchema = Yup.object().shape({
        email: Yup.string().required().email().label('Email'),
        password: Yup.string().required().min(12).label('Password'),
        password_confirmation: Yup.string()
            .required()
            .oneOf([Yup.ref('password')], "Passwords must match")
            .label('Confirm password')
    })

    function submitHandler(values: RegisterFormValues, actions: FormikHelpers<RegisterFormValues>): void {
        Auth.register(values).then((res: RestResponse<User>) => {
            console.log(res.data);
        }).catch((res: RestResponse<ApiError>) => {
            if (res.data.errors) {
                actions.setErrors(res.data.errors);
            }
        }).finally(() => {
            actions.setSubmitting(false);
        });
    }

    return (
        <div className="RegisterFormContainer">
            <Formik
                initialValues={initialValues}
                onSubmit={submitHandler}
                component={RegisterForm}
                validationSchema={validationSchema}
            ></Formik>
        </div>
    );
}

export default RegisterFormContainer;