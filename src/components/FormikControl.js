import Select from './Select'
import React from "react";

export default function FormikControl(props){
    const {control,  ...rest}=props
    switch (control){
        case 'select':
            return<Select {...rest}/>
            default:
                return null
    }
}