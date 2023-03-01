import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import '../assets/stylesheets/logout.css';


function UploadIcon() {
    const navigate = useNavigate();
    const [isLoading,setIsLoading] = useState(true);
    const [state, setState] = useState(null);

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/login");
        }
    });
    const handleFileSelect = (event) => {
        setState(event.target.files[0]);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("image", state);
        await axios.post("http://localhost:3000/userIcon", formData)
            .then((res) => {
                toast.success("File Uploaded Successfully", {
                    position: "top-right",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                setTimeout(() => {
                    setIsLoading(false);
                }, 2500);
                setTimeout(() => {
                    navigate('/userprofile')
                }, 5500);
            }).catch((error) => {
                toast.error("Not Uploaded Successfully", {
                    position: "top-right",
                    autoClose: 8000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                console.log(error.message);
            })

    }
    if (isLoading) {
        return (
            <>
                <div className="flex items-center justify-center w-full">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <form className="mb-2 text-sm text-gray-500 dark:text-gray-40" onSubmit={handleSubmit} encType="multipart/form-data">
                            <input name="upload" type="file" onChange={handleFileSelect} />
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </div>
                <ToastContainer />
            </>
        );
    }
    return (
        <>
            <h1 style={{ marginLeft: "37%", paddingTop: "20%" }}>Redirecting to User Profile Page</h1>
            <div style={{ marginTop: "50px" }} className="bouncing-loader">
                <div></div>
                <div></div>
                <div></div>
            </div>
        </>

    );
}


export default UploadIcon;