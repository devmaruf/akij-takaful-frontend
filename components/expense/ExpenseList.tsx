import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Modal from '@/components/modal';
import Table from '@/components/table';
import { getExpensesList, getExpenseDetails, deleteExpense } from '@/redux/actions/expense-action';
import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContentList } from '@/components/layouts/PageContentList';
import { formatCurrency } from '@/utils/currency';
import NewButton from '@/components/button/button-new';
import ActionButtons from '@/components/button/button-actions';
import ExpenseDetail from './ExpenseDetail';
import StatusBadge from '@/components/badge/StatusBadge';
import NoTableDataFound from '@/components/table/NoDataFound';

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
        { title: "ID", id: 2 },
        { title: "Title", id: 3 },
        { title: "Status", id: 4 },
        { title: "Requested Amount", id: 5 },
        { title: "Approved Amount", id: 6 },
        { title: "Action", id: 7 },
    ]

    return (
        <div>
            <PageHeader
                title='Expense'
                searchPlaceholder='Please search expense by expense name, type, status...'
                searchText={searchText}
                onSearchText={setSearchText}
                headerRightSide={<NewButton href='/expense/create' element='New Expense' />}
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
                                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            #{data.id}
                                        </th>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {data.name}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            <StatusBadge status={data?.status ?? ''} />
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {formatCurrency(data.requested_amount)}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {formatCurrency(data.approved_amount)}
                                        </td>
                                        <td className="px-2 py-3 flex gap-1">                                            <ActionButtons
                                            items={[
                                                {
                                                    element: 'View',
                                                    onClick: () => showExpenseDetails(data.id),
                                                    iconClass: 'eye'
                                                },
                                                {
                                                    element: 'Edit',
                                                    onClick: () => router.push(`/expense/edit?id=${data.id}`),
                                                    iconClass: 'pencil'
                                                },
                                                {
                                                    element: 'Delete',
                                                    onClick: () => handleDeleteExpense(data.id),
                                                    iconClass: 'trash'
                                                }
                                            ]}
                                        />
                                        </td>
                                    </tr>
                                ))
                            }
                            {
                                expensesList && expensesList.length === 0 &&
                                <NoTableDataFound colSpan={7}>
                                    No expense found ! Please create an expense.
                                </NoTableDataFound>
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
                        <ExpenseDetail expenseDetails={expenseDetails} />
                }
            </Modal>

            <Modal title="Delete Expense" size="md" show={showDeleteModal} handleClose={() => setShowDeleteModal(false)} isDismissible={false} isShowHeader={false}>
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
