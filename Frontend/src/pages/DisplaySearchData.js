import React from "react";
import User from "../component/Users";
import { TiArrowUnsorted } from "react-icons/ti";
import Navbar from "../component/Navbar"
import { Anchor } from "react-bootstrap";

function DisplaysearchData({searchData}){
    return (
        <>
            <Navbar />
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
                    <tbody key={searchData}>
                        <>
                            {searchData?.map((i) => {
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
        </>
    );
}

export default DisplaysearchData;