import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import '../assets/stylesheets/logout.css';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function Logout() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };
    useEffect(() => {
        axios.get("http://localhost:3000/User/Logout", config).then(function (res) {
            toast.success("Logged out Successfully", {
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
                setIsLoading(false);
                navigate("/login")
            }, 1500);
            localStorage.removeItem("token");

        });
    });
    if (isLoading) {
        return (
            <>
                <h1 style={{ marginLeft: "45%", paddingTop: "20%" }}>Logging out</h1>
                <div style={{ marginTop: "50px" }} className="bouncing-loader">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
                <ToastContainer />
            </>

        );
    }
}
export default Logout;