import React, { useContext } from 'react';
import { ReactElement } from 'react';
import { Form, FormikValues, FormikHelpers, Formik } from 'formik';
import Auth from '../Api/Auth';
import TextInput, {TextInputTypes} from '../lib/Forms/TextInput';
import UserContext from '../Context';
import { SubmitButton } from '../lib/Buttons/Buttons';
import { Box, VStack } from '@chakra-ui/react';

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
            // Set submit before setting user because context change causes instant rerender
            actions.setSubmitting(false)
            setUser(res.data)
        }).catch(() => {
            actions.setErrors({email: 'Invalid credentials provided'});
            actions.setSubmitting(false);
        })
    }

    function form() {
        return <Form noValidate>
            <VStack spacing="8">
                <TextInput name="email" label="Email" type={TextInputTypes.Email} id="login_email"></TextInput>
                <TextInput name="password" label="Password" type={TextInputTypes.Password} id="login_password"></TextInput>
                <SubmitButton text="Log In" isLoading={false} />
            </VStack>
        </Form>
    }

    return (
        <Box p="8">
            <Formik component={form} initialValues={initialValues} onSubmit={submitHandler} />
        </Box>
    );
}

export default LoginForm;