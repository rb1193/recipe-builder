import React from "react";
import { useField, FieldMetaProps, FieldInputProps, FieldHelperProps } from 'formik';
import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { Textarea } from "@chakra-ui/react";

export interface TextAreaInputProps {
    label: string,
    name: string,
    id?: string,
}

export default function TextAreaInput(props: TextAreaInputProps) {
    const {label, name, id } = props;
    const [field, meta]: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = useField(props);

    return (
        <FormControl id={id} isInvalid={meta.touched && meta.error !== undefined}>
            <FormLabel htmlFor={name}>{label}</FormLabel>
            <Textarea {...field} id={id || name}/>
            <FormErrorMessage>{meta.error}</FormErrorMessage>
        </FormControl>
    );
}