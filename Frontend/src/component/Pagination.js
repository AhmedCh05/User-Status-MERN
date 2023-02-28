import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid'
import { useState } from 'react';
import { Anchor } from 'react-bootstrap'

export default function Pagination({totalPages,setCurrentPage}) {
    const [pageNo,setPageNo] = useState(1);
    setCurrentPage(pageNo);
    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="flex flex-1 justify-between sm:hidden">
                <Anchor
                    href="#"
                    className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Previous
                </Anchor>
                <Anchor
                    href="#"
                    className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                    Next
                </Anchor>
            </div>
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{pageNo}</span> of <span className="font-medium">{totalPages} Pages</span>
                    </p>
                </div>
                <div>
                    <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                        <Anchor
                            href="#"
                            className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                        >
                            <span className="sr-only">Previous</span>
                            <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" onClick={()=>{setCurrentPage(pageNo-1);setPageNo(pageNo-1);}} />
                        </Anchor>
                        {/* Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
                        <Anchor
                            href="#"
                            aria-current="page"
                            className="relative z-10 inline-flex items-center border border-indigo-500 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-600 focus:z-20"
                            onClick={()=>{setPageNo(1);setCurrentPage(1);}}
                        >
                            1
                        </Anchor>
                        <Anchor
                            href="#"
                            className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            onClick={()=>{setPageNo(2);setCurrentPage(2);}}
                        >
                            2
                        </Anchor>
                        <Anchor
                            href="#"
                            className="relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            onClick={()=>{setPageNo(3);setCurrentPage(3);}}
                        >
                            3
                        </Anchor>
                        <Anchor
                            href="#"
                            className="relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20"
                            onClick={()=>{setPageNo(3);setCurrentPage(3);}}
                        >
                            <span className="sr-only">Next</span>
                            <ChevronRightIcon className="h-5 w-5" aria-hidden="true" onClick={()=>{setCurrentPage(pageNo+1);setPageNo(pageNo+1);}} />
                        </Anchor>
                    </nav>
                </div>
            </div>
        </div>
    )
}