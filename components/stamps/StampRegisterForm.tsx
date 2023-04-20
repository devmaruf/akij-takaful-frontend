import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { debounce } from "lodash";

import PageHeader from '@/components/layouts/PageHeader';
import Button from '@/components/button';
import Input from '@/components/input';
import { RootState } from '@/redux/store';
import { changeStampInputValue, getStampsByProposalAction, submitProposalStampRegisterAction } from '@/redux/actions/stamp-register-action';
import { PageContent } from '@/components/layouts/PageContent';
import { Dispatch } from '@reduxjs/toolkit';
import { formatCurrency } from '@/utils/currency';
import { getStampBalanceDetail } from '@/redux/actions/stamp-allotment-action';
import { Toaster } from '@/components/toaster';
import { get28thDateOfCurrentMonth } from '@/utils/date-helper';
import StatusBadge from '@/components/badge/StatusBadge';

interface IStampForm {
    proposalNo: string;
    pageType: 'create' | 'edit';
}

export default function StampRegisterForm({ proposalNo }: IStampForm) {
    const dispatch: Dispatch = useDispatch();
    const router = useRouter();
    const { stampForm, isSubmitting, isSearching } = useSelector((state: RootState) => state.stamp);
    const { stampBalance, isLoadingBalance } = useSelector((state: RootState) => state.stampStock);

    const onSubmit = (e: any) => {
        e.preventDefault();
        dispatch(submitProposalStampRegisterAction(stampForm, router));
    }

    const onSearch = (e: any) => {
        e.preventDefault();
        dispatch(getStampsByProposalAction(stampForm.proposal_no));
        dispatch(getStampBalanceDetail());
    }

    const changeTextInput = (name: string, value: any) => {
        dispatch(changeStampInputValue(name, value, stampBalance));
    };

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getStampsByProposalAction(proposalNo));
            dispatch(getStampBalanceDetail());
        }, 1000),
        [proposalNo]
    );

    useEffect(() => {
        if (proposalNo?.length > 0) {
            debouncedDispatch();
            return debouncedDispatch.cancel;
        }
    }, [debouncedDispatch, proposalNo]);

    const handleStampQtyInputValidation = (name: string, value: any) => {
        if (stampBalance[name] < value) {
            Toaster('error', 'Stamp qty should not be greater than balance.')
        } else {
            changeTextInput(name, value);
        }
    }

    return (
        <div>
            <PageHeader
                title={'Stamp Register'}
                hasSearch={false}
                pageTitleRightSide={
                    stampForm?.is_duplicate ? <span>
                        <StatusBadge
                            left={<i className='bi bi-check-circle-fill mr-2 text-green-500'></i>}
                            status='Duplicate'
                        />
                    </span> : <></>
                }
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
                                iconRight={<i className='bi bi-search ml-2'></i>}
                            />
                            {
                                (!isLoadingBalance && !isSearching && stampForm.proposal_id > 0) ?
                                    <>
                                        <Input
                                            label="Bank"
                                            name="project_name"
                                            value={stampForm.project_name}
                                            isDisabled={true}
                                            placeholder=''
                                            areaClassNames='mt-3'
                                        />
                                        <Input
                                            label="Branch"
                                            name="branch_name"
                                            value={stampForm.branch_name}
                                            placeholder=''
                                            isDisabled={true}
                                        />
                                        <Input
                                            label="Sum assured"
                                            name="sum_assured"
                                            value={formatCurrency(stampForm.sum_assured)}
                                            placeholder=''
                                            isDisabled={true}
                                        />
                                        <Input
                                            label="Total Premium"
                                            name="total_premium"
                                            value={formatCurrency(stampForm.total_premium)}
                                            placeholder=''
                                            isDisabled={true}
                                        />
                                        <Input
                                            label="Stamp Used Tk."
                                            name="stamp_used_amount"
                                            value={formatCurrency(stampForm.stamp_used_amount)}
                                            isDisabled={true}
                                            areaClassNames={'bg-slate-200 text-red-500 p-3'}
                                        />
                                    </> :
                                    <></>
                            }
                        </div>

                        {
                            (!isLoadingBalance && !isSearching && stampForm.proposal_id > 0) ?
                                <div className='basis-3/4 relative'>
                                    <div className="flex flex-col md:flex-row mt-2 ml-2 md:ml-16 flex-wrap">
                                        <div className='basis-1/4'>
                                            Stamp category
                                        </div>
                                        <div className='basis-1/4'>
                                            Balance
                                        </div>
                                        <div className='basis-1/4'>
                                            Qty
                                        </div>
                                        <div className='basis-1/4'>
                                            Amount
                                        </div>
                                    </div>
                                    <div className='mt-2 ml-2 md:ml-10 shadow-md bg-white p-3'>
                                        <div className="flex flex-row justify-center mb-1">
                                            <label htmlFor="qty_100" className='flex-1 mt-2 font-medium'>
                                                {formatCurrency(100)}
                                            </label>
                                            <Input
                                                name='qty_100'
                                                value={stampBalance?.qty_100}
                                                label=''
                                                placeholder='eg: 5'
                                                areaClassNames='flex-1 mr-3'
                                                isDisabled={true}
                                            />
                                            <Input
                                                name='qty_100'
                                                type="number"
                                                minValue={0}
                                                value={stampForm?.qty_100}
                                                label=''
                                                placeholder='eg: 5'
                                                inputChange={handleStampQtyInputValidation}
                                                areaClassNames='flex-1'
                                                maxValue={stampBalance?.qty_100}
                                            />
                                            <Input
                                                isDisabled={true}
                                                value={formatCurrency(stampForm?.qty_100 > 0 ? parseInt(stampForm?.qty_100 + '') * 100 : '0')}
                                                label=''
                                                areaClassNames='flex-1 ml-3'
                                            />
                                        </div>
                                        <div className="flex flex-row justify-center mb-1">
                                            <label htmlFor="qty_50" className='flex-1 mt-2 font-medium'>
                                                {formatCurrency(50)}
                                            </label>
                                            <Input
                                                name='qty_50'
                                                value={stampBalance?.qty_50}
                                                label=''
                                                placeholder='eg: 5'
                                                areaClassNames='flex-1 mr-3'
                                                isDisabled={true}
                                            />
                                            <Input
                                                name='qty_50'
                                                type="number"
                                                minValue={0}
                                                value={stampForm?.qty_50}
                                                label=''
                                                placeholder='eg: 5'
                                                inputChange={handleStampQtyInputValidation}
                                                areaClassNames='flex-1'
                                                maxValue={stampBalance?.qty_50}
                                            />
                                            <Input
                                                isDisabled={true}
                                                value={formatCurrency(stampForm?.qty_50 > 0 ? parseInt(stampForm?.qty_50 + '') * 50 : '0')}
                                                label=''
                                                areaClassNames='flex-1 ml-3'
                                            />
                                        </div>
                                        <div className="flex flex-row justify-center mb-1">
                                            <label htmlFor="qty_30" className='flex-1 mt-2 font-medium'>
                                                {formatCurrency(30)}
                                            </label>
                                            <Input
                                                name='qty_30'
                                                value={stampBalance?.qty_30}
                                                label=''
                                                placeholder='eg: 5'
                                                areaClassNames='flex-1 mr-3'
                                                isDisabled={true}
                                            />
                                            <Input
                                                name='qty_30'
                                                type="number"
                                                minValue={0}
                                                value={stampForm?.qty_30}
                                                label=''
                                                placeholder='eg: 5'
                                                inputChange={handleStampQtyInputValidation}
                                                areaClassNames='flex-1'
                                                maxValue={stampBalance?.qty_30}
                                            />
                                            <Input
                                                isDisabled={true}
                                                value={formatCurrency(stampForm?.qty_30 > 0 ? parseInt(stampForm?.qty_30 + '') * 30 : '0')}
                                                label=''
                                                areaClassNames='flex-1 ml-3'
                                            />
                                        </div>
                                        <div className="flex flex-row justify-center mb-1">
                                            <label htmlFor="qty_20" className='flex-1 mt-2 font-medium'>
                                                {formatCurrency(20)}
                                            </label>
                                            <Input
                                                name='qty_20'
                                                value={stampBalance?.qty_20}
                                                label=''
                                                placeholder='eg: 5'
                                                areaClassNames='flex-1 mr-3'
                                                isDisabled={true}
                                            />
                                            <Input
                                                name='qty_20'
                                                type="number"
                                                minValue={0}
                                                value={stampForm?.qty_20}
                                                label=''
                                                placeholder='eg: 5'
                                                inputChange={handleStampQtyInputValidation}
                                                areaClassNames='flex-1'
                                                maxValue={stampBalance?.qty_20}
                                            />
                                            <Input
                                                isDisabled={true}
                                                value={formatCurrency(stampForm?.qty_20 > 0 ? parseInt(stampForm.qty_20 + '') * 20 : '0')}
                                                label=''
                                                areaClassNames='flex-1 ml-3'
                                            />
                                        </div>
                                        <div className="flex flex-row justify-center mb-1">
                                            <label htmlFor="qty_10" className='flex-1 mt-2 font-medium'>
                                                {formatCurrency(10)}
                                            </label>
                                            <Input
                                                name='qty_10'
                                                value={stampBalance?.qty_10}
                                                label=''
                                                placeholder='eg: 5'
                                                areaClassNames='flex-1 mr-3'
                                                isDisabled={true}
                                            />
                                            <Input
                                                name='qty_10'
                                                type="number"
                                                minValue={0}
                                                value={stampForm.qty_10}
                                                label=''
                                                placeholder='eg: 5'
                                                inputChange={handleStampQtyInputValidation}
                                                areaClassNames='flex-1'
                                                maxValue={stampBalance?.qty_10}
                                            />
                                            <Input
                                                isDisabled={true}
                                                value={formatCurrency(stampForm.qty_10 > 0 ? parseInt(stampForm.qty_10 + '') * 10 : '0')}
                                                label=''
                                                areaClassNames='flex-1 ml-3'
                                            />
                                        </div>
                                        <div className="flex flex-row justify-center mb-1">
                                            <label htmlFor="qty_5" className='flex-1 mt-2 font-medium'>
                                                {formatCurrency(5)}
                                            </label>
                                            <Input
                                                name='qty_5'
                                                value={stampBalance?.qty_5}
                                                label=''
                                                placeholder='eg: 5'
                                                areaClassNames='flex-1 mr-3'
                                                isDisabled={true}
                                            />
                                            <Input
                                                name='qty_5'
                                                type="number"
                                                minValue={0}
                                                maxValue={stampBalance?.qty_5}
                                                value={stampForm.qty_5}
                                                label=''
                                                placeholder='eg: 5'
                                                inputChange={handleStampQtyInputValidation}
                                                areaClassNames='flex-1'
                                            />
                                            <Input
                                                isDisabled={true}
                                                value={formatCurrency(stampForm.qty_5 > 0 ? parseInt(stampForm.qty_5 + '') * 5 : '0')}
                                                label=''
                                                areaClassNames='flex-1 ml-3'
                                            />
                                        </div>
                                    </div>
                                    <div className='my-6 ml-10'>
                                        <div className="flex flex-col md:flex-row">
                                            <Input
                                                isDisabled={true}
                                                name='opening_balance'
                                                value={formatCurrency(stampBalance.total)}
                                                label='Opening Balance'
                                                areaClassNames='flex-1 mr-2'
                                            />
                                            <div className='flex-1 flex flex-col md:flex-row'>
                                                <Input
                                                    type='date'
                                                    name='schedule_date'
                                                    value={stampForm.schedule_date}
                                                    label='Schedule date'
                                                    inputChange={changeTextInput}
                                                    areaClassNames='flex-1 mr-2'
                                                />
                                                <Input
                                                    isDisabled={true}
                                                    type='date'
                                                    name='businness_date'
                                                    value={get28thDateOfCurrentMonth()}
                                                    maxValue={get28thDateOfCurrentMonth()}
                                                    label='Business month'
                                                    inputChange={changeTextInput}
                                                    areaClassNames='flex-1'
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row">
                                            <Input
                                                isDisabled={true}
                                                value={formatCurrency(stampForm.stamp_used)}
                                                label='Stamp Used Tk.'
                                                areaClassNames='flex-1 mr-4'
                                            />
                                            <Input
                                                isDisabled={true}
                                                value={formatCurrency(stampForm.balance)}
                                                label='Balanced Tk.'
                                                areaClassNames='flex-1'
                                            />
                                        </div>

                                        <Input
                                            type='textarea'
                                            name='remarks'
                                            value={stampForm.remarks}
                                            label='Remarks'
                                            inputChange={changeTextInput}
                                            rows={2}
                                        />
                                    </div>
                                    <div className='mt-4 ml-10'>
                                        <Button
                                            title="Register"
                                            type='submit'
                                            onClick={(e: any) => onSubmit(e)}
                                            position="text-left"
                                            loadingTitle="Registering..."
                                            loading={isSubmitting}
                                        />
                                    </div>
                                </div>
                                :
                                <></>
                        }
                    </div>
                </form>
            </PageContent>
        </div>
    );
}
