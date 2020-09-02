import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import service from "../service/service";
import { Row, Col, Container, Table } from "react-bootstrap";

const courseCategory = [
  {
    value: "StoreOwner",
    label: "StoreOwner",
  },
  {
    value: "Sales",
    label: "Sales",
  },
  // {
  //   value: "Employer",
  //   label: "Employer"
  // },
  {
    value: "Manager",
    label: "Manager",
  },
];
const txtAlign = {
  textAlign: "left",
};

// fetch(backendURL,{
//   method: "POST",
//   body: JSON.stringify({email: email, password: password}),
//   headers: {
//     'Content-Type': 'application/json'
//   },
// })
// .then(response => response.json())
// .then(data => {
//     if(data.token) {
//         localStorage.setItem("token", data.token)
//         props.history.push("/")
//     }else{
//       setFieldError("authentication", "Authentication Failed!");
//       setSubmitting(false);
//     }
// });

export default class LoginForm extends React.Component {
  state = {
    userData: {},
    userList: [],
  };
 
  render() {
    return (
      <Formik
        initialValues={{
          email: "",
          password: "",
          course: "",
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email("Email is invalid")
            .required("Email is required"),
          password: Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
          course: Yup.string().required("Select your User Type"),
        })}
      
        onSubmit={async (fields) => {
          const { history } = this.props;
          console.log("Login", fields);
          sessionStorage.setItem("usertype", fields.course);
          if (fields.course === "StoreOwner") {
            const result = await service.ownerLogin({
              email: fields.email,
              password: fields.password,
            });
            console.log("resullttt", result);
            if (result.status === 200) {
              sessionStorage.setItem("token", result.token);
              history.push("/LandingPage");
            }
            else if(result.status===202 && result.status===401){
              {
                alert("Authentication failed")
                window.reload("");
                history.push("LoginForm");
              }
            }
          } else if (fields.course === "Manager") {
            console.log("Loginemployee", fields);
            sessionStorage.setItem("usertype", fields.course);

            const result = await service.employeeLogin({
              email: fields.email,
              password: fields.password,
            });
            console.log("resullttt", result);
            if (result.status === 200) {
              sessionStorage.setItem("token", result.token);
              history.push("/LandingPage");
            }
            else 
              {
                alert("Authentication failed")
                window.location.reload();
                history.push("");
              }
            
          } else if (fields.course === "Sales") {
            sessionStorage.setItem("usertype", fields.course);
            const result = await service.employeeLogin({
              email: fields.email,
              password: fields.password,
            });
            console.log("resullttt", result);
            if (result.status === 200) {
              sessionStorage.setItem("token", result.token);
              history.push("/LandingPage");
            }
            else if(result.status===202 && result.status===401){
              {
                alert("Authentication failed")
                window.location.reload();
                history.push("");
              }
            }
          }
        }}
        render={({ errors, status, touched, values, handleChange }) => (
          <Form>
            <h1 style={{ marginLeft: "401px" }}>Login</h1>

            <Col
              className="form-group"
              md={4}
              sm={4}
              xs={4}
              style={txtAlign}
              style={{ marginLeft: "319px" }}
            >
              <label htmlFor="User" style={{ marginLeft: "1px" }}>
                User
              </label>
              <TextField
                select
                id="course"
                placeholder="select"
                value={values.course}
                onChange={handleChange("course")}
                helperText={touched.course ? errors.course : ""}
                error={touched.course && Boolean(errors.course)}
                margin="dense"
                variant="outlined"
                fullWidth
              >
                {courseCategory.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Col>

            <div className="form-group">
              <Col className="form-group" md={4} sm={4} xs={4} style={txtAlign}>
                <label htmlFor="email" style={{ marginLeft: "323px" }}>
                  Email
                </label>
                <Field
                  name="email"
                  type="text"
                  style={{ marginLeft: "323px" }}
                  className={
                    "form-control" +
                    (errors.email && touched.email ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                  style={{ marginLeft: "323px" }}
                />
              </Col>
            </div>
            <div className="form-group">
              <Col className="form-group" md={4} sm={4} xs={4} style={txtAlign}>
                <label htmlFor="password" style={{ marginLeft: "323px" }}>
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  style={{ marginLeft: "323px" }}
                  className={
                    "form-control" +
                    (errors.password && touched.password ? " is-invalid" : "")
                  }
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                  style={{ marginLeft: "323px" }}
                />
              </Col>
            </div>

            <Col style={{ marginLeft: "340px" }}>
              <button type="submit" className="btn btn-primary mr-2">
                Submit
              </button>
              <button type="reset" className="btn btn-secondary">
                Reset
              </button>
            </Col>
          </Form>
        )}
      />
    );
  }
}
