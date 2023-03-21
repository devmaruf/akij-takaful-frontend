import React, { useEffect, useState } from 'react';
import { Label, ToggleSwitch } from 'flowbite-react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import Input from '@/components/input';
import Button from '@/components/button';
import { RootState } from '@/redux/store';
import { getUnderwritingConfigurationsAction, setUnderwritingConfigurationsAction } from '@/redux/actions/underwriting-action';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContent } from '@/components/layouts/PageContent';
import { IUnderwritingRequirement, IUnderwritingType } from '@/redux/interfaces';

export function UnderwritingCreate({ id }: { id: number }) {
    const dispatch: Dispatch = useDispatch();
    const { isLoading, configurations } = useSelector((state: RootState) => state.underwriting);
    const [acceptedStandardRateFor, setAcceptedStandardRateFor] = useState({
        hi: '0',
        ci: '0',
        pdab: '0',
        diab: '0',
    });
    const [acceptedEm, setAcceptedEm] = useState({
        em_life: '',
        em_hi: '',
        em_ci: '',
        em_pdab: '',
        em_diab: '',
        em_total: '',
        em_total_preimum: '',
    });

    useEffect(() => {
        dispatch(getUnderwritingConfigurationsAction(id));
    }, [dispatch, id]);

    const onSubmit = (e: any) => {
        e.preventDefault();
    }

    const needsNewLineInput = (type: IUnderwritingType): boolean => {
        return (type.code === 'questionnaires' || type.code === 'Decisions');
    }

    const changeRequirement = (
        type: IUnderwritingType,
        requirement: IUnderwritingRequirement,
        e: any
    ) => {
        dispatch(setUnderwritingConfigurationsAction(type, requirement, e, configurations));
    }

    const changeAcceptedStandardRateFor = (name: string, value: any) => {
        const acceptedStandardRateForUpdate = {
            ...acceptedStandardRateFor
        };

        acceptedStandardRateForUpdate[name] = value;

        setAcceptedStandardRateFor(acceptedStandardRateForUpdate);
    }

    const changeAcceptedEm = (name: string, value: any) => {
        let acceptedEmUpdated = {
            ...acceptedEm
        };

        acceptedEmUpdated[name] = value;

        acceptedEmUpdated = getAcceptedEmUpdatedTotal(acceptedEmUpdated);

        setAcceptedEm(acceptedEmUpdated);
    }

    const getAcceptedEmUpdatedTotal = (acceptedEmValue: any) => {
        const acceptedEmUpdated = {
            ...acceptedEmValue
        };

        const sumAtRisk = 20;

        const totalAccepted: number = parseInt(acceptedEm.em_life) ?? 0 +
            parseInt(acceptedEm.em_hi) ?? 0 +
            parseInt(acceptedEm.em_ci) ?? 0 +
            parseInt(acceptedEm.em_pdab) ?? 0 +
            parseInt(acceptedEm.em_diab) ?? 0;

        // (((2.03+2.03)*xxx%)*Sum at risk)/1000
        const totalEm = (((2.03 + 2.03) * (totalAccepted / 100)) * sumAtRisk) / 1000;

        acceptedEmUpdated['em_total'] = parseFloat((totalEm + '')).toFixed(2);

        return acceptedEmUpdated;
    }

    return (
        <div>
            <PageHeader
                title="Requirement and Documents"
                hasSearch={false}
            />

            <PageContent>
                {
                    isLoading ?
                        <Loading loadingTitle="Requirement and Documents" />
                        :
                        <form method="post" autoComplete="off">

                            {
                                configurations.map((type: IUnderwritingType) => (
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
                                                                    <div className="flex items-center mb-4" key={requirement.id}>
                                                                        <input
                                                                            id={`default-checkbox-${requirement.id}-hi`}
                                                                            type="checkbox"
                                                                            value=""
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            onChange={(e) => changeAcceptedStandardRateFor('hi', e.target.checked ? 1 : 0)}
                                                                            checked={parseInt(acceptedStandardRateFor.hi) === 1}
                                                                        />
                                                                        <label htmlFor={`default-checkbox-${requirement.id}-hi`} className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">
                                                                            HI
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex items-center mb-4" key={requirement.id}>
                                                                        <input
                                                                            id={`default-checkbox-${requirement.id}-ci`}
                                                                            type="checkbox"
                                                                            value=""
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            onChange={(e) => changeAcceptedStandardRateFor('ci', e.target.checked ? 1 : 0)}
                                                                            checked={parseInt(acceptedStandardRateFor.ci) === 1}
                                                                        />
                                                                        <label htmlFor={`default-checkbox-${requirement.id}-ci`} className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">
                                                                            CI
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex items-center mb-4" key={requirement.id}>
                                                                        <input
                                                                            id={`default-checkbox-${requirement.id}-pdab`}
                                                                            type="checkbox"
                                                                            value=""
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            onChange={(e) => changeAcceptedStandardRateFor('pdab', e.target.checked ? 1 : 0)}
                                                                            checked={parseInt(acceptedStandardRateFor.pdab) === 1}
                                                                        />
                                                                        <label htmlFor={`default-checkbox-${requirement.id}-pdab`} className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">
                                                                            PDAB
                                                                        </label>
                                                                    </div>
                                                                    <div className="flex items-center mb-4" key={requirement.id}>
                                                                        <input
                                                                            id={`default-checkbox-${requirement.id}-diab`}
                                                                            type="checkbox"
                                                                            value=""
                                                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                                            onChange={(e) => changeAcceptedStandardRateFor('diab', e.target.checked ? 1 : 0)}
                                                                            checked={parseInt(acceptedStandardRateFor.diab) === 1}
                                                                        />
                                                                        <label htmlFor={`default-checkbox-${requirement.id}-hi`} className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">
                                                                            DIAB
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
                                                                        value={acceptedEm.em_life}
                                                                        isRequired={true}
                                                                        inputChange={changeAcceptedEm}
                                                                    />
                                                                    <Input
                                                                        type='number'
                                                                        label="EM for HI (%)"
                                                                        name="em_hi"
                                                                        placeholder='eg: 10'
                                                                        value={acceptedEm.em_hi}
                                                                        isRequired={true}
                                                                        inputChange={changeAcceptedEm}
                                                                    />
                                                                    <Input
                                                                        type='number'
                                                                        label="EM for CI (%)"
                                                                        name="em_ci"
                                                                        placeholder='eg: 20'
                                                                        value={acceptedEm.em_ci}
                                                                        isRequired={true}
                                                                        inputChange={changeAcceptedEm}
                                                                    />
                                                                    <Input
                                                                        type='number'
                                                                        label="EM for PDAB (%)"
                                                                        name="em_pdab"
                                                                        placeholder='eg: 30'
                                                                        value={acceptedEm.em_pdab}
                                                                        isRequired={true}
                                                                        inputChange={changeAcceptedEm}
                                                                    />
                                                                    <Input
                                                                        type='number'
                                                                        label="EM for DIAB (%)"
                                                                        name="em_diab"
                                                                        placeholder='eg: 30'
                                                                        value={acceptedEm.em_diab}
                                                                        isRequired={true}
                                                                        inputChange={changeAcceptedEm}
                                                                    />
                                                                    <Input
                                                                        type='number'
                                                                        label="Total EM"
                                                                        placeholder=''
                                                                        value={acceptedEm.em_total}
                                                                        isRequired={true}
                                                                        isDisabled={true}
                                                                    />
                                                                    <Input
                                                                        type='number'
                                                                        label="Total premium"
                                                                        value={acceptedEm.em_total_preimum}
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
                            <div>
                                <div className="flex">
                                    <Button title='Approve' position='text-right' customClass='mr-2' loadingTitle="Approving..." onClick={(e: any) => onSubmit(e)} loading={false} />
                                    <Button title='Reject' position='text-right' customClass='bg-red-500 mr-2' loadingTitle="Rejecting..." onClick={(e: any) => onSubmit(e)} loading={false} />
                                    <Button title='Message to Agent' position='text-right' customClass='bg-blue-500 mr-2' loadingTitle="Messaging..." onClick={(e: any) => onSubmit(e)} loading={false} />
                                </div>
                            </div>
                        </form>
                }
            </PageContent>
        </div>
    );
}
