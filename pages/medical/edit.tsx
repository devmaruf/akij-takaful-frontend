import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { RootState } from "@/redux/store";
import Button from "@/components/button";
import { formValidation } from "@/utils/formValidation";
import PageHeader from "@/components/layouts/PageHeader";
import { PageContentList } from "@/components/layouts/PageContentList";
import Loading from "@/components/loading";
import Input from "@/components/input";
import Select from "@/components/select";
import { changeMedicalFileInputValue, changeMedicalInputValue, getMedicalDetailsAction, getMedicalTestByAgeListAction, updateMedicalAction } from "@/redux/actions/medical-action";
import Table from "@/components/table";
import NoTableDataFound from "@/components/table/NoDataFound";
import Link from "next/link";

export default function EnlistmentPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const [errors, setErrors] = useState();
    const [isChecked, setIsChecked] = useState({});
    const [showMedicalList, setShowMedicalList] = useState<boolean>(false);
    const { medicalDetails, isSubmitting, loadingDetails, medicalInput, medicalTestList, medicalFileInput } = useSelector((state: RootState) => state.medical);

    const columnData: any[] = [
        { title: "SL", id: 1 },
        { title: 'Test Name', id: 2 },
        { title: 'Upload File', id: 3 },
        { title: 'Test File', id: 4 },
    ];

    const medicalStatus = [
        { id: 1, label: 'Standard', name: 'Standard', value: 'standard' },
        { id: 2, label: 'Sub Standard', name: 'Sub Standard', value: 'sub-standard' },
    ];

    const approveStatus = [
        { id: 1, label: 'Approve', name: 'approve', value: '1' },
        { id: 2, label: 'Cancel', name: 'cancel', value: '0' },
    ];
    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getMedicalDetailsAction(id));
            dispatch(getMedicalTestByAgeListAction(medicalDetails.proposal_id));
        }, 500),
        [id]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    const handleChangeTextInput = (name: string, value: any) => {
        dispatch(changeMedicalInputValue(name, value, ""));
    };

    const handleChangeFileInput = (name: string, value: any, event: any, medicalId: number, medicalTestId: number) => {
        dispatch(changeMedicalFileInputValue(name, value, event, medicalId, medicalTestId));
    };


    useEffect(() => {
        if (parseInt(medicalDetails.further_requirement) === 1) {
            setShowMedicalList(true);
        } else {
            setShowMedicalList(false);
        }
    }, [id]);

    const handleSubmitProposal = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const clickedButton = e.nativeEvent.submitter.name;
        if (clickedButton === "submitProposal") {
            const { errors, isValid } = formValidation(e);
            setErrors(errors);

            if (isValid) {
                dispatch(updateMedicalAction(medicalInput, id, router));
            }
        }
    };

    console.log('medicalDetails :>> ', medicalDetails);

    return (
        <div>
            <PageHeader
                title="Medical"
                hasSearch={false}
            />
            <PageContentList>
                {
                    loadingDetails ?
                        <div className="text-center">
                            <Loading loadingTitle="Medical information" />
                        </div>
                        :
                        <div className={`grid gap-3 grid-cols-1 md:${showMedicalList === true ? 'grid-cols-2' : 'grid-cols-1'}`}>

                            <form
                                method="post"
                                autoComplete="off"
                                encType="multipart/form-data"
                                onSubmit={(e) => handleSubmitProposal(e)}
                                noValidate
                            >

                                <div className="grid gap-2 grid-cols-1 md:grid-cols-2 shadow-lg p-4 bg-white rounded-lg">
                                    <div className='md:ml-4 col-span-4'>
                                        <div className='grid gap-2 md:grid-cols-2'>
                                            <Input
                                                label="Proposal No"
                                                name="proposal_no"
                                                placeholder='Proposal No'
                                                value={medicalInput?.proposal_no}
                                                isRequired={true}
                                                inputChange={handleChangeTextInput}
                                            />
                                            <Select
                                                options={medicalStatus}
                                                isSearchable={true}
                                                name="status"
                                                label="Status"
                                                defaultValue={medicalInput?.status}
                                                placeholder='Select Status...'
                                                handleChangeValue={handleChangeTextInput}
                                            />

                                            <Select
                                                options={approveStatus}
                                                isSearchable={true}
                                                name="is_approve"
                                                label="Approve Status"
                                                defaultValue={medicalInput?.is_approve == 0 ? '0' : '1'}
                                                placeholder='Select Status...'
                                                handleChangeValue={handleChangeTextInput}
                                            />
                                            <Input
                                                label="Extra Info Requirement"
                                                name="extra_info_requirement"
                                                placeholder='Extra Info Requirement'
                                                type='text'
                                                value={medicalInput?.extra_info_requirement}
                                                isRequired={true}
                                                inputChange={handleChangeTextInput}
                                            />
                                                <div className="flex items-center mt-6">
                                                    <input
                                                        id={`default-checkbox-${medicalDetails.id}`}
                                                        type="checkbox"
                                                        // value=""
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"

                                                        // inputChange={handleChangeTextInput}
                                                        checked={showMedicalList}
                                                        onChange={() => setShowMedicalList(!showMedicalList)}
                                                    // checked={parseInt(medicalDetails.further_requirement) !== 1 ? true : false}

                                                        inputChange={handleChangeTextInput}
                                                        checked={parseInt(medicalDetails?.further_requirement) === 1?1:0}

                                                    />
                                                    <label htmlFor={`default-checkbox-${medicalDetails.id}`} className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">
                                                        Futher Requirement
                                                    </label>
                                                </div>
                                        </div>
                                    </div>

                                </div>

                                <Button
                                    name="submitProposal"
                                    title="Save"
                                    loadingTitle="Saving..."
                                    loading={isSubmitting}
                                    customClass="mt-4"
                                />
                            </form>
                            
                            <div>
                                {
                                    showMedicalList &&
                                    <Table
                                        column={columnData}
                                        currentPage={10}
                                        setCurrentPage={1}
                                        dataLimit={10}
                                        totalData={10}
                                    >
                                        {
                                            medicalTestList && medicalTestList.length > 0 && medicalTestList.map((medicalTest: any, index: any) => (
                                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={medicalTest.id}>
                                                    <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                                        {index + 1}
                                                    </th>
                                                    <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                                        {medicalTest.name}
                                                    </td>

                                                    <td className="px-2 py-3 flex gap-1">
                                                        <input
                                                            type="file"
                                                            name="attachment"
                                                            placeholder='Attachment'
                                                            // value={medicalInput.attachment}
                                                            required
                                                            onChange={(e: any) => handleChangeFileInput(
                                                                "file",
                                                                e.target.files[0],
                                                                e,
                                                                medicalDetails?.id,
                                                                medicalTest.id
                                                            )}
                                                        />
                                                    </td>
                                                    <td className="px-2 py-3 flex gap-1">
                                                        {medicalTest.file &&
                                                            <td className="px-2 py-3 flex gap-1">
                                                                <Link href={`${process.env.REACT_APP_PUBLIC_URL}/storage/medical-files/` + medicalTest.file} target="_blank" className='text-blue-500'>
                                                                    <i className='bi bi-download'></i> Download test file
                                                                </Link>
                                                            </td>
                                                        }
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        {
                                            medicalTestList && medicalTestList.length === 0 &&
                                            <NoTableDataFound colSpan={9}>No proposal found in medical medical category ! Please create one.</NoTableDataFound>
                                        }
                                    </Table>

                                    medicalTestList && medicalTestList?.length > 0 && medicalTestList?.map((medicalTest: any, index: any) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-left" key={medicalTest.id}>
                                            <th scope="row" className="px-2 py-3 font-normal text-gray-900 break-words" >
                                                {index + 1}
                                            </th>
                                            <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                                {medicalTest.name}
                                            </td>

                                            <td className="px-2 py-3 flex gap-1">
                                                <input
                                                    type="file"
                                                    name="attachment"
                                                    placeholder='Attachment'
                                                    // value={medicalInput.attachment}
                                                    required
                                                    onChange={(e: any) => handleChangeFileInput(
                                                        "file",
                                                        e.target.files[0],
                                                        e,
                                                        medicalDetails?.id,
                                                        medicalTest.id
                                                    )}
                                                />
                                            </td>
                                            <td className="px-2 py-3 flex gap-1">
                                            {medicalTest.file &&
                                                <td className="px-2 py-3 flex gap-1">
                                                    <Link href={`${process.env.REACT_APP_PUBLIC_URL}/storage/medical-files/`+medicalTest.file} target="_blank" className='text-blue-500'>
                                                        <i className='bi bi-download'></i> Download test file
                                                    </Link>
                                                </td>
                                            }
                                            </td>
                                        </tr>
                                    ))
                                }

                            </div>
                        </div>
                }
            </PageContentList>
        </div>
    );
}
