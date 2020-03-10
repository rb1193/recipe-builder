import React from 'react';
import { useField, FieldMetaProps, FieldInputProps, FieldHelperProps } from 'formik';
import './TextInput.css';

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
    id?: string
}

export default function TextInput(props: TextInputProps) {
    const {label, name, type, id } = props;
    const [field, meta]: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = useField(props);

    return (
        <div className="TextInput">
            <label className="TextInput__Label" htmlFor={name}>{label}</label>
            <input {...field} className="TextInput__Input" id={id || name} type={type}/>
            {meta.touched && meta.error ? (
                <div className='TextInput__Errors'><span>{meta.error}</span></div>
            ) : null}
        </div>
    );
}
