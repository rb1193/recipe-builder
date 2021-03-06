import React from 'react';
import { FormErrorMessage, FormControl, FormLabel, Input } from "@chakra-ui/react"
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
        <FormControl id={id} isInvalid={meta.touched && meta.error !== undefined}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Input {...field} id={id || name} type={type} placeholder={placeholder}/>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
}
