import React, { useEffect, useState } from "react"
import logo from '../assets/images/meta.png'
import axios from "axios";
import { Anchor } from "react-bootstrap";
import { faUser, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Navbar() {
    const [response, setResponse] = useState();
    const token = localStorage.getItem('token');
    const config = { headers: { Authorization: `Bearer ${token}` } };

    useEffect(() => {
        axios.get("http://localhost:3000/ActiveUser", config).then((res) => {
            setResponse(res.data);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <nav className="bg-white-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button" className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img className="block h-8 w-auto lg:hidden" src={logo} alt="Logo"></img>
                            <img className="hidden h-8 w-auto lg:block" src={logo} alt="Logo"></img>
                        </div>
                        <div className="hidden sm:ml-14 sm:block">
                            <div className="flex space-x-5">
                                <Anchor href="/allusers" className="bg-green-500 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Home</Anchor>
                                <Anchor href="#" className="bg-green-500 text-white px-3 py-2 rounded-md text-sm font-medium" aria-current="page">Message</Anchor>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                            <div>
                                <button type="button" className="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="true" aria-haspopup="false">
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-10 w-10 rounded-full" src={response} alt=""></img>
                                </button>
                            </div>


                            <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-yellow ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
                                <Anchor href="/userprofile" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-0"><FontAwesomeIcon title="Show User Details" style={{ fontSize: "15px", paddingRight: "5px" }} icon={faUser} />Edit Profile</Anchor>
                                <Anchor href="/logout" className="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabIndex="-1" id="user-menu-item-2"><FontAwesomeIcon title="Show User Details" style={{ fontSize: "15px", paddingRight: "5px" }} icon={faPowerOff} />Log out</Anchor>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;