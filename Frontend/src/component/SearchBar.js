import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function SearchBar() {

    const navigate = useNavigate();
    const [response, setResponse] = useState();
    const[searchQuery,setSearchQuery] = useState();
    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/login");
        }
    });
    const SearchQuery = (event) =>{
        event.preventDefault();
        console.log(event.target[1].value);
            axios.use("http://localhost:3000?fname=" + searchQuery).then((res) => {
                setResponse(res.data);
            }
            )
    }

    return (
        <form onSubmit={SearchQuery} className="px-28 my-10">
            <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                </div>
                <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Users..." required />
                <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg aria-hidden="true" className="w-7 h-7 squared" fill="none" stroke="currentColor" viewBox="0 0 24 24" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                </button>            </div>
        </form>
    );
}

export default SearchBar;