import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import Table from '@/components/table';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import NewButton from '@/components/button/button-new';
import ActionButtons from '@/components/button/button-actions';
import StatusBadge from '@/components/badge/StatusBadge';
import NoTableDataFound from '@/components/table/NoDataFound';
import { RootState } from '@/redux/store';
import { PageContentList } from '@/components/layouts/PageContentList';
import { hasPermission } from '@/utils/permission';
import { getPaymentListAction, paymentStatusChangeAction } from '@/redux/actions/payment-action';
import { formatCurrency } from '@/utils/currency';
import PermissionModal from '../permissionModal';

interface IPaymentList {
    isAgent?: boolean;
}

export default function PaymentList({ isAgent = false }: IPaymentList) {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const { paymentList, paymentPaginationData, isLoading, isSubmitting } = useSelector((state: RootState) => state.payment);
    const [searchText, setSearchText] = useState<string>('');
    const [showPaymentConfirmationModal, setShowPaymentConfirmationModal] = useState<boolean>(false);
    const [paymentID, setPaymentID] = useState<number | null>(null);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);

    const columnData: any[] = [
        { title: "SL", id: 1 },
        { title: 'Proposal No', id: 2 },
        { title: 'Payment via', id: 3 },
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
                onClick: () => handleShowPaymentConfirmationModal(payment.id, "is_approve"),
                iconClass: 'bi bi-check'
            });

            actions.push({
                element: 'Cancel',
                onClick: () => handleShowPaymentConfirmationModal(payment.id, "is_cancel"),
                iconClass: 'bi bi-x'
            });
        }

        return actions;
    }

    const handleShowPaymentConfirmationModal = (id: number, status: string) => {
        setShowPaymentConfirmationModal(true);
        setPaymentID(id);
        setPaymentStatus(status);
    }

    const paymentStatusAction = () => {
        dispatch(paymentStatusChangeAction(paymentID, paymentStatus, setShowPaymentConfirmationModal));
    }



    return (
        <div>
            <PageHeader
                title={'Payments'}
                searchPlaceholder={`Search payments...`}
                searchText={searchText}
                onSearchText={setSearchText}
                headerRightSide={
                    <NewButton
                        href={'/pay-now'}
                        element={'Pay now'}
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
                                            {payment.proposal_no}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                            {payment.gateway_name}
                                        </td>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                            {formatCurrency(payment.amount)}
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


            <PermissionModal
                title={paymentStatus === 'is_approve' ? "Are you want to approve this transaction?" : "Are you want to cancel this transaction?"}
                show={showPaymentConfirmationModal}
                status={paymentStatus === 'is_approve' ? "success" : "warning"}
                isLoading={isSubmitting}
                loadingText={paymentStatus === 'is_approve' ? "Approving Transaction" : "Rejecting Transaction"}
                handleClose={() => setShowPaymentConfirmationModal(false)}
                handleAction={() => paymentStatusAction()}
            />


        </div >
    )
}