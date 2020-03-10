import React from "react";
import { Form } from 'formik';
import TextInput, {TextInputTypes} from "../lib/Forms/TextInput";

function RegisterForm () {
    return (
        <Form noValidate>
            <TextInput name="email" label="Email" type={TextInputTypes.Email} id="register_email"></TextInput>
            <TextInput name="password" label="Password" type={TextInputTypes.Password} id="register_password"></TextInput>
            <TextInput name="password_confirmation" label="Confirm Password" type={TextInputTypes.Password}></TextInput>
            <button type="submit">Sign Up</button>
        </Form>
    )
}

export default RegisterForm;