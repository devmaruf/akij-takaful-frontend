import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { Accordion, Alert } from 'flowbite-react';

import Button from '@/components/button';
import Table from '@/components/table';
import { deleteRoleAction, getRoleListAction } from '@/redux/actions/role-action';
import { RootState } from '@/redux/store';
import Loading from '@/components/loading';
import Tooltip from '@/components/tooltip';
import PageHeader from '@/components/layouts/PageHeader';
import DeleteModal from '@/components/delete/DeleteModal';

export default function Roles() {
    const dispatch = useDispatch();
    const columnData = [
        { title: "SL", id: "01" },
        { title: "Role", id: "02" },
        { title: "Permissions", id: "03" },
        { title: "Action", id: "05" },
    ]

    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [deleteId, setDeleteId] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>('');

    const { isLoading, roleList, rolesListPaginated } = useSelector((state: RootState) => state.role);

    useEffect(() => {
        dispatch(getRoleListAction(currentPage, dataLimit, searchText));
    }, [currentPage, dataLimit, searchText, dispatch]);

    const onDelete = () => {
        dispatch(deleteRoleAction(deleteId));
        setShowDeleteModal(false);
    }

    return (
        <div>
            <PageHeader
                title='Manage Roles'
                searchPlaceholder='Search roles by name...'
                searchText={searchText}
                onSearchText={setSearchText}
                headerRightSide={
                    <Link href="/settings/roles/create" type="button" className="w-1/2 text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:ring-cyan-200 font-medium inline-flex items-center justify-center rounded-lg text-sm px-2 py-1 text-center sm:w-auto">
                        <svg className="-ml-1 mr-2 h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" /></svg>
                        Add New
                    </Link>
                }
            />

            <div className="p-4 bg-white block border-b border-gray-200">
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle="Role List" />
                        </div> :
                        <Table
                            column={columnData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataLimit={dataLimit}
                            totalData={rolesListPaginated.total}
                        >
                            {
                                roleList && roleList.length > 0 && roleList.map((data, index) => (
                                    <tr className="bg-white border-b hover:bg-gray-50" key={index + 1}>
                                        <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words w-6" >
                                            {index + 1}
                                        </th>
                                        <td className="px-2 py-3 font-normal text-gray-900 break-words w-48">
                                            {data.name}
                                        </td>
                                        <td className="px-2 py-1 font-normal text-gray-900 break-words" >
                                            <div className='max-w-[500px]'>
                                                {
                                                    data.permissions && data.permissions.length > 0 &&
                                                    <Accordion collapseAll={true}>
                                                        <Accordion.Panel>
                                                            <Accordion.Title className='py-0 my-0'>
                                                                {data.permissions.length ?? 0} Permissions
                                                            </Accordion.Title>
                                                            <Accordion.Content className='py-1 my-1'>
                                                                {
                                                                    data.permissions.map((permission, permissionIndex) => (
                                                                        <span key={permissionIndex + 1} className="bg-blue-500 text-[10px] text-white py-0 m-0.5 px-0.5 rounded-md inline-flex">{permission.name}</span>
                                                                    ))
                                                                }
                                                            </Accordion.Content>
                                                        </Accordion.Panel>
                                                    </Accordion>
                                                }

                                                {
                                                    data.permissions && data.permissions.length === 0 &&
                                                    <Alert
                                                        color="failure"
                                                    >
                                                        No Permissions added.
                                                    </Alert>
                                                }
                                            </div>
                                        </td>

                                        <td className="px-2 py-3 text-right min-w-[100px]">
                                            <div className='flex'>
                                                <Tooltip content={`Edit - ${data.name}`}>
                                                    <Button customClass="p-1 rounded-md inline mr-2">
                                                        <Link href={`/settings/roles/edit?id=${data.id}`}>
                                                            <i className='bi bi-pencil'></i>
                                                        </Link>
                                                    </Button>
                                                </Tooltip>

                                                <Tooltip content={`Delete - ${data.name}`}>
                                                    <Button
                                                        variant='danger'
                                                        customClass="p-1 rounded-md inline"
                                                        onClick={() => {
                                                            setShowDeleteModal(true);
                                                            setDeleteId(data.id)
                                                        }}
                                                    >
                                                        <i className='bi bi-trash'></i>
                                                    </Button>
                                                </Tooltip>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            }
                        </Table>
                }
            </div>

            <DeleteModal
                showDeleteModal={showDeleteModal}
                setShowDeleteModal={setShowDeleteModal}
                onDelete={onDelete}
            />
        </div >
    )
}
