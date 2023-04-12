import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Label, ToggleSwitch } from 'flowbite-react';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import Input from '@/components/input';
import Button from '@/components/button';
import { RootState } from '@/redux/store';
import { changeUnderwritingInputAction, getUnderwritingByProposalAction, setUnderwritingConfigurationsAction, submitUnderwritingAction } from '@/redux/actions/underwriting-action';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContent } from '@/components/layouts/PageContent';
import { IUnderwritingRequirement, IUnderwritingType } from '@/redux/interfaces';
import { CustomUnderwritingMessage } from './CustomMessage';

export function UnderwritingCreate({ id }: { id: number }) {
    const router = useRouter();
    const dispatch: Dispatch = useDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    const { isLoading, underwritingForm, isApproving } = useSelector((state: RootState) => state.underwriting);

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getUnderwritingByProposalAction(id));
        }, 500),
        [id]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    const onSubmit = (e: any, status: string = 'approved') => {
        e.preventDefault();

        if (status === 'custom_message') {
            setShowModal(true);
        } else {
            const formSubmitData = {
                ...underwritingForm,
                status,
            }
            dispatch(submitUnderwritingAction(formSubmitData, router, underwritingForm));
        }
    }

    const needsNewLineInput = (type: IUnderwritingType): boolean => {
        return (type.code === 'questionnaires' || type.code === 'Decisions');
    }

    const changeRequirement = (
        type: IUnderwritingType,
        requirement: IUnderwritingRequirement,
        e: any
    ) => {
        dispatch(setUnderwritingConfigurationsAction(type, requirement, e, underwritingForm.types));
    }

    const changeUnderwritingInput = (name: string, value: any) => {
        dispatch(changeUnderwritingInputAction(name, value, {
            ...underwritingForm,
            [name]: value
        }));
    }

    const changeUnderwritingInputSub = (parentName: string, name: string, value: any) => {
        const parentInputData = {
            ...underwritingForm[parentName],
        };
        parentInputData[name] = value;
        changeUnderwritingInput(parentName, parentInputData);
    }

    return (
        <div>
            <PageHeader
                title="Requirement and Documents"
                hasSearch={false}
            />

            <CustomUnderwritingMessage
                showModal={showModal}
                setShowModal={(value) => setShowModal(value)}
                onSubmit={(e) => onSubmit(e, "add")}
            />

            <PageContent>
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle="Requirement and Documents" />
                        </div>
                        :
                        <form method="post" autoComplete="off">
                            {
                                underwritingForm !== undefined &&
                                underwritingForm.types.map((type: IUnderwritingType) => (
                                    <div key={type.id} className='mb-3'>
                                        <h2 className='font-bold my-2'>{type.name_en}</h2>

                                        {
                                            typeof type.requirements !== 'undefined' && type.requirements.length > 0 &&
                                            <div
                                                className={
                                                    needsNewLineInput(type) ? '' : `grid gap-2 grid-cols-1 md:grid-cols-3`
                                                }
                                                key={type.code}
                                            >
                                                {
                                                    type.requirements.map((requirement: IUnderwritingRequirement) => (
                                                        <div key={requirement.code}>
                                                            {
                                                                requirement.input_type === 'checkbox' &&
                                                                <div className="flex items-center mb-4" key={requirement.id}>
                                                                    <input
                                                                        id={`default-checkbox-${requirement.id}`}
                                                                        type="checkbox"
                                                                        value=""
                                                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                        onChange={(e) => changeRequirement(type, requirement, e)}
                                                                        checked={parseInt(requirement.value) === 1}
                                                                    />
                                                                    <label htmlFor={`default-checkbox-${requirement.id}`} className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">
                                                                        {requirement.requirement_name_en}
                                                                    </label>
                                                                </div>
                                                            }
                                                            {
                                                                requirement.input_type === 'switch' &&
                                                                <Label>
                                                                    <div className="flex flex-row px-4 border-b border-slate-200 pb-3 mb-2">
                                                                        <p className="basis-4/5">
                                                                            {requirement.requirement_name_en}
                                                                        </p>
                                                                        <div>
                                                                            <ToggleSwitch
                                                                                className="basis-1/5"
                                                                                checked={parseInt(requirement?.value) === 1}
                                                                                label=""
                                                                                onChange={(e) => changeRequirement(type, requirement, e)}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </Label>
                                                            }
                                                            {
                                                                requirement.code === 'accepted_standard_rate_for' &&
                                                                <div className='pl-0 md:pl-7'>
                                                                    <div className="flex items-center mb-4" key={`default-checkbox-${requirement.id}-hi`}>
                                                                        <input
                                                                            id={`default-checkbox-${requirement.id}-hi`}
                                                                            type="checkbox"
                                                                            value=""
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            onChange={(e) => changeUnderwritingInputSub('accepted_standard_rate_for', 'hi', e.target.checked ? 1 : 0)}
                                                                            checked={parseInt(underwritingForm.accepted_standard_rate_for?.hi) === 1}
                                                                        />
                                                                        <label htmlFor={`default-checkbox-${requirement.id}-hi`} className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">
                                                                            HI
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex items-center mb-4" key={`default-checkbox-${requirement.id}-ci`}>
                                                                        <input
                                                                            id={`default-checkbox-${requirement.id}-ci`}
                                                                            type="checkbox"
                                                                            value=""
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            onChange={(e) => changeUnderwritingInputSub('accepted_standard_rate_for', 'ci', e.target.checked ? 1 : 0)}
                                                                            checked={parseInt(underwritingForm.accepted_standard_rate_for?.ci) === 1}
                                                                        />
                                                                        <label htmlFor={`default-checkbox-${requirement.id}-ci`} className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">
                                                                            CI
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex items-center mb-4" key={`default-checkbox-${requirement.id}-pdab`}>
                                                                        <input
                                                                            id={`default-checkbox-${requirement.id}-pdab`}
                                                                            type="checkbox"
                                                                            value=""
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            onChange={(e) => changeUnderwritingInputSub('accepted_standard_rate_for', 'pdab', e.target.checked ? 1 : 0)}
                                                                            checked={parseInt(underwritingForm.accepted_standard_rate_for?.pdab) === 1}
                                                                        />
                                                                        <label htmlFor={`default-checkbox-${requirement.id}-pdab`} className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">
                                                                            AD&D
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex items-center mb-4" key={`default-checkbox-${requirement.id}-diab`}>
                                                                        <input
                                                                            id={`default-checkbox-${requirement.id}-diab`}
                                                                            type="checkbox"
                                                                            value=""
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            onChange={(e) => changeUnderwritingInputSub('accepted_standard_rate_for', 'diab', e.target.checked ? 1 : 0)}
                                                                            checked={parseInt(underwritingForm.accepted_standard_rate_for?.diab) === 1}
                                                                        />
                                                                        <label htmlFor={`default-checkbox-${requirement.id}-hi`} className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">
                                                                            ADB
                                                                        </label>
                                                                    </div>
                                                                </div>
                                                            }
                                                            {
                                                                requirement.code === 'accepted_em' &&
                                                                <div className='grid gap-2 grid-cols-1 md:grid-cols-4 pl-0 md:pl-7'>
                                                                    <Input
                                                                        type='number'
                                                                        label="EM for life (%)"
                                                                        name="em_life"
                                                                        placeholder='eg: 10'
                                                                        value={underwritingForm.em_life}
                                                                        isRequired={true}
                                                                        inputChange={changeUnderwritingInput}
                                                                    />
                                                                    <Input
                                                                        type='number'
                                                                        label="EM for HI (%)"
                                                                        name="em_hi"
                                                                        placeholder='eg: 10'
                                                                        value={underwritingForm.em_hi}
                                                                        isRequired={true}
                                                                        inputChange={changeUnderwritingInput}
                                                                    />
                                                                    <Input
                                                                        type='number'
                                                                        label="EM for CI (%)"
                                                                        name="em_ci"
                                                                        placeholder='eg: 20'
                                                                        value={underwritingForm.em_ci}
                                                                        isRequired={true}
                                                                        inputChange={changeUnderwritingInput}
                                                                    />
                                                                    <Input
                                                                        type='number'
                                                                        label="EM for AD&D (%)"
                                                                        name="em_pdab"
                                                                        placeholder='eg: 30'
                                                                        value={underwritingForm.em_pdab}
                                                                        isRequired={true}
                                                                        inputChange={changeUnderwritingInput}
                                                                    />
                                                                    <Input
                                                                        type='number'
                                                                        label="EM for ADB (%)"
                                                                        name="em_diab"
                                                                        placeholder='eg: 30'
                                                                        value={underwritingForm.em_diab}
                                                                        isRequired={true}
                                                                        inputChange={changeUnderwritingInput}
                                                                    />
                                                                    <Input
                                                                        type='number'
                                                                        label="Total EM"
                                                                        placeholder=''
                                                                        value={underwritingForm.total_em}
                                                                        isRequired={true}
                                                                        isDisabled={true}
                                                                    />
                                                                    <Input
                                                                        type='number'
                                                                        label="Total premium"
                                                                        value={underwritingForm.total_premium}
                                                                        placeholder=''
                                                                        isRequired={true}
                                                                        isDisabled={true}
                                                                    />
                                                                </div>
                                                            }
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        }

                                    </div>
                                ))
                            }
                            <div className='mt-20'>
                                <div className="flex">
                                    <Button
                                        title='Approve'
                                        position='text-right'
                                        customClass='mr-2'
                                        loadingTitle="Approving..."
                                        onClick={(e: any) => onSubmit(e, 'approve')}
                                        loading={isApproving}
                                    />
                                    <Button title='Reject' position='text-right' customClass='bg-red-500 mr-2' loadingTitle="Rejecting..." onClick={(e: any) => onSubmit(e, 'reject')} loading={false} />
                                    <Button title='Message to Agent' position='text-right' customClass='bg-blue-500 mr-2' loadingTitle="Messaging..." onClick={(e: any) => onSubmit(e, 'custom_message')} loading={false} />
                                </div>
                            </div>
                        </form>
                }
            </PageContent>
        </div>
    );
}
