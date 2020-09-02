import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { Row, Col, Container } from "react-bootstrap";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.css";
import { UserValidationSchema } from "./UserValidationSchema";
import * as Yup from "yup";
import service from "../service/service";
import { Table } from "reactstrap";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, IconButton, Button, Typography } from "@material-ui/core";

import EditStore from "./EditStore";
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";

function validateMobile(value) {
  let error = "";
  const mob = /^[1-9]{1}[0-9]{9}$/;
  if (value === "") {
    error = "Required";
  } else if (!mob.test(value)) {
    error = "Invalid mobile number";
  }
  return error;
}

class StoreOwner extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: {},
      userList: [],
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        mobileNo: "",
        address: "",
        pinCode: "",
        companyName: "",
        gstinNo: "",
        panNo: "",
      },
      id: "",
      usertype: sessionStorage.getItem("usertype"),
      isEdit: false,
      edituser: {},
    };
  }
  logout = () => {
    const { history } = this.props;
    history.push("");
  };
  componentDidMount() {
    //this.bindUserData();
  }
  Back = () => {
    const { history } = this.props;
    history.push("/LandingPage");
  };

  bindUserData = async () => {
    const result = await service.getStore();

    this.setState({
      userList: result.data,
    });

    console.log("result", result);
  };
  EditProduct = (user) => {
    const updatedvalue = {
      firstName: user.name,
      lastName: user.lastname,
      email: user.email,
      password: user.password,
      confirmPassword: user.confirmPassword,
      mobileNo: user.mobileNo,
      address: user.address,
      pinCode: user.pinCode,
      panNo: user.panNo,
      companyName: user.storeName,
      gstinNo: user.gstin,
    };
    this.setState({
      initialValues: updatedvalue,
      id: user._id,
    });
    console.log("user", updatedvalue);
  };

  deleteProduct = async (id) => {
    const { userList } = this.state;
    const data = { _id: id };
    console.log("data", data);
    const result = await service.deleteStoreById(data);
    console.log("delete", result);
    alert("Successfully Deleted");
    window.location.reload();
  };

  updateUser = async (initialValues) => {
    console.log("fields", initialValues);
    const data = {
      _id: this.state.id,
      name: this.state.initialValues.firstName,
      lastName: this.state.initialValues.lastName,
      email: this.state.initialValues.email,
      password: this.state.initialValues.password,
      confirmPassword: this.state.initialValues.confirmPassword,
      address: this.state.initialValues.address,
      pinCode: this.state.initialValues.pinCode,
      mobileNo: this.state.initialValues.mobileNo,
      storeName: this.state.initialValues.companyName,
      gstin: this.state.initialValues.gstinNo,
      panNo: this.state.initialValues.panNo,
    };

    console.log("data", data);
    const result = await service.updateStoreById(data);
  };

  render() {
    const txtAlign = {
      textAlign: "left",
    };

    const colStyle = {
      backgroundColor: "#002b48",
      color: "#ffffff",
      width: "60px",
    };
    return (
      <Formik
        enableReinitialize
        //   validationSchema={ValidationSchema}
        initialValues={this.state.initialValues}
        validationSchema={Yup.object().shape({
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          firstName: Yup.string().required("First Name is required"),
          lastName: Yup.string().required("Last Name is required"),
          companyName: Yup.string().required("Company Name is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          confirmPassword: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords must match")
            .required("Confirm Password is required"),
          mobileNo: Yup.string().required("Mobile Numer is required"),
          address: Yup.string().required("Address is required"),
          pinCode: Yup.string()
            .min(6, "Pincode must be at 6 digits")
            .max(6, "Pincode must be at 6 digits")
            .required("Pin Code is required"),
          panNo: Yup.string()
            .required("PanNo. is required")
            .trim()
            .matches(/[A-Z]{5}[0-9]{4}[A-Z]{1}/, "Is not in correct format"),
          gstinNo: Yup.string()
            .required("GstinNo. is required")
            .trim()
            .matches(
              /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
              "Is not in correct format"
            ),
        })}
        onSubmit={async (fields) => {
          const { history } = this.props;
          console.log("store", fields);
          const data = {
            name: fields.firstName,
            lastName: fields.lastName,
            email: fields.email,
            password: fields.password,
            confirmPassword: fields.confirmPassword,
            address: fields.address,
            pinCode: fields.pinCode,
            mobileNo: fields.mobileNo,
            storeName: fields.companyName,
            gstin: fields.gstinNo,
            panNo: fields.panNo,
          };
          console.log("data", data);
          const result = await service.addStore(data);
          if(result.status==200){
            alert("Successfully Addeded");
         window.location.reload();
         }
         else{
           alert("Not Successfully added");
           window.location.reload();

         }
       
            }}
        render={({
          errors,
          status,
          touched,
          values,
          handleSubmit,
          handleChange,
        }) => (
          <Container>
            <AppBar position="fixed" width="100%" height="60px">
              <Toolbar>
                <Typography
                  variant="h6"
                  style={{ marginLeft: "510px" }}
                  className="title"
                >
                  Store Details
                </Typography>
                <Button
                  type="reset"
                  style={{ marginLeft: "-606px" }}
                  className="btn btn-secondary"
                  onClick={this.Back}
                >
                  Back
                </Button>
                <Button
                  style={{ marginLeft: "980px" }}
                  color="inherit"
                  onClick={this.logout}
                >
                  Logout
                </Button>
              </Toolbar>
              <Row></Row>
            </AppBar>
            {this.state.isEdit ? (
              <EditStore edituser={this.state.edituser} />
            ) : (
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <h2 style={{ color: "white" }}>Store Details</h2>
                    <hr />
                  </Col>
                </Row>
                <Row>
                  <Col
                    className="form-group"
                    md={4}
                    sm={4}
                    xs={4}
                    style={txtAlign}
                  >
                    <label htmlFor="firstName">First Name</label>
                    <Field
                      name="firstName"
                      type="text"
                      className={
                        "form-control" +
                        (errors.firstName && touched.firstName
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="firstName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col
                    className="form-group"
                    md={4}
                    sm={4}
                    xs={4}
                    style={txtAlign}
                  >
                    <label htmlFor="lastName">Last Name</label>
                    <Field
                      name="lastName"
                      type="text"
                      className={
                        "form-control" +
                        (errors.lastName && touched.lastName
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="lastName"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col
                    md={4}
                    className="form-group"
                    sm={4}
                    xs={4}
                    style={txtAlign}
                  >
                    <label htmlFor="email">Email </label>
                    <Field
                      name="email"
                      type="text"
                      className={
                        "form-control" +
                        (errors.email && touched.email ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col
                    className="form-group"
                    md={4}
                    sm={4}
                    xs={4}
                    style={txtAlign}
                  >
                    <label htmlFor="password">Password</label>
                    <Field
                      name="password"
                      type="password"
                      className={
                        "form-control" +
                        (errors.password && touched.password
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col
                    className="form-group"
                    md={4}
                    sm={4}
                    xs={4}
                    style={txtAlign}
                  >
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <Field
                      name="confirmPassword"
                      type="password"
                      className={
                        "form-control" +
                        (errors.confirmPassword && touched.confirmPassword
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="confirmPassword"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col
                    className="form-group"
                    md={4}
                    sm={4}
                    xs={4}
                    style={txtAlign}
                  >
                    <label htmlFor="address">Address</label>
                    <Field
                      name="address"
                      type="text"
                      className={
                        "form-control" +
                        (errors.address && touched.address ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={8} sm={8} xs={8}>
                    <Row>
                      <Col
                        className="form-group"
                        md={6}
                        sm={6}
                        xs={6}
                        style={txtAlign}
                      >
                        <label htmlFor="pinCode">Pin Code</label>
                        <Field
                          name="pinCode"
                          type="text"
                          className={
                            "form-control" +
                            (errors.pinCode && touched.pinCode
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="pinCode"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>
                      <Col
                        className="form-group"
                        md={6}
                        sm={6}
                        xs={6}
                        style={txtAlign}
                      >
                        <label htmlFor="companyName">Store Name</label>
                        <Field
                          name="companyName"
                          type="text"
                          className={
                            "form-control" +
                            (errors.companyName && touched.companyName
                              ? " is-invalid"
                              : "")
                          }
                        />
                        <ErrorMessage
                          name="companyName"
                          component="div"
                          className="invalid-feedback"
                        />
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    className="form-group"
                    md={4}
                    sm={4}
                    xs={4}
                    style={txtAlign}
                  >
                    <label htmlFor="mobileNo">Mobile No</label>
                    <Field
                      validate={validateMobile}
                      name="mobileNo"
                      type="text"
                      size={"sm"}
                      className={
                        "form-control" +
                        (errors.mobileNo && touched.mobileNo
                          ? " is-invalid"
                          : "")
                      }
                    />
                    <ErrorMessage
                      name="mobileNo"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col
                    className="form-group"
                    md={4}
                    sm={4}
                    xs={4}
                    style={txtAlign}
                  >
                    <label htmlFor="gstinNo">Gstin No</label>
                    <Field
                      name="gstinNo"
                      type="text"
                      size={"sm"}
                      className={
                        "form-control" +
                        (errors.gstinNo && touched.gstinNo ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="gstinNo"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                  <Col
                    className="form-group"
                    md={4}
                    sm={4}
                    xs={4}
                    style={txtAlign}
                  >
                    <label htmlFor="panNo">Pan No</label>
                    <Field
                      name="panNo"
                      type="text"
                      size={"sm"}
                      className={
                        "form-control" +
                        (errors.panNo && touched.panNo ? " is-invalid" : "")
                      }
                    />
                    <ErrorMessage
                      name="panNo"
                      component="div"
                      className="invalid-feedback"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <button type="submit" className="btn btn-primary mr-2">
                      Add
                    </button>
                    <button
                      type="get"
                      className="btn btn-primary mr-2"
                      onClick={this.bindUserData}
                    >
                      Retrive
                    </button>
                    <button
                      type="modify"
                      className="btn btn-primary mr-2"
                      onClick={this.updateUser}
                    >
                      modify
                    </button>
                    <button type="reset" className="btn btn-secondary">
                      Reset
                    </button>
                  </Col>
                </Row>
              </Form>
            )}
            <hr />
            <Row>
              <Col>
                <Table className="Table" striped bordered hover size="sm">
                  <thead style={colStyle}>
                    <tr>
                      <th>Sr.No</th>
                      <th>ID</th>
                      <th>First Name</th>
                      <th>Last Name</th>
                      <th>Email</th>
                      <th>password</th>
                      {/* <th>confirmpassword</th> */}
                      <th>StoreName</th>
                      <th>Gstin</th>
                      <th>PanNo</th>
                      <th>Mobile No</th>
                      <th>Address</th>
                      <th>Pin Code</th>

                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "white" }}>
                    {this.state.userList.map((user, i) => (
                      <tr key={user._id}>
                        <td>{i + 1}</td>
                        <td>{user._id}</td>
                        <td>{user.name}</td>
                        <td>{user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>
                        {/* <td>{user.confirmPassword}</td> */}
                        <td>{user.storeName}</td>
                        <td>{user.gstin}</td>
                        <td>{user.panNo}</td>
                        <td>{user.mobileNo}</td>
                        <td>{user.address}</td>
                        <td>{user.pinCode}</td>
                        <td>
                          <tr>
                            <button
                              type="delete"
                              style={{ display: "flex:0 0 1" }}
                              className="btn btn-danger"
                              onClick={() => {
                                if (
                                  window.confirm(
                                    "Are you sure you wish to delete this item?"
                                  )
                                )
                                  this.deleteProduct(user._id);
                              }}
                            >
                              Delete
                            </button>
                            <button
                              variant="info"
                              style={{
                                marginLeft: "86px",
                                marginTop: "-111px",
                              }}
                              className="btn btn-success"
                              onClick={() => {
                                this.setState({ isEdit: true });
                                this.setState({ edituser: user });
                              }}
                            >
                              Edit
                            </button>
                          </tr>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Container>
        )}
      />
    );
  }
}

export default StoreOwner;
