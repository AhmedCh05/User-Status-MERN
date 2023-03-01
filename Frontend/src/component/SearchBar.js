import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom";

function SearchBar({data,setSearchResult,setisLoading}) {
    const navigate = useNavigate();
    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/login");
        }
    });
    const handleChange = (event) => {
        if (!event.target.value){
            return setSearchResult(JSON.stringify("NO RECORD FOUND"))
        }
        const result = data.filter(user=>user.fname.includes(event.target.value) || user.lname.includes(event.target.value))
        setSearchResult(result);
    }
    const SearchQuery = (event) => {
        event.preventDefault();
        setisLoading(false);
    }

   

    return (
        <form onSubmit={SearchQuery} className="px-28 my-10">
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" />
                <input type="search" id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Users..." required onChange={handleChange} />
                <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg aria-hidden="true" className="w-7 h-7 squared" fill="none" stroke="currentColor" viewBox="0 0 24 24" ><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                    <span className="sr-only">Search</span>
                </button>
            </div>
        </form>
    );
}

export default SearchBar;