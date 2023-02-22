import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import IBreadcrumb from '@/components/breadcrumb';
import PageTitle from '@/components/pageTitle';
import Button from '@/components/button';
import { RootState } from '@/redux/store';
import { getUnderwritingConfigurationsAction } from '@/redux/actions/underwriting-action';
import Loading from '@/components/loading';

export function UnderwritingCreate() {
    const dispatch = useDispatch();
    const { isLoading, configurations } = useSelector((state: RootState) => state.underwriting);

    useEffect(() => {
        dispatch(getUnderwritingConfigurationsAction());
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
            <div className="mb-1 w-full">
                <div className="mb-4">
                    <IBreadcrumb />
                    <PageTitle title="Requirement and Documents" />
                </div>

                <div className="mt-2">
                    <div className='border border-gray-200 p-2.5 rounded-md shadow-md'>
                        {
                            isLoading ?
                                <Loading loadingTitle="Requirement and Documents" />
                                :
                                <form method="post" autoComplete="off">

                                    {
                                        configurations.map((type: any) => (
                                            <div key={type.id} className='mb-3'>
                                                <h2 className='font-bold my-2'>{type.name_en}</h2>

                                                {
                                                    typeof type.requirements !== 'undefined' && type.requirements.length > 0 &&
                                                    <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">
                                                        {
                                                            type.requirements.map((requirement: any) => (
                                                                <div className="flex items-center mb-4" key={requirement.id}>
                                                                    <input id={`default-checkbox-${requirement.id}`} type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                                    <label htmlFor={`default-checkbox-${requirement.id}`} className="ml-2 text-sm font-normal text-gray-600 dark:text-gray-300">
                                                                        {requirement.requirement_name_en}
                                                                    </label>
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
                                            <Button title='Approve' position='text-right' customClass='mr-2' loadingTitle="Approving..." onClick={(e) => onSubmit(e)} loading={false} />
                                            <Button title='Reject' position='text-right' customClass='bg-red-500 mr-2' loadingTitle="Rejecting..." onClick={(e) => onSubmit(e)} loading={false} />
                                            <Button title='Message to Agent' position='text-right' customClass='bg-blue-500 mr-2' loadingTitle="Messaging..." onClick={(e) => onSubmit(e)} loading={false} />
                                        </div>
                                    </div>
                                </form>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
