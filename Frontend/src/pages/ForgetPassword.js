import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import TextField from "../component/Textfield";
import * as Yup from "yup";
import "../assets/stylesheets/forgetPass.css"
import { Card, Anchor } from "react-bootstrap"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function ForgetPassword() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [email,setEmail] = useState();
    const emailvalidate = Yup.object({

        email: Yup.string().email("email is invalid!").required("Email Required!"),
    });

    const passwordvalidate = Yup.object({

        password: Yup.string().min(4, "Password must be minimum 4 digits!").required("Password Required!"),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Password must match!").required("Confirm password is required!"),
    });
    
    const verifyEmail = async(data) => {
        const email = { "email": data.email};
        await axios.post("http://localhost:3000/verifyEmail", email)
            .then(function (response) {
                setEmail(data.email);
                setTimeout(() => {
                    setIsLoading(false);
                }, 1000);
                toast.success("Email Verification Successful", {
                    position: "top-right",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
    }

    const changePassword = (data) => {
        const newPasswords = { "password": data.password,"email":email};
        axios.put("http://localhost:3000/forgetPassword", newPasswords)
            .then(function (response) {
                toast.success("Password Changed Successfully", {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => {
                    navigate("/login");
                }, 5000);
            })
    }
    if (isLoading) {

        return (
            <div id="ForgetPassbody">
                <div style={{ margin: "auto" }}>
                    <Formik
                        initialValues={initialValues}
                        enableReinitialize
                        validationSchema={emailvalidate}
                        onSubmit={(values) => {
                            console.log(values)
                            verifyEmail(values);
                        }}
                    >
                        {(formik) => (
                            <div id="ForgetPassMain">
                                <Card id="ForgetPasscard">
                                    <Card.Header>
                                        <Card.Title style={{ marginLeft: "5%" }} as="h1">Email verification</Card.Title>
                                        <p style={{ marginLeft: "5%", fontSize: "18px" }}>Please enter your Email</p>
                                    </Card.Header>
                                    <Card.Body>
                                        <Form style={{ paddingTop: "10px" }}>
                                            
                                            <div style={{ paddingBottom: "15px", marginTop: "10px" }}>
                                                <label style={{ marginLeft: "2%", padding: "5%" }}>Email</label>
                                                <TextField style={{ marginLeft: "4%", paddingBottom: "5px", width: "675px", height: "40px", fontSize: "18px", border: "1px solid black", borderRadius: "8px" }}
                                                    type="email"
                                                    name="email"
                                                    placeholder="Must be unique"
                                                />
                                            </div>
                                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "3%", marginLeft: "-2%" }}>
                                                <button id="ForgetPassBtn" type="submit">
                                                    Verify Email
                                                </button>
                                                <button style={{ marginLeft: "7%", height: "20px", width: "50px", fontsize: "5px", padding: "1px", backgroundColor: "#FF0000", borderRadius: "8px" }} type="reset">
                                                    Reset
                                                </button>
                                            </div>
                                        </Form>
                                        <p id="ForgetPassSign">Back To <Anchor href="http://localhost:3001/login">Login</Anchor></p>
                                    </Card.Body>
                                </Card>

                            </div>
                        )}
                    </Formik>
                    <ToastContainer />
                </div>
            </div>
        );
    }

return (
    <div id="ForgetPassbody">
        <div style={{ margin: "auto" }}>
            <Formik
                initialValues={passInitialValues}
                enableReinitialize
                validationSchema={passwordvalidate}
                onSubmit={(values) => {
                    changePassword(values);
                }}
            >
                {(formik) => (
                    <div id="ForgetPassMain">
                        <Card id="ForgetPasscard">
                            <Card.Header>
                                <Card.Title style={{ marginLeft: "5%" }} as="h1">Change Password</Card.Title>
                                <p style={{ marginLeft: "5%", fontSize: "18px" }}>Please enter your new password</p>
                            </Card.Header>
                            <Card.Body>
                                <Form style={{ paddingTop: "10px" }}>
                                    <div style={{ paddingBottom: "15px", marginTop: "10px" }}>
                                        <label style={{ marginLeft: "1.5%", padding: "5%" }}>Password</label>
                                        <TextField style={{ marginLeft: "4%", paddingBottom: "5px", width: "675px", height: "40px", fontSize: "18px", border: "1px solid black", borderRadius: "8px" }}
                                            type="password"
                                            name="password"
                                            placeholder="Greater then 4 characters"
                                        />
                                    </div>
                                    <div style={{ paddingBottom: "15px", marginTop: "10px" }}>
                                        <label style={{ marginLeft: "1.5%", padding: "5%" }} htmlFor="confirmPassword">Confirm Password</label>
                                        <input style={{ marginLeft: "4%", paddingBottom: "5px", width: "675px", height: "40px", fontSize: "18px", border: "1px solid black", borderRadius: "8px" }}
                                            id="confirmPassword"
                                            className={`form-control shadow-none ${formik.touched.confirmPassword &&
                                                formik.errors.confirmPassword &&
                                                "is-invalid"
                                                }`}
                                            type="password"
                                            name="confirmPassword"
                                            placeholder="Confirm password..."
                                            {...formik.getFieldProps("confirmPassword")}
                                        />
                                        <ErrorMessage
                                            component="div"
                                            name="confirmPassword"
                                            class="ForgetPasserror"
                                        />
                                    </div>
                                    <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "3%", marginLeft: "-2%" }}>
                                        <button id="ForgetPassBtn" type="submit">
                                            Confirm Password
                                        </button>
                                        <button style={{ marginLeft: "7%", height: "20px", width: "50px", fontsize: "5px", padding: "1px", backgroundColor: "#FF0000", borderRadius: "8px" }} type="reset">
                                            Reset
                                        </button>
                                    </div>
                                </Form>
                                <p id="ForgetPassSign">Back To <Anchor href="http://localhost:3001/login">Login</Anchor></p>
                            </Card.Body>
                        </Card>

                    </div>
                )}
            </Formik>
            <ToastContainer />
        </div>
    </div>
);
}

const initialValues = {
    email: "",
};
const passInitialValues = {
    password:"",
    confirmPassword:"",
};
