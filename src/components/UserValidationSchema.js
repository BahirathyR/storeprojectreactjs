import * as Yup from "yup";  
import React from 'react';  

  
export const UserValidationSchema = Yup.object().shape({  
   
    email: Yup.string()
      .email("Enter a valid email")
      .required("Email is required"),
    // course: Yup.string().required("Select your User Type"),
    // password: Yup.string()
    //   .min(8, "Password must contain at least 8 characters")
    //   .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.')
    //   .required("Enter your password"),
    // confirmPassword: Yup.string()
    //   .required("Confirm your password")
    //   .oneOf([Yup.ref("password")], "Password does not match"),
  
firstName: Yup.string()  
.required('First Name is required'),  
lastName: Yup.string()  
.required('Last Name is required'), 
EmpId: Yup.string()  
.required('EmployeeId is required')
.matches(/^[0-9]*$/, 'Must be a number'), 
emailId: Yup.string()  
.email('Email is invalid')  
.required('Email is required'),  
password: Yup.string()  
.min(6, 'Password must be at least 6 characters')  
.required('Password is required'),  
confirmPassword: Yup.string()  
.oneOf([Yup.ref('password'), null], 'Passwords must match')  
.required('Confirm Password is required'),  
mobileNo: Yup.string()  
.required('Mobile Numer is required'),  
address: Yup.string()  
.required('Address is required'),  
pinCode: Yup.string()  
.min(6, 'Pincode must be at 6 digits')  
.max(6,'Pincode must be at 6 digits')  
.required('Pin Code is required'),  
companyName: Yup.string()  
.required('Company Name is required'),
gstinNo: Yup.string()  
 .required('GstinNo. is required') 
 .trim()
    .matches(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/
        , 'Is not in correct format'),
panNo:Yup.string()
.required('PanNo. is required') 
 .trim()
.matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/,'Is not in correct format'),
course: Yup.string().required("Select your User Type"),
dateExampleRequired: Yup.date()
.required('Birth date is required')
.max(new Date(),"Birth Date Cannot be in the future"),
});  



