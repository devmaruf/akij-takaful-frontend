import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Dispatch } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import { changeStampStockInputValue, getStampStockDetail, submitStampStockAction } from '@/redux/actions/stamp-stock-action';
import PageHeader from '@/components/layouts/PageHeader';
import Button from '@/components/button';
import Input from '@/components/input';
import { PageContent } from '@/components/layouts/PageContent';
import { formatCurrency } from '@/utils/currency';
import BankSelect from '@/components/banks/BankSelect';
import Select from '@/components/select';
import { useDebounced } from '@/hooks/use-debounce';
import { getBranchDropdownList } from '@/redux/actions/branch-action';
import { debounce } from 'lodash';
import { useCallback, useEffect } from 'react';

interface IStampStockForm {
    id: number;
    pageType: 'create' | 'edit';
}

export default function StampStockForm({ id, pageType }: IStampStockForm) {
    const dispatch: Dispatch = useDispatch();
    const router = useRouter();

    const { branchDropdownList } = useSelector((state: RootState) => state.Branch);
    const { stampStockForm, isSubmitting } = useSelector((state: RootState) => state.stampStock);

    const onSubmit = (e: any) => {
        e.preventDefault();
        dispatch(submitStampStockAction(stampStockForm, router, id));
    }

    const changeTextInput = (name: string, value: any) => {
        dispatch(changeStampStockInputValue(name, value));
    };

    useDebounced(() => {
        dispatch(getBranchDropdownList());
    });

    const getTotal = () => {
        let total = 0;
        if (stampStockForm.qty_100 > 0) {
            total += stampStockForm.qty_100 * 100;
        }
        if (stampStockForm.qty_50 > 0) {
            total += stampStockForm.qty_50 * 50;
        }
        if (stampStockForm.qty_30 > 0) {
            total += stampStockForm.qty_30 * 30;
        }
        if (stampStockForm.qty_20 > 0) {
            total += stampStockForm.qty_20 * 20;
        }
        if (stampStockForm.qty_10 > 0) {
            total += stampStockForm.qty_10 * 10;
        }
        if (stampStockForm.qty_5 > 0) {
            total += stampStockForm.qty_5 * 5;
        }

        return total;
    }

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getStampStockDetail(id));
        }, 1000),
        [id]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    return (
        <div>
            <PageHeader
                title={pageType === 'create' ? 'New stamp stock' : 'Edit stamp stock'}
                hasSearch={false}
            />

            <PageContent>
                <form
                    method="post"
                    autoComplete="off"
                >
                    <div className="flex flex-col md:flex-row">
                        <div className='basis-1/4'>
                            <Input
                                label="Challan no"
                                name="challan_no"
                                value={stampStockForm.challan_no}
                                isRequired={true}
                                inputChange={changeTextInput}
                            />
                            <BankSelect
                                defaultValue={stampStockForm.project_id}
                                changeTextInput={changeTextInput}
                            />
                            <Select
                                options={branchDropdownList}
                                isSearchable={false}
                                name="branch_id"
                                label="Branch"
                                defaultValue={stampStockForm?.branch_id}
                                placeholder="Select Branch..."
                                isRequired={true}
                                handleChangeValue={changeTextInput}
                            />
                            <Input
                                type='date'
                                label="Purchase date"
                                name="purchase_date"
                                value={stampStockForm.purchase_date}
                                isRequired={true}
                                inputChange={changeTextInput}
                            />
                            <Input
                                type='date'
                                label="Receive date"
                                name="receive_date"
                                value={stampStockForm.receive_date}
                                isRequired={true}
                                inputChange={changeTextInput}
                            />
                        </div>
                        <div className='basis-3/4 relative'>
                            <div className='mt-2 ml-2 md:ml-10 shadow-md bg-white p-3'>
                                <div className="flex flex-row justify-center mb-3">
                                    <label htmlFor="qty_100" className='flex-1 mt-3 font-medium'>
                                        Stamp of {formatCurrency(100)}
                                    </label>
                                    <Input
                                        name='qty_100'
                                        value={stampStockForm?.qty_100}
                                        label=''
                                        placeholder='eg: 5'
                                        inputChange={(name: string, value: any) => changeTextInput(name, value)}
                                        areaClassNames='flex-1'
                                    />
                                    <Input
                                        isDisabled={true}
                                        value={stampStockForm?.qty_100 > 0 ? parseInt(stampStockForm?.qty_100) * 100 : '0'}
                                        label=''
                                        areaClassNames='flex-1 ml-3'
                                    />
                                </div>
                                <div className="flex flex-row justify-center mb-3">
                                    <label htmlFor="qty_50" className='flex-1 mt-3 font-medium'>
                                        Stamp of {formatCurrency(50)}
                                    </label>
                                    <Input
                                        name='qty_50'
                                        value={stampStockForm?.qty_50}
                                        label=''
                                        placeholder='eg: 5'
                                        inputChange={(name: string, value: any) => changeTextInput(name, value)}
                                        areaClassNames='flex-1'
                                    />
                                    <Input
                                        isDisabled={true}
                                        value={stampStockForm?.qty_50 > 0 ? parseInt(stampStockForm?.qty_50) * 50 : '0'}
                                        label=''
                                        areaClassNames='flex-1 ml-3'
                                    />
                                </div>
                                <div className="flex flex-row justify-center mb-3">
                                    <label htmlFor="qty_30" className='flex-1 mt-3 font-medium'>
                                        Stamp of {formatCurrency(30)}
                                    </label>
                                    <Input
                                        name='qty_30'
                                        value={stampStockForm?.qty_30}
                                        label=''
                                        placeholder='eg: 5'
                                        inputChange={(name: string, value: any) => changeTextInput(name, value)}
                                        areaClassNames='flex-1'
                                    />
                                    <Input
                                        isDisabled={true}
                                        value={stampStockForm?.qty_30 > 0 ? parseInt(stampStockForm?.qty_30) * 30 : '0'}
                                        label=''
                                        areaClassNames='flex-1 ml-3'
                                    />
                                </div>
                                <div className="flex flex-row justify-center mb-3">
                                    <label htmlFor="qty_20" className='flex-1 mt-3 font-medium'>
                                        Stamp of {formatCurrency(20)}
                                    </label>
                                    <Input
                                        name='qty_20'
                                        value={stampStockForm?.qty_20}
                                        label=''
                                        placeholder='eg: 5'
                                        inputChange={(name: string, value: any) => changeTextInput(name, value)}
                                        areaClassNames='flex-1'
                                    />
                                    <Input
                                        isDisabled={true}
                                        value={stampStockForm?.qty_20 > 0 ? parseInt(stampStockForm?.qty_20) * 20 : '0'}
                                        label=''
                                        areaClassNames='flex-1 ml-3'
                                    />
                                </div>
                                <div className="flex flex-row justify-center mb-3">
                                    <label htmlFor="qty_10" className='flex-1 mt-3 font-medium'>
                                        Stamp of {formatCurrency(10)}
                                    </label>
                                    <Input
                                        name='qty_10'
                                        value={stampStockForm?.qty_10}
                                        label=''
                                        placeholder='eg: 5'
                                        inputChange={(name: string, value: any) => changeTextInput(name, value)}
                                        areaClassNames='flex-1'
                                    />
                                    <Input
                                        isDisabled={true}
                                        value={stampStockForm?.qty_10 > 0 ? parseInt(stampStockForm?.qty_10) * 10 : '0'}
                                        label=''
                                        areaClassNames='flex-1 ml-3'
                                    />
                                </div>
                                <div className="flex flex-row justify-center mb-3">
                                    <label htmlFor="qty_5" className='flex-1 mt-3 font-medium'>
                                        Stamp of {formatCurrency(5)}
                                    </label>
                                    <Input
                                        name='qty_5'
                                        value={stampStockForm?.qty_5}
                                        label=''
                                        placeholder='eg: 5'
                                        inputChange={(name: string, value: any) => changeTextInput(name, value)}
                                        areaClassNames='flex-1'
                                    />
                                    <Input
                                        isDisabled={true}
                                        value={stampStockForm?.qty_5 > 0 ? parseInt(stampStockForm?.qty_5) * 5 : '0'}
                                        label=''
                                        areaClassNames='flex-1 ml-3'
                                    />
                                </div>
                                <div className="flex flex-row justify-center mb-3">
                                    <label htmlFor="total" className='flex-1 mt-3 font-medium'>
                                        Total
                                    </label>
                                    <Input
                                        isDisabled={true}
                                        value={getTotal()}
                                        label=''
                                        areaClassNames='flex-1 ml-3'
                                    />
                                </div>
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
                    </div>
                </form>
            </PageContent>
        </div>
    );
}
