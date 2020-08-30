import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import { Toolbar, IconButton, Button, Typography } from "@material-ui/core";

import { Row, Col, Container, button } from "react-bootstrap";
import { render } from "@testing-library/react";
import Navbar from "./Navbar";

const LandingPage = () => {
  const history = useHistory();
  const [usertype, setusertype] = useState(sessionStorage.getItem("usertype"));
  const handleClick = () => {
    history.push("/StoreOwner");
  };
  const onClick = () => {
    history.push("/SupplierDetails");
  };
  const empClick = () => {
    history.push("/EmployeeDetails");
  };
  const cusClick = () => {
    history.push("/CustomerDetails");
  };

  // useEffect(()=>{
  //     const usertype=sessionStorage.getItem('usertype')
  //     // alert(usertype)
  // },[])

  // const getItem=id=>{
  //          const field=this.state.fields.find(item=>item.id===id);
  //          console.log("hello product",field);

  //          return field;

  //     };
  const handleDetail = (id) => {
    console.log("hello product");
    const product = this.getItem(id);
    this.setState(() => {
      return { userDetail: product };
    });
  };
  const logout = () => {
    history.push("");
  };
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton edge="start" className="menubutton" color="inherit" aria-label="menu">
                <MenuIcon /> */}
          {/* </IconButton> */}
          <Typography
            variant="h4"
            style={{ marginLeft: "510px" }}
            className="title"
          >
            DashBoard
          </Typography>
          <Button
            style={{ marginLeft: "400px" }}
            color="inherit"
            onClick={logout}
          >
            Logout
          </Button>
        </Toolbar>
        <Row>
          {/* <h1>{usertype}</h1>  */}
          
             
          
          {usertype  === "Manager" && (
              <button
                type="button"
                className="btn btn-primary mr-2"
                style={{ width: "95px", backgroundColor: "#007bf",marginLeft: "543px" }}
                href="/SupplierDetails"
                onClick={onClick}
              >
                Add Supplier
              </button>)
}
          {usertype==="Manager" &&
          (
              <button
               type="button"
            className="btn btn-primary mr-2"
             style={{ width: "108px", backgroundColor: "#007bf" ,    
            }}
              href="/CustomerDetails"
              onClick={cusClick}
              >
              Add Customer
              </button>
            )
            }

            
{usertype==="Supplier" &&
          (
            <button
            type="button"
            className="btn btn-primary mr-2"
            style={{ width: "108px", backgroundColor: "#007bff" , marginLeft: "543px"
        }}
            href="/CustomerDetails"
            onClick={cusClick}
          >
            Add Customer
          </button>
            )
            }



           {
           usertype==="StoreOwner" 
&& (
          <button
            type="button"
            className="btn btn-primary mr-2"
            style={{
              marginLeft: "426px",
              width: "95px",
              background: "#007bff",
            }}
            href="/StoreOwner"
            onClick={handleClick}
          >
            Add Store
          </button>
)}

{
           usertype==="StoreOwner" 
&& (
          <button
            type="button"
            className="btn btn-primary mr-2"
            style={{ width: "95px", backgroundColor: "#007bff" }}
            href="/SupplierDetails"
            onClick={onClick}
          >
            Add Supplier
          </button>
)}
          {
           usertype==="StoreOwner" 
&& (
          <button
            type="button"
            className="btn btn-primary mr-2"
            style={{ width: "108px", backgroundColor: "#007bff" }}
            href="/EmployeeDetails"
            onClick={empClick}
          >
            Add Employee
          </button>
)}
 {
           usertype==="StoreOwner" 
&& (
          <button
            type="button"
            className="btn btn-primary mr-2"
            style={{ width: "108px", backgroundColor: "#007bff" }}
            href="/CustomerDetails"
            onClick={cusClick}
          >
            Add Customer
          </button>
)}
        </Row>
      </AppBar>

      <br></br>
      <marquee style={{ color: "White", fontSize: "3em" }}>
        Tarnea Technology Solutions
      </marquee>

      {/* <AppGrid/> */}
    </div>
  );
};

export default LandingPage;
