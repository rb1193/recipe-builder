import React from "react";
import { useField, FieldMetaProps, FieldInputProps, FieldHelperProps } from 'formik';
import { Field, Textarea } from "@chakra-ui/react";

export interface TextAreaInputProps {
    label: string,
    name: string,
    id?: string,
}

export default function TextAreaInput(props: TextAreaInputProps) {
    const {label, name, id } = props;
    const [field, meta]: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = useField(props);

    return (
        <Field.Root id={id} invalid={meta.touched && meta.error !== undefined}>
            <Field.Label htmlFor={name}>{label}</Field.Label>
            <Textarea {...field} id={id || name}/>
            <Field.ErrorText>{meta.error}</Field.ErrorText>
        </Field.Root>
    );
}
