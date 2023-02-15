
import { Pagination } from "flowbite-react";
import React from "react";

interface propsType {
    column?: any[];
    children?: React.ReactNode;
    currentPage?: number;
    setCurrentPage?: any;
    dataLimit?: number;
    totalData?: number;
}

/**
 * @param column - Array -- List of table column
 * @param children - React.ReactNode -- Rendering table data
 * @param currentPage - Number -- Current Page Number
 * @param dataLimit - Number -- How much data want to show
 * @param data - Array -- Total Collections of data list
 * @param onPageChange - pagination page Change function
 * @returns Table Component
 */
export default function Table({ column, children, currentPage = 1, setCurrentPage, dataLimit = 10, totalData }: propsType) {

    let totalPages = 1;

    if (typeof totalData !== 'undefined' && totalData > 0) {
        const countPage = (totalData / dataLimit);
        totalPages = Math.ceil(countPage);
    }

    return (
        <div className="relative overflow-x-auto w-full shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 table-fixed min-w-full divide-y divide-gray-200">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700">
                    <tr className=''>
                        {
                            column && column.length > 0 && column.map((data, index) => (
                                <th scope="col" className="px-2 py-3 min-w-[200px]" key={index + 1}>
                                    {data.title}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        children
                    }
                </tbody>
            </table>
            <div className="text-center py-3">
                <Pagination
                    currentPage={currentPage}
                    layout="pagination"
                    showIcons={true}
                    totalPages={totalPages}
                    previousLabel="Previous"
                    nextLabel="Next"
                    onPageChange={(value) => setCurrentPage(value)}
                    className="custom-pagination"
                />
            </div>
        </div>
    )
}