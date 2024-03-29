import React from "react";
import axios from "axios";
import User from "../component/Users";
import { useState, useEffect } from "react";
import { TiArrowUnsorted } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import Navbar from "../component/Navbar"
import { Anchor } from "react-bootstrap";
import SearchBar from '../component/SearchBar'
import Pagination from "../component/Pagination";
import DisplaySearchData from "./DisplaySearchData";



function AllUsers() {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const [searchResults, setSearchResults] = useState([]);
    const [searchData,setSearchData] = useState();
    const [isLoading,setisLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token') == null) {
            navigate("/login");
        }
    });
    const [response, setResponse] = useState();

    useEffect(() => {
        axios.get("http://localhost:3000/allusers", { params: { pageNo: currentPage, size: 5 } }).then((res) => {
            setResponse(res.data);
            setTotalPages(res?.data?.pages);
        }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);


    useEffect(() => {
        axios.get("http://localhost:3000/allUsers").then((res) => {
            setSearchData(res.data);
        }
        )
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
   if(isLoading){
    return (
        <>
            <Navbar />
            <SearchBar data={searchData?.message} setSearchResult={setSearchResults} setisLoading={setisLoading} />
            <div className="px-28 my-10">
                <table className="w-full text-center text-sm border-separate border-spacing-y-2">
                    <thead>
                        <tr>
                            <th className="py-2 font-medium border border-r-0">
                                Name of users
                                <Anchor className="ml-2" href="#">
                                    <TiArrowUnsorted className="inline-block text-gray-400" />
                                </Anchor>
                            </th>
                            <th className="py-2 font-medium border border-x-0">
                                Occupation
                                <Anchor className="ml-2" href="#">
                                    <TiArrowUnsorted className="inline-block text-gray-400" />
                                </Anchor>
                            </th>
                            <th className="py-2 font-medium border border-x-0">
                                Last Active
                                <Anchor className="ml-2" href="#">
                                    <TiArrowUnsorted className="inline-block text-gray-400" />
                                </Anchor>
                            </th>
                            <th className="py-2 font-medium border border-x-0">
                                Status
                                <Anchor className="ml-2" href="#">
                                    <TiArrowUnsorted className="inline-block text-gray-400" />
                                </Anchor>
                            </th>
                            <th className="py-2 font-medium border border-l-0">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <>
                            {response?.message.map((i) => {
                                return (
                                    <>
                                        <User obj={i}>

                                        </User>
                                    </>
                                )
                            })}
                        </>
                    </tbody>
                </table>
            </div>
            <Pagination {...{ totalPages, setCurrentPage }}
            />
        </>
    );
   }
   return(
    <DisplaySearchData searchData={searchResults} />
   );
}

export default AllUsers;