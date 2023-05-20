import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';
import { useRouter } from 'next/router';

import Table from '@/components/table';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import NewButton from '@/components/button/button-new';
import ActionButtons from '@/components/button/button-actions';
import StatusBadge from '@/components/badge/StatusBadge';
import NoTableDataFound from '@/components/table/NoDataFound';
import { RootState } from '@/redux/store';
import { PageContentList } from '@/components/layouts/PageContentList';
import { IEmployeeView } from '@/redux/interfaces';
import { hasPermission } from '@/utils/permission';
import { getPaymentListAction } from '@/redux/actions/payment-action';

interface IPaymentList {
    isAgent?: boolean;
}

export default function PaymentList({ isAgent = false }: IPaymentList) {
    const dispatch = useDispatch();
    const router = useRouter();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const { paymentList,paymentPaginationData, isLoading, } = useSelector((state: RootState) => state.payment);
    const [searchText, setSearchText] = useState<string>('');
    const columnData: any[] = [
        { title: "SL", id: 1 },
        { title: 'Project ID', id: 2 },
        { title: 'Transaction Refrance', id: 3 },
        { title: "Transaction Amount", id: 4 },
        { title: "Status", id: 5 },
        { title: "Transaction Date", id: 6 },
        { title: "Action", id: 7 }
    ];

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getPaymentListAction(currentPage, dataLimit, searchText))
        }, 500),
        [currentPage, dataLimit, searchText]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);


    

    const getActionButtons = (payment: any) => {
        const actions = [];

        if (hasPermission('payment.status')) {
            actions.push({
                element: 'Approve',
                onClick: () => router.push(
                    `/payment/status-change?id=${payment.id} status=${"is_approve"}`
                ),
                iconClass: 'bi bi-check'
            });

            actions.push({
                element: 'Cancel',
                onClick: () => router.push(
                    `/payment/status-change?id=${payment.id} status=${"is_cancel"}`
                ),
                iconClass: 'bi bi-x'
            });
        }

        return actions;
    }

    return (
        <div>
            <PageHeader
                title={isAgent ? 'Manage Banca Officer/Manager' : 'Payments'}
                searchPlaceholder={`Search ${isAgent ? 'agents' : 'payments'}...`}
                searchText={searchText}
                onSearchText={setSearchText}
                headerRightSide={
                    <NewButton
                        href={isAgent ? '/banca/agent/create' : '/payment/create'}
                        element={isAgent ? 'New Officer/Manager' : 'New Payment'}
                    />
                }
            />

            <PageContentList>
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle={isAgent ? 'Agents...' : 'Payments...'} />
                        </div> :
                        <Table
                            column={columnData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataLimit={dataLimit}
                            totalData={paymentPaginationData.total}
                        >
                            {
                                paymentList && paymentList.length > 0 && paymentList.map((payment: any, index: any) => (
                                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={payment.id}>
                                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {index + 1}
                                        </th>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {payment.project_id}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {payment.ref_transaction_id}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {payment.amount}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        <StatusBadge status={payment.status} />
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {payment.transaction_date}
                                        </td>
                                        <td className="px-2 py-3 flex gap-1">
                                            <ActionButtons
                                                items={getActionButtons(payment)}
                                            />
                                        </td>
                                    </tr>
                                ))
                            }

                            {
                                paymentList && paymentList.length === 0 &&
                                <NoTableDataFound colSpan={9}>No {isAgent ? 'officer/manager' : 'employee'} found ! Please create one.</NoTableDataFound>
                            }
                        </Table>
                }
            </PageContentList>
        </div >
    )
}