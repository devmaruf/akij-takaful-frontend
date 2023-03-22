import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { debounce } from "lodash";

import { RootState } from '@/redux/store';
import { changeStampInputValue, getStampsByProposalAction, submitStampAction } from '@/redux/actions/stamp-action';
import PageHeader from '@/components/layouts/PageHeader';
import Button from '@/components/button';
import Input from '@/components/input';
import { PageContent } from '@/components/layouts/PageContent';
import { Dispatch } from '@reduxjs/toolkit';
import { IStamp } from '@/redux/interfaces';
import { defaultStampValue } from '@/redux/reducers/stamp-reducer';

interface IStampForm {
    proposalNo: string;
    pageType: 'create' | 'edit';
}

export default function StampForm({ proposalNo, pageType }: IStampForm) {
    console.log('proposalNo', proposalNo);

    const dispatch: Dispatch = useDispatch();
    const router = useRouter();
    const { stampForm, isSubmitting, isSearching } = useSelector((state: RootState) => state.stamp);

    const onSubmit = (e: any) => {
        e.preventDefault();
        dispatch(submitStampAction(stampForm, router));
    }

    const onSearch = (e: any) => {
        e.preventDefault();
        dispatch(getStampsByProposalAction(stampForm.proposal_no));
    }

    const changeTextInput = (name: string, value: any, index = -1) => {
        if (index >= 0) {
            const stampsInputData = [
                ...stampForm.stamps.slice(0, index),
                { ...stampForm.stamps[index], [name]: value },
                ...stampForm.stamps.slice(index + 1)
            ]
            dispatch(changeStampInputValue('stamps', stampsInputData));
        } else {
            dispatch(changeStampInputValue(name, value));
        }
    };

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getStampsByProposalAction(proposalNo));
        }, 1000),
        []
    );

    useEffect(() => {
        if (proposalNo?.length > 0) {
            debouncedDispatch();
            return debouncedDispatch.cancel;
        }
    }, [debouncedDispatch, proposalNo]);

    const addNewDemoStamp = () => {
        dispatch(changeStampInputValue('stamps', [
            ...stampForm.stamps,
            defaultStampValue
        ]));
    }

    const deleteStamp = (index: number) => {
        dispatch(changeStampInputValue('stamps', [
            ...stampForm.stamps.slice(0, index),
            ...stampForm.stamps.slice(index + 1)
        ]));
    }

    return (
        <div>
            <PageHeader
                title={pageType === 'create' ? 'New stamp' : 'Edit stamp'}
                hasSearch={false}
                headerRightSide=<></>
            />

            <PageContent>
                <form
                    method="post"
                    autoComplete="off"
                >
                    <div className="flex flex-col md:flex-row">
                        <div className='basis-1/4'>
                            <Input
                                label="Search by proposal no"
                                name="proposal_no"
                                placeholder='eg: ATLI-20230101-10'
                                isDisabled={stampForm.proposal_id > 0}
                                value={stampForm.proposal_no ?? proposalNo}
                                isRequired={true}
                                inputChange={changeTextInput}
                            />
                            <Button
                                title="Search now"
                                type='button'
                                onClick={onSearch}
                                position="text-left"
                                loadingTitle="Searching..."
                                loading={isSearching}
                            />
                        </div>
                        {
                            stampForm.proposal_id > 0 &&
                            <div className='basis-3/4 relative'>
                                <div className='mt-2 ml-2 md:ml-10 shadow-md bg-white p-3'>
                                    <table className='w-full'>
                                        <thead>
                                            <tr>
                                                <th className='p-3 text-left'>Stamp Name</th>
                                                <th className='p-3 text-left'>
                                                    <div className="flex justify-between">
                                                        <div>
                                                            Stamp Value
                                                        </div>
                                                        <div>
                                                            <Button type='button' title='+' onClick={addNewDemoStamp} />
                                                        </div>
                                                    </div>
                                                </th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                stampForm.stamps.map((stamp: IStamp, index: number) => (
                                                    <tr key={index}>
                                                        <td className='px-2 py-1'>
                                                            <Input
                                                                name='name'
                                                                value={stamp?.name}
                                                                label=''
                                                                placeholder='eg: Stamp 1'
                                                                inputChange={(name: string, value: any) => changeTextInput(name, value, index)}
                                                            />
                                                        </td>
                                                        <td className='px-2 py-1'>
                                                            <Input
                                                                type='number'
                                                                name='value'
                                                                value={stamp?.value}
                                                                label=''
                                                                placeholder='eg: 10'
                                                                inputChange={(name: string, value: any) => changeTextInput(name, value, index)}
                                                            />
                                                        </td>
                                                        <td>
                                                            <button onClick={() => deleteStamp(index)}>
                                                                <i className='bi bi-trash text-red-500 cursor-pointer'></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className='mt-4 ml-10'>
                                    <Button
                                        title="Save"
                                        type='submit'
                                        onClick={(e: any) => onSubmit(e)}
                                        position="text-left"
                                        loadingTitle="Saving..."
                                        loading={isSubmitting}
                                    />
                                </div>
                            </div>
                        }
                    </div>
                </form>
            </PageContent>
        </div>
    );
}
