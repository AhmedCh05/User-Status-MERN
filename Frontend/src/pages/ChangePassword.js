import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from "yup";
import { Formik, Form, ErrorMessage} from "formik";
import { Card } from "react-bootstrap";
import Navbar from '../component/Navbar'
import TextField from "../component/Textfield";


function ChangePassword(data){
    const navigate = useNavigate();
    const token = localStorage.getItem('token');
    const config = {headers:{Authorization:`Bearer ${token}`}};

    const passwordvalidate = Yup.object({

        password: Yup.string().min(4, "Password must be minimum 4 digits!").required("Password Required!"),
        confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "Password must match!").required("Confirm password is required!"),
      });

    const SetNewPass = (data)=>{
    const newPasswords = { "password": data.password };
    axios.put("http://localhost:3000/changePassword", newPasswords,config).then(function (response) {
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
        navigate("/userprofile");
      }, 2500);
    });
  };

  return (
    <>
      <Navbar></Navbar>
      <hr style={{ opacity: "0.3" }}></hr>
      <div id="body">
        <div style={{ margin: "auto" }}>
          <Formik
            initialValues={passInitialValues}
            enableReinitialize
            validationSchema={passwordvalidate}
            onSubmit={(values) => {
              SetNewPass(values);
            }}
          >
            {(formik) => (
              <div>
                <Card className="card">
                  <Card.Header>
                    <Card.Title style={{ marginLeft: "5%" }} as="h1">Change Password</Card.Title>
                    <p style={{ marginLeft: "5%", fontSize: "18px" }}>Please enter your new password</p>
                  </Card.Header>
                  <Card.Body>
                    <Form style={{ paddingTop: "10px" }}>
                      <div style={{ paddingBottom: "15px", marginTop: "10px", marginLeft: "30%" }}>
                        <label style={{ marginLeft: "1%", padding: "5%" }}>Password</label>
                        <TextField style={{ marginLeft: "4%", paddingBottom: "5px", width: "675px", height: "40px", fontSize: "18px", border: "1px solid black", borderRadius: "8px" }}
                          type="password"
                          name="password"
                          placeholder="Greater then 4 characters"
                          {...formik.getFieldProps("password")}

                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", marginLeft: "32%" }}>
                        <label style={{ marginLeft: "1%" }}>Confirm Password</label>
                        <input style={{ marginLeft: "1%", width: "675px", height: "40px", fontSize: "18px", border: "1px solid black", borderRadius: "8px" }}
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
                        <ErrorMessage style={{ marginTop: "1%" }}
                          component="div"
                          name="confirmPassword"
                          id="UserProfileErrors"
                        />
                      </div>
                      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-around", marginTop: "3%", marginLeft: "-2%" }}>
                        <button className="UserprofilecngPass" type="submit">
                          Confirm Password
                        </button>
                        <button style={{ marginLeft: "7%", height: "20px", width: "50px", fontsize: "5px", padding: "1px", backgroundColor: "#FF0000", borderRadius: "8px" }} type="reset">
                          Reset
                        </button>
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
export default ChangePassword;


const passInitialValues = {
    password: "",
    confirmPassword: "",
  };