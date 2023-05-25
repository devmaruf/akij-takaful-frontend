import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { RootState } from '@/redux/store';
import Modal from '@/components/modal';
import Table from '@/components/table';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import NewButton from '@/components/button/button-new';
import { PageContentList } from '@/components/layouts/PageContentList';
import ActionButtons from '@/components/button/button-actions';
import NoTableDataFound from '@/components/table/NoDataFound';
import { emptyUnderwritingQuesInputAction, getUnderwritingQuestionnairesList, changeInputValue, handleSubmitUnderwritingQues, handleUpdateUnderwritingQues, getUnderwritingQuesDetails, deleteUnderwritingQue } from '@/redux/actions/underwriting-questionnaire-action';
import UnderwritingQuesForm from './UnderwritingQuesForm';
import PermissionModal from '../permissionModal';
import UnderwritingQuesDetails from './UnderwritingQuesDetails';

export default function UnderwritingQuestionnaires() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showDetailsModal, setShowDetailsModal] = useState<boolean>(false);
    const [showUpdateModal, setShowUpdateModal] = useState<boolean>(false);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [underwritingQuesID, setUnderwritingQuesID] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [dataLimit, setDataLimit] = useState<number>(10);
    const [searchText, setSearchText] = useState<string>('');
    const { underwritingQuesInput, underwritingQuesList, underwritingQuesDetails, isLoading, isSubmitting, isLoadingDetails, isDeleting } = useSelector((state: RootState) => state.underwritingQues);

    const columnData: any[] = [
        { title: "Requirement Name (en)", id: 1 },
        { title: "Requirement Name (bn)", id: 2 },
        { title: "Input Type", id: 3 },
        { title: "Gender", id: 4 },
        { title: "Action", id: 5 },
    ]

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getUnderwritingQuestionnairesList(currentPage, dataLimit, searchText));
        }, 500),
        [currentPage, dataLimit, searchText]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    const handleOpenModal = (id: number, type: string) => {
        if (type === "view") {
            setShowDetailsModal(true);
            dispatch(getUnderwritingQuesDetails(id));
        } else if (type === "edit") {
            setShowUpdateModal(true);
            dispatch(getUnderwritingQuesDetails(id));
        } else {
            setShowDeleteModal(true);
            setUnderwritingQuesID(id);
        }
    }

    const changeTextInput = (name: string, value: any) => {
        dispatch(changeInputValue(name, value));
    };

    const onSubmit = (e: any, type: string) => {
        e.preventDefault();
        if (type === "edit") {
            dispatch(handleUpdateUnderwritingQues(underwritingQuesInput, setShowUpdateModal));
        } else {
            dispatch(handleSubmitUnderwritingQues(underwritingQuesInput, setShowModal));
        }
    }

    return (
        <div>
            <PageHeader
                title='Underwriting Questionnaire'
                searchText={searchText}
                onSearchText={setSearchText}
                searchPlaceholder='Search underwriting questionnaire by code, name, short code, address...'
                headerRightSide={
                    <NewButton onClick={() => {
                        setShowModal(true);
                        dispatch(emptyUnderwritingQuesInputAction());
                    }}
                        element='Add New'
                    />}
            />
            <PageContentList>
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle="Underwriting Questionnaires" />
                        </div> :

                        <Table
                            column={columnData}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                            dataLimit={dataLimit}
                        // totalData={}
                        >
                            {underwritingQuesList && underwritingQuesList.length > 0 && underwritingQuesList.map((data, index: number) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={index + 1}>

                                    <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {data.requirement_name_en}
                                    </th>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {data.requirement_name_bn}
                                    </td>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {data.input_type}
                                    </td>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {data.gender}
                                    </td>
                                    <td className="px-2 py-3 flex gap-1">
                                        <ActionButtons
                                            items={[
                                                {
                                                    element: 'View',
                                                    onClick: () => handleOpenModal(data.id, 'view'),
                                                    iconClass: 'eye'
                                                },
                                                {
                                                    element: 'Edit',
                                                    onClick: () => handleOpenModal(data.id, 'edit'),
                                                    iconClass: 'pencil'
                                                },
                                                {
                                                    element: 'Delete',
                                                    onClick: () => handleOpenModal(data.id, 'delete'),
                                                    iconClass: 'trash'
                                                }
                                            ]}
                                        />
                                    </td>
                                </tr>
                            ))
                            }

                            {
                                underwritingQuesList && underwritingQuesList.length === 0 &&
                                <NoTableDataFound colSpan={5}>No banks found ! Please enlist a bank.</NoTableDataFound>
                            }
                        </Table>
                }
            </PageContentList>

            <Modal title={`Underwriting Questionnaire`} size="2xl" show={showModal} handleClose={() => setShowModal(false)} isDismissible={true}>
                <UnderwritingQuesForm
                    onChangeText={changeTextInput}
                    onSubmit={onSubmit}
                    pageType='add'
                />
            </Modal>

            <Modal title={`Underwriting Questionnaire`} size="lg" show={showDetailsModal} handleClose={() => setShowDetailsModal(false)} isDismissible={false}>
                {
                    isLoadingDetails === true ?
                        <div className="text-center">
                            <Loading loadingTitle="Underwriting Questionnaire" />
                        </div> :
                        <div className="text-gray-900">

                            {
                                (typeof underwritingQuesDetails !== "undefined" && underwritingQuesDetails !== null) ? (
                                    <UnderwritingQuesDetails data={underwritingQuesDetails} />
                                ) : (
                                    <div>Something Went wrong!</div>
                                )
                            }
                        </div>
                }
            </Modal>

            <Modal title={`Update Underwriting Questionnaire`} size="2xl" show={showUpdateModal} handleClose={() => setShowUpdateModal(false)} isDismissible={false}>
                {
                    isLoadingDetails === true ?
                        <div className="text-center">
                            <Loading loadingTitle="Underwriting Questionnaire" />
                        </div> :
                        <div className="text-gray-900">
                            {
                                (typeof underwritingQuesInput !== "undefined" && underwritingQuesInput !== null) ? (
                                    <UnderwritingQuesForm
                                        onChangeText={changeTextInput}
                                        onSubmit={onSubmit}
                                        pageType='edit'
                                    />
                                ) : (
                                    <div>Something Went wrong!</div>
                                )
                            }
                        </div>
                }
            </Modal>

            <PermissionModal
                show={showDeleteModal}
                status={"warning"}
                isLoading={isDeleting}
                loadingText={"Deleting Underwriting Ques..."}
                handleClose={() => setShowDeleteModal(false)}
                handleAction={() => dispatch(deleteUnderwritingQue(underwritingQuesID, setShowDeleteModal))}
            />
        </div >
    )
}
