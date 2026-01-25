import React from 'react';
import { Field, Input } from "@chakra-ui/react"
import { useField, FieldMetaProps, FieldInputProps, FieldHelperProps } from 'formik';

export enum TextInputTypes {
    Email = 'email',
    Number = 'number',
    Password = 'password',
    Search = 'search',
    Tel = 'tel',
    Text = 'text',
}

interface TextInputProps {
    label: string,
    name: string,
    type: TextInputTypes,
    id?: string,
    placeholder?: string,
}

export default function TextInput(props: TextInputProps) {
    const {label, name, type, id, placeholder } = props;
    const [field, meta]: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = useField(props);

    return (
        <Field.Root id={id} invalid={meta.touched && meta.error !== undefined}>
            <Field.Label htmlFor={name}>{label}</Field.Label>
            <Input {...field} id={id || name} type={type} placeholder={placeholder}/>
            <Field.ErrorText>{meta.error}</Field.ErrorText>
        </Field.Root>
    );
}
