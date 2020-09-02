
import React from 'react';  
import { Formik, Field, Form, ErrorMessage} from 'formik';  
import { Datepicker,SubmitBtn} from 'react-formik-ui';
import service from "../service/service"
import * as Yup from 'yup';
import AppBar from '@material-ui/core/AppBar';
import { Toolbar,IconButton,Button,Typography} from '@material-ui/core';
import {  
    Row,  
    Col,  
    Container,  
    Table ,
    
    } from 'react-bootstrap';  
import Axios from 'axios';  
import { toast } from 'react-toastify';  
import 'react-toastify/dist/ReactToastify.css';  
import 'bootstrap/dist/css/bootstrap.css';  
import { UserValidationSchema } from "./UserValidationSchema";  
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
// import DatePicker from "react-datepicker";


  
// toast.configure()  
// toast.configure({  
//    autoClose: 8000,  
//    draggable: false,  
// });  
// const apiUrl = "http://localhost:63377/Api/User";  

const courseCategory = [
    {
      value: "Manager",
      label: "Manager"
    },
    {
      value: "Supervisor",
      label: "Supervisor"
    },
    {
      value: "sales",
      label: "sales"
    },
    {
      value: "Maintanance",
      label: "Maintanance"
    }
  ];
  
function validateMobile(value) {  
   let error = '';  
   const mob = /^[1-9]{1}[0-9]{9}$/;  
   if (value === '') {  
      error = 'Required';  
   } else if (!mob.test(value)) {  
      error = 'Invalid mobile number';  
      }  
   return error;  
}  
// function handleChange(e) {
//     console.log(e.target.value);
//   }
 
  
class EditEmployee extends React.Component {  

    constructor(props){
        super(props);
    this.state = {  
       userData: {},  
       userList: [], 
       initialValues:{       
            id: this.props.edituser._id,
           EmpId:this.props.edituser.empId,  
           firstName: this.props.edituser.name,
           lastName:this.props.edituser.lastName,
           email: this.props.edituser.email,
           password: this.props.edituser.password,
           confirmPassword: this.props.edituser.confirmPassword,
           mobileNo: this.props.edituser.mobileNo,
           address: this.props.edituser.address,
           pinCode: this.props.edituser.pinNo,
           panNo: this.props.edituser.panNo,
      companyName: this.props.edituser.companyName,  
      gstinNo:this.props.edituser.gstin,
      course:this.props.edituser.designation,
      dob:this.props.edituser.dob,
       },
     id:"",
     usertype:sessionStorage.getItem('usertype'),
     isEdit:false,
     edituser:{}
    };  
    
        
}  
Back=()=>{
    const {history}=this.props
   history.push("/LandingPage")

}

logout=()=>{
    const {history}=this.props
   history.push("")

}
componentDidMount() {  

}  
bindUserData=async()=>{ 
    const result=await service.getEmployee()
       
          this.setState({  
          userList: result.data,  
          });  
       
    
    console.log("result",result)
    }  
   EditProduct=(user)=>{
   
       const updatedvalue={  
           EmpId:user.empId,
           firstName:user.name,  
           lastName: user.lastName,  
           email: user.email,  
           password:user.password,
           confirmPassword:user.confirmPassword,
           mobileNo:user.mobileNo,  
           address:user.address, 
           pinCode: user.pinNo,  
           panNo:user.panNo,
           companyName:user.companyName,
           course:user.designation,
           dob:user.dob
          
        }
        this.setState({
          initialValues:updatedvalue,
          id:user._id
        })
       console.log("user",updatedvalue)
   
   }
   
    deleteProduct=async(id)=>{
          const { userList } = this.state;
          const data={ "_id":id}
          console.log("data",data)
          const result=await service.deleteEmployeeById(data)
          console.log("delete",result)
          alert("Successfully Deleted");
          window.location.reload();     
       
       
          }
   
       
       
             updateUser =async(initialValues) => {  
                 console.log("fields",initialValues)
               const data={ "_id":this.state.id, "empId":this.state.initialValues.EmpId,"name":this.state.initialValues.firstName,"lastName":this.state.initialValues.lastName,"password":this.state.initialValues.password,"confirmPassword":this.state.initialValues.confirmPassword,"email":this.state.initialValues.email, "address":this.state.initialValues.address,"pinNo":this.state.initialValues.pinCode,"mobileNo":this.state.initialValues.mobileNo,"panNo":this.state.initialValues.panNo,"dob":this.state.initialValues.dob,"designation":this.state.initialValues.course,"companyName":this.state.initialValues.companyName}
   
               console.log("data",data)
               const result=await service.updateEmployeeById(data)   
             
   
             } 
  
render() {  
   const txtAlign = {  
   'textAlign': 'left'  
}  
  
const colStyle = {  
   backgroundColor: '#002b48',  
   color: "#ffffff",  
   width: '60px'  
}  
return (  
  
   <Formik  
   enableReinitialize
   //   validationSchema={ValidationSchema}
     initialValues={this.state.initialValues}    
  
   validationSchema={Yup.object().shape({
   
    email: Yup.string()
        .email('Email is invalid')
        .required('Email is required'),
        firstName: Yup.string()  
        .required('First Name is required'),  
        lastName: Yup.string()  
        .required('Last Name is required'), 
        companyName: Yup.string()  
.required('Company Name is required'),
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
panNo:Yup.string()
.required('PanNo. is required') 
 .trim()
.matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/,'Is not in correct format'),
EmpId: Yup.string()  
.required('EmployeeId is required')
.matches(/^[0-9]*$/, 'Must be a number'), 
course: Yup.string().required("Select your User Type"),
dob: Yup.date()
.required('Birth date is required')
.max(new Date(),"Birth Date Cannot be in the future"),

   
})}


   onSubmit={async (fields) => {
    const { history } = this.props;
                  console.log("store",fields)
                  const data={_id:fields.id, "empId":fields.EmpId,"name":fields.firstName,"lastName":fields.lastName,"password":fields.password,"confirmPassword":fields.confirmPassword,"email":fields.email, "address":fields.address,"pinNo":fields.pinCode,"mobileNo":fields.mobileNo,"panNo":fields.panNo,"dob":fields.dob,"designation":fields.course,"companyName":fields.companyName}
                  console.log("data",data)
                  const result=await service.updateEmployeeById(data)   
                  console.log("resullttt",result);
                    alert("Successfully updated");
                    window.location.reload();    
}} 


render={({ errors, touched,values,handleChange,handleSubmit}) => (  
    <Container>  
         <AppBar position="fixed" width="100%" height="60px">
            <Toolbar>
             
              <Typography variant="h6" style={{marginLeft:"510px"}} className="title">Employee Details
           </Typography>
           <Button type="reset" style={{marginLeft:"-606px"}}className="btn btn-secondary" onClick={this.Back}>Back</Button>   
              <Button style={{marginLeft:"980px"}} color="inherit" onClick={this.logout}>Logout</Button>
            </Toolbar>
        <Row  >  
                       
                  
            </Row>  
            
            </AppBar>
        
        <Form>  
            <Row>  
                <Col>  
                    <h2 style={{color:"white"}}>Employee Details</h2>  
                    <hr />  
                </Col>  
            </Row>  
            <Row>  
            <Col className="form-group" md={4} sm={4} xs={4} style={txtAlign}>  
                    <label htmlFor="EmpId">Employee Id</label>  
                    <Field name="EmpId" type="text" className={'form-control' + (errors.EmpId && touched.EmpId ? ' is-invalid' : '')} />  
                    <ErrorMessage name="EmpId" component="div" className="invalid-feedback" />  
                </Col>  
                <Col className="form-group" md={4} sm={4} xs={4} style={txtAlign}>  
                    <label htmlFor="firstName">First Name</label>  
                    <Field name="firstName" type="text" className={'form-control' + (errors.firstName && touched.firstName ? ' is-invalid' : '')} />  
                    <ErrorMessage name="firstName" component="div" className="invalid-feedback" />  
                </Col>  
                <Col className="form-group" md={4} sm={4} xs={4} style={txtAlign}>  
                    <label htmlFor="lastName">Last Name</label>  
                    <Field name="lastName" type="text" className={'form-control' + (errors.lastName && touched.lastName ? ' is-invalid' : '')} />  
                    <ErrorMessage name="lastName" component="div" className="invalid-feedback" />  
                </Col>  
                <Col className="form-group" md={4} sm={4} xs={4} style={txtAlign} >  
                <div className='react-datepicker-ignore-onclickoutside'style={{borderColor:"red"}} >
                <label htmlFor="designation" STYLE={{color:"White"}}>DOB</label>  

<Datepicker 
  name='dob'
//   label='DOB'
  dateFormat='dd-MM-yyyy'
  placeholder='dd-mm-yyyy'
  style={{borderColor:"red"}}
  />
  
  </div>
</Col>  
<Col md={4} className="form-group" sm={4} xs={4} style={txtAlign}>  
                    <label htmlFor="email">Email </label>  
                    <Field name="email" type="text" className={'form-control' + (errors.email && touched.email ? ' is-invalid' : '')} />  
                    <ErrorMessage name="email" component="div" className="invalid-feedback" />  
                </Col>  
                <Col className="form-group" md={4} sm={4} xs={4} style={txtAlign}>  
                    <label htmlFor="password">Password</label>  
                    <Field name="password" type="password" className={'form-control' + (errors.password && touched.password ? ' is-invalid' : '')} />  
                    <ErrorMessage name="password" component="div" className="invalid-feedback" />  
                </Col>  
               
            </Row>  
            <Row>  
            
                <Col className="form-group" md={4} sm={4} xs={4} style={txtAlign}>  
                    <label htmlFor="confirmPassword">Confirm Password</label>  
                    <Field name="confirmPassword" type="password" className={'form-control' + (errors.confirmPassword && touched.confirmPassword ? ' is-invalid' : '')} />  
                    <ErrorMessage name="confirmPassword" component="div" className="invalid-feedback" />  
                </Col>  
                <Col className="form-group" md={4} sm={4} xs={4} style={txtAlign}>  
                            <label htmlFor="companyName">Store Name</label>  
                            <Field name="companyName" type="text" className={'form-control' + (errors.companyName && touched.companyName ? ' is-invalid' : '')} />  
                            <ErrorMessage name="companyName" component="div" className="invalid-feedback" />  
             
                        </Col>  
            </Row>  
            <Row>  
                <Col md={8} sm={8} xs={8}>  
                    <Row>  
                    <Col className="form-group" md={6} sm={6} xs={6} style={txtAlign}>  
                    <label htmlFor="address">Address</label>  
                    <Field name="address" type="text" className={'form-control' + (errors.address && touched.address ? ' is-invalid' : '')} />  
                    <ErrorMessage name="address" component="div" className="invalid-feedback" />  
                </Col>  
                        <Col className="form-group" md={6} sm={6} xs={6} style={txtAlign}>  
                            <label htmlFor="pinCode">Pin Code</label>  
                            <Field name="pinCode" type="text" className={'form-control' + (errors.pinCode && touched.pinCode ? ' is-invalid' : '')} />  
                            <ErrorMessage name="pinCode" component="div" className="invalid-feedback" />  
                        </Col>  
                       
                    </Row>  
                </Col>  
                
                <Col className="form-group" md={4} sm={4} xs={4} style={txtAlign}>  
                    <label htmlFor="mobileNo">Mobile No</label>  
                    <Field validate={validateMobile} name="mobileNo" type="text" size={'sm'} className={'form-control' + (errors.mobileNo && touched.mobileNo ? ' is-invalid' : '')} />  
                    <ErrorMessage name="mobileNo" component="div" className="invalid-feedback" />  
                </Col>  
                {/* <Col className="form-group" md={4} sm={4} xs={4} style={txtAlign}>  
                    <label htmlFor="gstinNo">Gstin No</label>  
                    <Field name="gstinNo" type="text" size={'sm'} className={'form-control' + (errors.gstinNo && touched.gstinNo ? ' is-invalid' : '')} />  
                    <ErrorMessage name="gstinNo" component="div" className="invalid-feedback" />  
                </Col>   */}
                <Col className="form-group" md={4} sm={4} xs={4} style={txtAlign}>  
                    <label htmlFor="panNo">Pan No</label>  
                    <Field  name="panNo" type="text" size={'sm'} className={'form-control' + (errors.panNo && touched.panNo ? ' is-invalid' : '')} />  
                    <ErrorMessage name="panNo" component="div" className="invalid-feedback" />  
                </Col>  
                <Col className="form-group" md={4} sm={4} xs={4} style={txtAlign}>  
                <label htmlFor="designation">Designation</label>  
                <TextField 
            select
              id="course"
              placeholder="Select"
              value={values.course}
              onChange={handleChange("course")}
              helperText={touched.course ? errors.course : ""}
              error={touched.course && Boolean(errors.course)}
              margin="dense"
              variant="outlined"
            fullWidth
              
            >
              {courseCategory.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
              </TextField>
            </Col>
            </Row>  
            <Row>  
                <Col>  
                <button type="submit" className="btn btn-primary mr-2">Add</button>
                  <button type="get" className="btn btn-primary mr-2" onClick={this.bindUserData}>Retrive</button>  
                  <button type="modify" className="btn btn-primary mr-2"  onClick={handleSubmit}>modify</button>  
                       <button type="reset" className="btn btn-secondary">Reset</button>  
                </Col>  
               
            </Row>  
        </Form>  

        <hr/>  
       
    </Container>  
)}  
/>  
)  
}  
}  
  
export default EditEmployee;  