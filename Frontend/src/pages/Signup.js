import React from "react";
import { Formik, Form, ErrorMessage,Field} from "formik";
import TextField from "../component/Textfield";
import * as Yup from "yup";
import "../assets/stylesheets/signup.css"
import {Card,Anchor} from "react-bootstrap"
import axios from "axios";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const validate = Yup.object({
    fname: Yup.string().required("first name required!"),
    lname: Yup.string().required("last name required"),
    email: Yup.string().email("email is invalid!").required("Email Required!"),
    DOB: Yup.date().max(new Date(Date.now() - 567648000000), "You must be at least 18 years").required("DOB Required"),
    password: Yup.string().min(4, "Password must be minimum 4 digits!").required("Password Required!"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Password must match!").required("Confirm password is required!"),
    Bio:Yup.string().min(20,"Must be more than 20 Words").max(250,"Should be less than 250 words").required("Bio Required")

  });
  const createAccount = (data)=>{
    const userdata = {"fname" : data.fname,"lname":data.lname,"email":data.email,"password":data.password,"DOB":data.DOB,"Gender":data.Gender,"Occupation":data.Occupation,"Bio":data.Bio};
    axios.post("http://localhost:3000/Signup", userdata)
    .then(function (response) {
      toast.success("User Account Created",{position: "top-right",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",});
      setTimeout(() => {
       navigate("/login")
      }, 3000);
    })
  }

  return (
    <div id = "SignUpbody">
      <div style={{margin:"auto"}}>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validate}
        onSubmit={(values) => {
          createAccount(values);
        }}
      >
        {(formik) => (
          <div id="SignUpMain">
             <Card id="SignUpCard">
              <Card.Header>
                <Card.Title style={{ marginLeft: "5%" }} as="h1">Sign Up</Card.Title>
                <p style={{ marginLeft: "5%", fontSize: "18px" }}>Please fill your Information</p>
              </Card.Header>
              <Card.Body>
            <Form style={{paddingTop:"10px"}}>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",marginLeft:"-25%"}}>
            <label style={{ marginLeft:"-1%",paddingBottom: "5px" }}>First Name</label>
            <label style={{ marginLeft:"5%",paddingBottom: "5px" }}>Last Name</label>
            </div>
            <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around"}}>
            <TextField style={{ paddingBottom: "5px", width: "300px", height: "45px", fontSize: "18px", border: "1px solid black", borderRadius: "8px"}}
                type="text"
                name="fname"
                placeholder="Must be alphabetical"
              />
              <TextField style={{paddingBottom: "5px", width: "300px", height: "45px", fontSize: "18px", border: "1px solid black", borderRadius: "8px"}}
                type="text"
                name="lname"
                placeholder="Must be alphabetical"
              />
              </div>
              <div style={{ paddingBottom: "15px",marginTop:"10px"}}>
              <label style={{ marginLeft: "2%",padding:"5%"}}>Email</label>
              <TextField style={{ marginLeft: "4%", paddingBottom: "5px", width: "675px", height: "40px", fontSize: "18px", border: "1px solid black", borderRadius: "8px"}}
                type="email"
                name="email"
                placeholder="Must be unique"
              />
              </div>
              <div style={{ paddingBottom: "15px",marginTop:"10px"}}>
              <label style={{ marginLeft: "1.5%", padding: "5%" }}>Password</label>
              <TextField style={{ marginLeft: "4%", paddingBottom: "5px", width: "675px", height: "40px", fontSize: "18px", border: "1px solid black", borderRadius: "8px"}}
                type="password"
                name="password"
                placeholder="Greater then 4 characters"
              />
              </div>
              <div style={{ paddingBottom: "15px",marginTop:"10px"}}>
                <label style={{ marginLeft: "1.5%", padding: "5%" }}>Confirm Password</label>
                <input style={{ marginLeft: "4%", paddingBottom: "5px", width: "675px", height: "40px", fontSize: "18px", border: "1px solid black", borderRadius: "8px"}}
                  id="confirmPassword"
                  className={`form-control shadow-none ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword &&
                    "is-invalid"
                  }`}
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm password..."
                  {...formik.getFieldProps("confirmPassword")}
                />
                <ErrorMessage
                  id="SignUpErr"
                  component="div"
                  name="confirmPassword"
                  
                />
              </div>
              <div style={{display:"flex",flexDirection:"row",justifyContent:"space-evenly",marginLeft:"-25%"}}>
              <label style={{ marginLeft: "-1%", paddingBottom: "5px" }}>Date of Birth</label>
              <label style={{ marginLeft: "5%", paddingBottom: "5px" }}>Occupation</label>
              </div>
              <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",marginLeft:"0%"}}>
              <TextField style={{paddingBottom: "5px", width: "300px", height: "40px", fontSize: "18px", border: "1px solid black", borderRadius: "8px"}}
                type="date"
                name="DOB"
              />
               <Field name="Occupation" style={{ marginLeft: "4%",backgroundColor:"white", paddingBottom: "5px", width: "300px", height: "40px", fontSize: "18px", border: "1px solid black", borderRadius: "8px"}}
                as="select">
                <option value="none">None</option>
                <option value="Job">Job</option>
                <option value="Business">Business</option>
                </Field>
              </div>
              <div style={{ paddingBottom: "15px",marginTop:"10px"}}>
              <label style={{ marginLeft: "1.5%", padding: "5%" }}>Bio</label>
              <TextField style={{ marginLeft: "4%", paddingBottom: "5px", width: "675px", height: "90px", fontSize: "18px", border: "1px solid black", borderRadius: "8px"}}
                type="textarea"
                name="Bio"
                placeholder="Write about yourself"
              />
              </div>
              <div>
                <label style={{ marginLeft: "1.5%", padding: "5%" }}>Gender :</label>
                <Field type="radio" name="Gender" value="Male"/>
                <label>Male</label>
                <Field type="radio" name="Gender" value="Female"/>
                <label>Female</label>
              </div>
              <div style={{display:"flex",flexDirection:"row",justifyContent:"space-around",marginTop:"3%",marginLeft:"-17%"}}>
              <button id ="CreateAccountBtn" type="submit">
                Sign Up
              </button>
              <button style={{marginLeft:"7%",height:"20px",width:"50px",fontsize:"5px",padding:"1px",backgroundColor:"#FF0000",borderRadius:"8px"}} type="reset">
                Reset
              </button>
              </div>
            </Form>
            <p id="ModeuleSignUpPage">Already have an account? .<Anchor href="/login">Login</Anchor></p>
            </Card.Body>
            </Card>

          </div>
        )}
      </Formik>
      <ToastContainer/>
      </div>
    </div>
  );
}

const initialValues = {
  fname: "",
  lname: "",
  email: "",
  password: "",
  DOB: "",
  Gender:"",
  confirmPassword: "",
  Occupation:"",
  Bio:""
};
