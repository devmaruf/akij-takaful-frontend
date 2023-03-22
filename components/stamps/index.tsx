import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';

import { RootState } from '@/redux/store';
import { getStampListAction } from '@/redux/actions/stamp-action';
import PageHeader from '@/components/layouts/PageHeader';
import Table from '@/components/table';
import Loading from '@/components/loading';
import { PageContentList } from '../layouts/PageContentList';
import { Dropdown } from 'flowbite-react';
import { useRouter } from 'next/router';
import StampCountView from './StampCountView';
import NoTableDataFound from '../table/NoDataFound';
import { IStampListItem } from '@/redux/interfaces';
import StampViewModal from './StampViewModal';
import { Dispatch } from '@reduxjs/toolkit';

export default function StampList() {
  const router = useRouter();
  const dispatch: Dispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataLimit, setDataLimit] = useState<number>(10);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [stampDetails, setStampDetails] = useState<IStampListItem>();

  const columnData: any[] = [
    { title: "Proposal", id: 1 },
    { title: "Stamps", id: 2 },
    { title: "Action", id: 3 },
  ]

  const { stampList, stampPaginationData, isLoading } = useSelector((state: RootState) => state.stamp);

  useEffect(() => {
    dispatch(getStampListAction(currentPage, dataLimit, searchText));
  }, [currentPage, dataLimit, searchText]);

  const showStampDetails = (stamp: IStampListItem) => {
    setShowModal(true);
    setStampDetails(stamp);
  }

  return (
    <div>
      <PageHeader
        title='Manage Stamps'
        searchText={searchText}
        searchPlaceholder={'Search stamps...'}
        onSearchText={setSearchText}
        headerRightSide={
          <Link href="/stamps/create" type="button" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-3 py-1 text-center sm:w-auto">
            <i className='bi bi-plus-circle mr-2'></i> Add New
          </Link>
        }
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
              <Loading loadingTitle="stamps" />
            </div> :
            <Table
              column={columnData}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              dataLimit={dataLimit}
              totalData={stampPaginationData.total}
            >
              {stampList && stampList.length > 0 && stampList.map((stamp: IStampListItem, index: number) => (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>
                  <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                    {stamp.proposal_no}
                  </th>
                  <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                    <StampCountView stamps={stamp.stamps} />
                  </td>

                  <td className="px-2 py-3 flex gap-1">
                    <Dropdown
                      label={
                        <div className='mt-1'>
                          <i className="bi bi-three-dots-vertical hover:text-blue-500"></i>
                        </div>
                      }
                      inline={true}
                      arrowIcon={false}
                    >
                      {/* <Dropdown.Item onClick={() => showStampDetails(stamp)}>
                        <i className='bi bi-eye mr-4'></i> View
                      </Dropdown.Item> */}
                      <Dropdown.Item onClick={() => router.push(`/stamps/edit?proposal_no=${stamp.proposal_no}`)}>
                        <i className='bi bi-pencil mr-4'></i> Edit
                      </Dropdown.Item>
                    </Dropdown>
                  </td>
                </tr>
              ))}
              {
                stampList && stampList.length === 0 &&
                <NoTableDataFound colSpan={3}>No stamps found</NoTableDataFound>
              }
            </Table>
        }
      </PageContentList>
    </div>
  );
}
