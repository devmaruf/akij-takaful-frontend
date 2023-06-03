import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { RootState } from "@/redux/store";
import {
    changeInputValue,
    handleCheckIdentity,
} from "@/redux/actions/proposal-action";
import Button from "@/components/button";
import { formValidation } from "@/utils/formValidation";
import PageHeader from "@/components/layouts/PageHeader";
import { PageContentList } from "@/components/layouts/PageContentList";
import Loading from "@/components/loading";
import Input from "@/components/input";
import Select from "@/components/select";
import { changeMedicalInputValue, getMedicalDetailsAction, getMedicalTestByAgeListAction, updateMedicalAction } from "@/redux/actions/medical-action";
import Table from "@/components/table";

export default function EnlistmentPage() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const [errors, setErrors] = useState();
    const [isChecked, setIsChecked] = useState({});
    const { medicalDetails, isSubmitting, loadingDetails, medicalInput, medicalTestList } = useSelector((state: RootState) => state.medical);

    const columnData: any[] = [
        { title: "SL", id: 1 },
        { title: 'Test Name', id: 2 },
        { title: 'Minimum Age', id: 3 },
        { title: 'Maximum Age', id: 4 },
        { title: 'Minimum Amount', id: 5 },
        { title: 'Maximum Amount', id: 6 },
        { title: 'Test File', id: 7 },
    ];

    const medicalStatus = [
        { id: 1, label: 'Standard', name: 'Standard', value: 'standard' },
        { id: 2, label: 'Sub Standard', name: 'Sub Standard', value: 'sub-standard' },
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
        console.log('value', value)
        dispatch(changeMedicalInputValue(name, value, ""));
    };


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

    return (
        <div>
            <PageHeader
                title="Medical"
                hasSearch={false}
            />

            <PageContentList>
                <div className="flex space-x-6">
                    {
                        loadingDetails ?
                            <div className="text-center">
                                <Loading loadingTitle="Medical information" />
                            </div>
                            :
                            <form
                                method="post"
                                autoComplete="off"
                                encType="multipart/form-data"
                                onSubmit={(e) => handleSubmitProposal(e)}
                                noValidate
                            >

                                <div className="grid gap-2 grid-cols-1 md:grid-cols-6 shadow-lg">
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
                                            <Input
                                                label="Extra Info Requirement"
                                                name="extra_info_requirement"
                                                placeholder='Extra Info Requirement'
                                                type='text'
                                                value={medicalInput?.extra_info_requirement}
                                                isRequired={true}
                                                inputChange={handleChangeTextInput}
                                            />
                                            {
                                                <div className="flex items-center mt-6">
                                                    <input
                                                        id={`default-checkbox-${medicalDetails.id}`}
                                                        type="checkbox"
                                                        value=""
                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                        onChange={handleChangeTextInput}
                                                        checked={parseInt(medicalDetails.further_requirement) === 1}
                                                    />
                                                    <label  className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">
                                                        Futher Requirement
                                                    </label>
                                                </div>
                                            }
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
                    }
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
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {medicalTest.min_age}
                                    </td>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words" >
                                        {medicalTest.max_age}
                                    </td>
                                    <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                        {medicalTest.min_amount}
                                    </td>

                                    <td className="px-2 py-3 font-normal text-gray-900 break-words">
                                        {medicalTest.max_amount}
                                    </td>

                                    <td className="px-2 py-3 flex gap-1">
                                        <Input
                                            type="file"
                                            label="Attachment"
                                            name="attachment"
                                            placeholder='Attachment'
                                            value={medicalInput.attachment}
                                            isRequired={false}
                                            inputChange={handleChangeTextInput}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                        {/* {
                                            medicalList && medicalList.length === 0 &&
                                            <NoTableDataFound colSpan={9}>No {'medical item'} found ! Please create one.</NoTableDataFound>
                                        } */}
                    </Table>
                </div>
            </PageContentList>
        </div>
    );
}
