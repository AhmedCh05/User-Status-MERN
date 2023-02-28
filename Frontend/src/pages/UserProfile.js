import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import TextField from "../component/Textfield";
import * as Yup from "yup";
import "../assets/stylesheets/userspage.css";
import { Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Navbar from '../component/Navbar'
import "../assets/stylesheets/logout.css"


export default function UserProfile() {
  const [response, setResponse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const config = { headers: { Authorization: `Bearer ${token}` } };
  useEffect(() => {
    if (localStorage.getItem("token") == null) {
      navigate("/login")
    }
  }, []);

  useEffect(() => {
    axios.get("http://localhost:3000/CurrentUser", config).then(function (res) {
      setResponse(res.data);
      setTimeout(() => {
        setIsLoading(false);
      }, 2500);
      toast.success("Data Retrieved Successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    })
  }, [])

  const validate = Yup.object({
    fname: Yup.string().required("first name required!"),
    lname: Yup.string().required("last name"),
    email: Yup.string().email("email is invalid!").required("Email Required!"),
    DOB: Yup.date()
      .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
      .required("DOB Required"),
    Bio: Yup.string()
      .min(20, "Must be more than 20 Words")
      .max(250, "Should be less than 250 words")
      .required("Bio Required"),
  });

  if (isLoading) {
    return (
      <>
      <h1 style={{ marginLeft: "45%", paddingTop: "20%" }}>Fetching Data</h1>
      <div style={{ marginTop: "50px" }} className="bouncing-loader">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <ToastContainer />
    </>
    )
  }

  return (
    <>
      <Navbar></Navbar>
      <hr style={{ opacity: "0.3" }}></hr>
      <div>
        <div>
          <Formik
            initialValues={initialValues}
            enableReinitialize
          >
            {(formik) => (
              <div>
                <Card id="UserCard">
                  <Card.Header>
                    <Card.Title style={{ marginLeft: "5%" }} as="h1">
                      User Details
                    </Card.Title>
                  </Card.Header>
                  <Card.Body>
                    <Form>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "right",
                        }}
                      >
                        <button id="UserProfileCngPassword" onClick={() => { setIsLoading(false); navigate("/user/changepassword") }}>
                          Change Password
                        </button>
                        <button className="bedit" onClick={() => { navigate("/updateuser") }}>
                          Edit
                        </button>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          marginLeft: "-15%",
                        }}
                      >
                        <label
                          style={{ marginLeft: "-15%", paddingBottom: "5px" }}
                        >
                          First Name
                        </label>
                        <label style={{ marginLeft: "6%", paddingBottom: "5px" }}>
                          Last Name
                        </label>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          paddingBottom: "2%",
                        }}
                      >
                        <TextField
                          style={{
                            paddingBottom: "5px",
                            width: "700px",
                            height: "45px",
                            fontSize: "18px",
                            border: "1px solid black",
                            borderRadius: "8px",
                          }}
                          value={response.fname}
                          type="text"
                          name="fname"
                          placeholder="Must be alphabetical"
                        />
                        <TextField
                          style={{
                            paddingBottom: "5px",
                            width: "700px",
                            height: "45px",
                            fontSize: "18px",
                            border: "1px solid black",
                            borderRadius: "8px",
                          }}
                          value={response.lname}
                          type="text"
                          name="lname"
                          placeholder="Must be alphabetical"
                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          marginLeft: "-15%",
                        }}
                      >
                        <label
                          style={{ marginLeft: "-15%", paddingBottom: "5px" }}
                        >
                          Email
                        </label>
                        <label style={{ marginLeft: "8%", paddingBottom: "5px" }}>
                          Date of Birth
                        </label>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          marginLeft: "-0.4%",
                          paddingBottom: "2%",
                        }}
                      >
                        <TextField
                          style={{
                            width: "700px",
                            height: "45px",
                            fontSize: "18px",
                            border: "1px solid black",
                            borderRadius: "8px",
                          }}
                          value={response.email}
                          type="email"
                          name="email"
                          placeholder="Must be unique"
                        />
                        <TextField
                          style={{
                            width: "700px",
                            height: "45px",
                            fontSize: "18px",
                            border: "1px solid black",
                            borderRadius: "8px",
                            marginLeft: "0.5%",
                          }}
                          value={response.DOB.toString()}
                          type="date"
                          name="DOB"

                        />
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "left",
                          marginLeft: "6%",
                          fontSize: "17px",
                        }}
                      >
                        <label style={{ paddingBottom: "5px" }}>Occupation</label>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          marginLeft: "-15.5%",
                          paddingBottom: "2%",
                        }}
                      >
                        <Field
                          name="Occupation"
                          style={{
                            paddingBottom: "5px",
                            width: "700px",
                            backgroundColor: "white",
                            height: "45px",
                            fontSize: "18px",
                            border: "1px solid black",
                            borderRadius: "8px",
                          }}
                          as="select"
                          value={response.Occupation}
                        >
                          <option value="none">None</option>
                          <option value="Job">Job</option>
                          <option value="Business">Business</option>
                        </Field>
                        <div style={{ marginLeft: "-15%", paddingTop: "10px" }}>
                          <label
                            style={{ paddingBottom: "5px", marginLeft: "-45%" }}
                          >
                            Gender :
                          </label>
                          <Field
                            checked={response.Gender === 'Male'}
                            style={{ marginLeft: "15%" }}
                            type="radio"
                            name="Gender"
                          />
                          <label style={{ marginLeft: "5%" }}>
                            Male
                          </label>
                          <Field
                            style={{ marginLeft: "15%" }}
                            type="radio"
                            name="Gender"
                            checked={response.Gender === 'Female'}
                          />
                          <label style={{ marginLeft: "5%" }}>
                            Female
                          </label>
                        </div>
                      </div>
                      <div style={{ paddingBottom: "15px", marginTop: "10px" }}>
                        <label
                          style={{
                            marginLeft: "1.5%",
                            padding: "5%",
                            paddingBottom: "8px",
                            fontSize: "17px",
                          }}
                        >
                          Bio
                        </label>
                        <TextField
                          value={response.Bio}
                          style={{
                            marginLeft: "5.5%",
                            paddingBottom: "5px",
                            width: "1640px",
                            height: "90px",
                            fontSize: "18px",
                            border: "1px solid black",
                            borderRadius: "8px",
                          }}
                          type="textarea"
                          name="Bio"
                          placeholder="Write about yourself"
                        />
                      </div>
                    </Form>
                  </Card.Body>
                </Card>
              </div>
            )}
          </Formik>
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

const initialValues = {
  fname: "",
  lname: "",
  email: "",
  DOB: "",
  Gender: "",
  Occupation: "",
  Bio: "",
};
