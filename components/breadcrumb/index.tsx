
import React from "react";
import { useRouter } from 'next/router'

/**
 * Custom Breadcrumb
 * @returns Breadcrumb
 */
export default function Breadcrumb() {

    const router    = useRouter();
    const path      = router.pathname; // To Get Current Path From URL
    const arrayList = path.split("/");
    arrayList.shift();
    const lastIndexOfArray = arrayList.length - 1;

    return (
        <nav className="flex mb-5" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2">
                <li className="inline-flex items-center">
                    <a href="#" className="text-gray-700 hover:text-gray-900 inline-flex items-center">
                        <svg className="w-5 h-5 mr-2.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>
                        Home
                    </a>
                </li>
                {
                    arrayList.length > 0 && arrayList.length > 1 ? (
                        arrayList.map((item, index) => (
                            <li key={index + 1}>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                    <a href="#" className={`ml-1 md:ml-2 text-sm font-medium capitalize ${lastIndexOfArray === index ? 'text-gray-400' : 'text-gray-700 hover:text-gray-900'}`}>{item}</a>
                                </div>
                            </li>
                        ))
                    ) : arrayList.map((item, index) => (
                        <>
                            <li key={index + 10000}>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                    <a href="#" className={`ml-1 md:ml-2 text-sm font-medium capitalize text-gray-700 hover:text-gray-900`}>{item}</a>
                                </div>
                            </li>
                            <li key={index + 20000}>
                                <div className="flex items-center">
                                    <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                                    <a href="#" className={`ml-1 md:ml-2 text-sm font-medium capitalize text-gray-400`}>All {item}</a>
                                </div>
                            </li>
                        </>

                    ))
                }
            </ol> 
        </nav>
    )
}