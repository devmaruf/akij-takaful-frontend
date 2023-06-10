import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import ActionButtons from '@/components/button/button-actions';
import PageHeader from '@/components/layouts/PageHeader';
import Table from '@/components/table';
import Loading from '@/components/loading';
import NoTableDataFound from '@/components/table/NoDataFound';
import StampViewModal from './StampStockViewModal';
import NewButton from '@/components/button/button-new';
import { getStampStockListAction } from '@/redux/actions/stamp-stock-action';
import { formatCurrency } from '@/utils/currency';
import { hasPermission } from '@/utils/permission';
import { RootState } from '@/redux/store';
import { Dispatch } from '@reduxjs/toolkit';
import { IStampListItem } from '@/redux/interfaces';
import { PageContentList } from '@/components/layouts/PageContentList';

export default function StampPurchaseList() {
  const router = useRouter();
  const dispatch: Dispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataLimit, setDataLimit] = useState<number>(10);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [stampDetails, setStampDetails] = useState<IStampListItem>();

  const columnData: any[] = [
    { title: "Challan No", id: 1 },
    { title: "Total Amount", id: 2 },
    { title: "Purchase date", id: 3 },
    { title: "Receive Date", id: 4 },
    { title: "Action", id: 5 },
  ]

  const { stampStockList, stampStockPaginationData, isLoading } = useSelector((state: RootState) => state.stampStock);

  useEffect(() => {
    dispatch(getStampStockListAction(currentPage, dataLimit, searchText));
  }, [currentPage, dataLimit, searchText, dispatch]);

  const showStampDetails = (stampStock) => {
    setShowModal(true);
    setStampDetails(stampStock);
  }

  const getActionItems = (stampStock) => {
    const actions = [];

    if (hasPermission('stamp_purchase.view')) {
      actions.push({
        element: 'View',
        onClick: () => showStampDetails(stampStock),
        iconClass: 'eye'
      });
    }

    if (hasPermission('stamp_purchase.edit')) {
      actions.push({
        element: 'Edit',
        onClick: () => router.push(`/stamp-stock/edit?id=${stampStock.id}`),
        iconClass: 'pencil'
      });
    }

    if (hasPermission('stamp_purchase.delete')) {
      actions.push({
        element: 'Delete',
        onClick: () => { },
        iconClass: 'trash'
      });
    }

    return actions;
  }

  return (
    <div>
      <PageHeader
        title='Stamp Stock'
        searchText={searchText}
        searchPlaceholder={'Search stamp stocks...'}
        onSearchText={setSearchText}
        headerRightSide={<NewButton href='/stamp-stock/create' element='New stock' />}
      />

      <StampViewModal
        showModal={showModal}
        setShowModal={(value) => setShowModal(value)}
        stamp={stampDetails}
      />

      <PageContentList>
        {
          isLoading ?
            <div className="text-center">
              <Loading loadingTitle="Stamp stocks..." />
            </div> :
            <Table
              column={columnData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              dataLimit={dataLimit}
              totalData={stampStockPaginationData.total}
            >
              {stampStockList && stampStockList.length > 0 && stampStockList.map((stampStock: any, index: number) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>
                  <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                    {stampStock.challan_no}
                  </th>
                  <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                    {formatCurrency(stampStock.total)}
                  </td>
                  <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                    {stampStock.purchase_date}
                  </td>
                  <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                    {stampStock.receive_date}
                  </td>

                  <td className="px-2 py-3 flex gap-1">
                    <ActionButtons items={getActionItems(stampStock)} />
                  </td>
                </tr>
              ))}
              {
                stampStockList && stampStockList.length === 0 &&
                <NoTableDataFound colSpan={5}>No stamp stocks found</NoTableDataFound>
              }
            </Table>
        }
      </PageContentList>
    </div>
  );
}
