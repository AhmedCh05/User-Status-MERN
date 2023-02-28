import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/stylesheets/login.css";
import "../assets/stylesheets/logout.css";

import { Button, Card, Form, Row, Col, Anchor, Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


function Login() {
  const [isLoading, setIsloading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem('token') != null) {
      navigate("/allusers");
    }
  });
  const getData = (event) => {
    event.preventDefault();
    const data = { "email": event.target[0].value, "password": event.target[1].value };
    axios.post("http://localhost:3000/User/login/", data).then(function (response) {
      localStorage.setItem("token", response.data);
      toast.success("User Login Success", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
      if (localStorage.getItem('token') != null) {
        setIsloading(false);
        setTimeout(() => {
          navigate("/allusers");
        }, 4000);
      }
    }).catch(() => {
      toast.error("User Credentials Doesn't Match", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    });
  }
  if (isLoading) {
    return (
      <>
        <Container id="Loginbody">
          <Row id="loginMainmodule">
            <Col sm={8}>
              <Card id="Logincard">
                <Card.Header>
                  <Card.Title style={{ marginLeft: "5%" }} as="h1">User Login</Card.Title>
                  <p style={{ marginLeft: "5%", fontSize: "18px" }}>Please fill your Information</p>
                </Card.Header>
                <Card.Body>
                  <Form onSubmit={getData}>
                    <Row>
                      <Col>
                        <Form.Group style={{ display: "flex", flexDirection: "column" }}>
                          <label style={{ marginLeft: "8%", paddingBottom: "5px" }}>Email</label>
                          <Form.Control style={{ marginLeft: "5%", width: "600px", height: "50px", fontSize: "20px", border: "1px solid black", borderRadius: "8px" }}
                            placeholder="Email"
                            type="email"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Form.Group style={{ display: "flex", flexDirection: "column" }}>
                          <label style={{ marginLeft: "8%", paddingBottom: "5px", paddingTop: "10px" }}>Password</label>
                          <Form.Control style={{ marginLeft: "5%", width: "600px", height: "50px", fontSize: "20px", border: "1px solid black", borderRadius: "8px" }}
                            placeholder="Password"
                            type="password"
                          ></Form.Control>
                        </Form.Group>
                      </Col>
                    </Row>
                    <p id="SignFModules"><Anchor href="/forgotpassword">Forget Password</Anchor></p>
                    <div style={{ paddingTop: "20px" }}>
                      <Button
                        id="logincardButton"
                        type="Submit"
                        variant="info"
                      >
                        Login
                      </Button>
                    </div>
                  </Form>
                  <p id="SignLoginModule">Have not any account.<Anchor href="/signup">Create Now</Anchor></p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <ToastContainer />
      </>
    );
  }
  return (
    <>
      <h1 style={{ marginLeft: "45%", paddingTop: "20%" }}>Logging In</h1>
      <div style={{ marginTop: "50px" }} className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ToastContainer />
    </>

  );
}

export default Login;