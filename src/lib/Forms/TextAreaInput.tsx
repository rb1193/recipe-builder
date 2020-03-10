import React from "react";
import { useField, FieldMetaProps, FieldInputProps, FieldHelperProps } from 'formik';
import './TextAreaInput.css';

export interface TextAreaInputProps {
    label: string,
    name: string,
    id?: string,
}

export default function TextAreaInput(props: TextAreaInputProps) {
    const {label, name, id } = props;
    const [field, meta]: [FieldInputProps<any>, FieldMetaProps<any>, FieldHelperProps<any>] = useField(props);

    return (
        <div className="TextAreaInput">
            <label className="TextAreaInput__Label" htmlFor={name}>{label}</label>
            <textarea {...field} className="TextAreInput__Input" id={id || name}/>
            {meta.touched && meta.error ? (
                <div className='TextAreaInput__Errors'><span>{meta.error}</span></div>
            ) : null}
        </div>
    );
}