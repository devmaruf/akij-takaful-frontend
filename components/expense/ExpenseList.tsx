import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import Modal from '@/components/modal';
import Table from '@/components/table';
import { getExpensesList, getExpenseDetails, deleteExpense } from '@/redux/actions/expense-action';
import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContentList } from '@/components/layouts/PageContentList';
import { formatCurrency } from '@/utils/currency';
import { Dropdown } from 'flowbite-react';
import { useRouter } from 'next/router';
import ExpenseStatus from './ExpenseStatus';

export default function ExpenseList() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [expenseID, setExpenseID] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>('');

    const { expensesList, paginationData, expenseDetails, isLoading, loadingDetails, isDeleting } = useSelector((state: RootState) => state.expense);

    useEffect(() => {
        dispatch(getExpensesList(currentPage, dataLimit, searchText))
    }, [currentPage, dataLimit, searchText, dispatch])

    const showExpenseDetails = (id: number) => {
        setShowModal(true);
        dispatch(getExpenseDetails(id))
    }

    const handleDeleteExpense = (id: number) => {
        setShowDeleteModal(true);
        setExpenseID(id)
    }

    const columnData: any[] = [
        { title: "SI", id: 1 },
        { title: "Title", id: 2 },
        { title: "Request Amount", id: 3 },
        { title: "Approved Amount", id: 4 },
        { title: "Action", id: 5 },
    ]

    console.log('expenseDetails :>> ', expenseDetails);

    return (
        <div>
            <PageHeader
                title='Expense'
                searchPlaceholder='Please search expense by expense no, plan, status...'
                searchText={searchText}
                onSearchText={setSearchText}
                headerRightSide={<>
                    <Link href="/proposals/create-preview" type="button" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-2 text-center sm:w-auto">
                        <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        New Expense
                    </Link>
                </>}
            />

            <PageContentList>
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle="Expense" />
                        </div> :
                        <Table
                            column={columnData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataLimit={dataLimit}
                            totalData={paginationData.total}
                        >
                            {
                                expensesList && expensesList.length > 0
                                && expensesList.map((data: any, index: number) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>
                                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {index + 1}
                                        </th>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {data.name}
                                        </td>

                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {formatCurrency(data.requested_amount)}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {formatCurrency(data.approved_amount)}
                                        </td>


                                        <td className="px-2 py-3 flex gap-1">
                                            <Dropdown
                                                label={
                                                    <div className='mt-2'>
                                                        <i className="bi bi-three-dots-vertical hover:text-blue-500"></i>
                                                    </div>
                                                }
                                                inline={true}
                                                arrowIcon={false}
                                            >
                                                <Dropdown.Item onClick={() => showExpenseDetails(data.id)}>
                                                    <i className='bi bi-eye mr-4'></i> View
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => router.push(`/proposals/enlistment?id=${data.id}`)}>
                                                    <i className='bi bi-pencil mr-4'></i> Edit
                                                </Dropdown.Item>
                                                <Dropdown.Item onClick={() => handleDeleteExpense(data.id)}>
                                                    <i className='bi bi-trash mr-4'></i> Delete
                                                </Dropdown.Item>
                                            </Dropdown>
                                        </td>
                                    </tr>
                                ))
                            }
                        </Table>
                }
            </PageContentList>

            <Modal title="Expense Details" size="lg" show={showModal} handleClose={() => setShowModal(false)} isDismissible={false}>
                {
                    loadingDetails ?
                        <div className="text-center">
                            <Loading loadingTitle="Expense Details" />
                        </div> :
                        <div className="text-gray-900">
                            {
                                (typeof expenseDetails !== "undefined" && expenseDetails !== null) ? (
                                    <div>
                                        <div className="grid gap-2 grid-cols-2">
                                            <div className='flex justify-between'>
                                                <h6>Expense ID</h6>
                                                <h6>:</h6>
                                            </div>
                                            <h6>{expenseDetails.id}</h6>
                                            <div className='flex justify-between'>
                                                <h6>Expense Title</h6>
                                                <h6>:</h6>
                                            </div>
                                            <h6>{expenseDetails.name}</h6>
                                            <div className='flex justify-between'>
                                                <h6>Request Amount</h6>
                                                <h6>:</h6>
                                            </div>
                                            <h6>{formatCurrency(expenseDetails.requested_amount)}</h6>
                                            <div className='flex justify-between'>
                                                <h6>Approved Amount</h6>
                                                <h6>:</h6>
                                            </div>
                                            <h6>{formatCurrency(expenseDetails.approved_amount)}</h6>
                                            <div className='flex justify-between'>
                                                <h6>Status</h6>
                                                <h6>:</h6>
                                            </div>
                                            {
                                                expenseDetails.status && <ExpenseStatus status={expenseDetails.status} />
                                            }
 <div className='flex justify-between'>
                                                <h6>Expense Item</h6>
                                                <h6>:</h6>
                                            </div>
                                        </div>
                                       
                                        <table className="border-collapse border border-gray-300 rounded-md w-full text-sm mt-3">
                                            <thead className="text-xs font-semibold text-gray-700 text-center bg-gray-100">
                                                <tr>
                                                    <th className="border border-gray-200 p-1">SI</th>
                                                    <td className="border border-gray-200 p-1">Item Name</td>
                                                    <td className="border border-gray-200 p-1">Quantity</td>
                                                    <td className="border border-gray-200 p-1">Unit Amount</td>
                                                    <td className="border border-gray-200 p-1">Sub Total</td>
                                                </tr>
                                            </thead>
                                            <tbody className="text-xs text-gray-700 capitalize text-center">
                                                {
                                                    expenseDetails.items && expenseDetails.items.map((item: any, index: number) => (
                                                        <tr key={item.id}>
                                                            <td className="border border-gray-200 p-1">{index + 1}</td>
                                                            <td className="border border-gray-200 p-1">{item.item_name}</td>
                                                            <td className="border border-gray-200 p-1">{item.item_quantity}</td>
                                                            <td className="border border-gray-200 p-1">{item.item_unit_amount}</td>
                                                            <td className="border border-gray-200 p-1">{item.item_subtotal}</td>
                                                        </tr>
                                                    ))
                                                }

                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div>Something Went wrong!</div>
                                )
                            }

                        </div>
                }
            </Modal>

            <Modal title="Proposal Delete" size="md" show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} isDismissible={false} isShowHeader={false}>
                <div className="text-gray-900 text-center flex flex-col justify-center items-center">
                    <svg className="h-16 w-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 5.5C12.5523 5.5 13 5.94772 13 6.5L13 13.5C13 14.0523 12.5523 14.5 12 14.5C11.4477 14.5 11 14.0523 11 13.5L11 6.5C11 5.94772 11.4477 5.5 12 5.5Z" fill="red" />
                        <path d="M12 18.5C12.8284 18.5 13.5 17.8284 13.5 17C13.5 16.1716 12.8284 15.5 12 15.5C11.1716 15.5 10.5 16.1716 10.5 17C10.5 17.8284 11.1716 18.5 12 18.5Z" fill="red" />
                        <path fillRule="evenodd" clipRule="evenodd" d="M1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" fill="red" />
                    </svg>
                    <h2 className='text-2xl font-bold mt-2'> Are You Sure To Delete? </h2>

                </div>
                <div className='text-right flex justify-end gap-2'>
                    <Button title="Yes" customClass="inline py-2 px-3 rounded-md" loading={isDeleting} loadingTitle="Delete Expense..." onClick={() => dispatch(deleteExpense(expenseID, setShowDeleteModal))} />
                    <Button title="No" customClass="bg-gray-900 inline py-2 px-3 rounded-md" onClick={() => setShowDeleteModal(false)} />
                </div>
            </Modal>
        </div >
    )
}
