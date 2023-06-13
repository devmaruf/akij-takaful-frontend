import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import Loading from '@/components/loading';
import Button from '@/components/button';
import Input from '@/components/input';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContent } from '@/components/layouts/PageContent';
import { changeMedicalTestInputValue, submitMedicalTestAction, updateMedicalTestAction } from '@/redux/actions/medicaltest-action';

interface IMedicalTestsForm {
    id: number;
    pageType: 'create' | 'edit' | 'profile';
}

export default function MedicalForm({ id, pageType }: IMedicalTestsForm) {
    const router = useRouter();
    const dispatch = useDispatch();

    const { medicalTestInput, isSubmitting,isLoading } = useSelector((state: RootState) => state.medical);

    const handleChangeTextInput = (name: string, value: any) => {
        dispatch(changeMedicalTestInputValue(name, value));
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        // const formattedInputObject = {
        //     ...medicalTestInput,
        //     branch_ids: medicalTestInput.branch_ids.map(branch => branch.value)
        // }

        if (pageType === 'create') {
            dispatch(submitMedicalTestAction(medicalTestInput, router));
        } else {
            dispatch(updateMedicalTestAction(medicalTestInput, router, pageType));
        }
    }

    const getMainPageTitle = () => {
            return 'Medical Test';
    }

    const getPageTitle = () => {
        let title = '';
        if (pageType === 'create') {
            title += 'New ';
        } else if (pageType === 'edit' || pageType === 'profile') {
            title += 'Edit ';
        }

        title += getMainPageTitle();

        return title;
    }

    return (
        <>
            <PageHeader
                title={getPageTitle()}
                hasSearch={false}
            />
            <PageContent>
                {
                    isLoading &&
                    <div className="text-center">
                        <Loading
                            loadingTitle={`${getMainPageTitle()} Medical Test...`}
                        />
                    </div>
                }

                {isLoading === false && typeof medicalTestInput !== "undefined" && medicalTestInput !== null && (
                    <form
                        method="post"
                        autoComplete="off"
                        encType="multipart/form-data"
                    >
                        <div className="grid gap-2 grid-cols-1 md:grid-cols-6">
                            <div className='md:ml-4 col-span-4'>
                                <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
                                    <Input
                                        label="Test Name"
                                        name="name"
                                        placeholder='Test Name'
                                        value={medicalTestInput.name}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                    <Input
                                        label="Minimum Age"
                                        name="min_age"
                                        placeholder='Minimum Age'
                                        value={medicalTestInput.min_age}
                                        type='number'
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                    <Input
                                        label="Maximum Age"
                                        name="max_age"
                                        placeholder='Maximum Age'
                                        type='number'
                                        value={medicalTestInput.max_age}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                    <Input
                                        label="Minimum Amount"
                                        name="min_amount"
                                        placeholder='Minimum Amount'
                                        type='number'
                                        value={medicalTestInput.min_amount}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                    <Input
                                        label="Maximum Amount"
                                        name="max_amount"
                                        placeholder='Maximum Amount'
                                        type='number'
                                        value={medicalTestInput.max_amount}
                                        inputChange={handleChangeTextInput}
                                    />
                                </div>
                            </div>

                        </div>

                        <Button
                            title='Save'
                            loadingTitle="Saving..."
                            onClick={(e) => onSubmit(e)}
                            loading={isSubmitting}
                        />
                    </form>
                )
                }
            </PageContent>
        </>
    )
}