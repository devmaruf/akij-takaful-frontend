import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import { getStampListAction } from '@/redux/actions/stamp-register-action';
import { PageContentList } from '@/components/layouts/PageContentList';
import { IStampForm } from '@/redux/interfaces';
import { Dispatch } from '@reduxjs/toolkit';
import { formatCurrency } from '@/utils/currency';
import Table from '@/components/table';
import Loading from '@/components/loading';
import NewButton from '@/components/button/button-new';
import PageHeader from '@/components/layouts/PageHeader';
import NoTableDataFound from '@/components/table/NoDataFound';

export default function StampList() {
  const dispatch: Dispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataLimit, setDataLimit] = useState<number>(10);

  const columnData: any[] = [
    { title: "SL", id: 1 },
    { title: "Proposal no", id: 2 },
    { title: "Stamp used", id: 3 },
    { title: "Opening Balance", id: 4 },
    { title: "Schedule date", id: 5 },
    { title: "Business date", id: 6 },
    { title: "Remarks", id: 7 },
  ]

  const { stampList, stampPaginationData, isLoading } = useSelector((state: RootState) => state.stamp);

  useEffect(() => {
    dispatch(getStampListAction(currentPage, dataLimit, searchText));
  }, [currentPage, dataLimit, searchText]);

  return (
    <div>
      <PageHeader
        title='Stamp Register'
        searchText={searchText}
        searchPlaceholder={'Search registered stamps...'}
        onSearchText={setSearchText}
        headerRightSide={<NewButton href='/stamp-register/create' element='New' />}
      />

      <PageContentList>
        {
          isLoading ?
            <div className="text-center">
              <Loading loadingTitle="stamps" />
            </div> :
            <Table
              column={columnData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              dataLimit={dataLimit}
              totalData={stampPaginationData.total}
            >
              {stampList && stampList.length > 0 && stampList.map((stamp: IStampForm, index: number) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>
                  <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                    {index + 1}
                  </th>
                  <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                    {stamp.proposal_no}
                  </th>
                  <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                    {formatCurrency(stamp.stamp_used)}
                  </th>
                  <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                    {formatCurrency(stamp.balance)}
                  </th>
                  <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                    {stamp.schedule_date}
                  </th>
                  <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                    {stamp.business_date}
                  </th>
                  <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                    {stamp.remarks}
                  </th>
                </tr>
              ))}
              {
                stampList && stampList.length === 0 &&
                <NoTableDataFound colSpan={7}>No stamp registration found</NoTableDataFound>
              }
            </Table>
        }
      </PageContentList>
    </div>
  );
}
