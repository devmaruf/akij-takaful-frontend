import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import { Dispatch } from "@reduxjs/toolkit";
import { useRouter } from "next/router";

import Input from "@/components/input";
import PageHeader from "@/components/layouts/PageHeader";
import Button from "@/components/button";
import { RootState } from "@/redux/store";
import { changeStampStockAllotmentInputValue } from "@/redux/actions/stamp-stock-action";
import { formatCurrency } from "@/utils/currency";
import { PageContent } from "@/components/layouts/PageContent";
import { getEmployeeDetails } from "@/redux/actions/employee-action";
import { getStampBalanceDetail, submitStockAllotment } from "@/redux/actions/stamp-allotment-action";
import Loading from "@/components/loading";
import { Toaster } from "@/components/toaster";

interface IEmployeeStampStockAllocateForm {
    employeeId: number;
}

export default function EmployeeStampStockAllocateForm({
    employeeId
}: IEmployeeStampStockAllocateForm) {
    const dispatch: Dispatch = useDispatch();
    const router = useRouter();
    const { employeeInput, isLoadingDetails } = useSelector((state: RootState) => state.employee);
    const { stampStockAllotmentForm, stampBalance, isLoadingBalance, isSubmitting } = useSelector((state: RootState) => state.stampStock);

    const onSubmit = (e: any) => {
        e.preventDefault();
        dispatch(submitStockAllotment(stampStockAllotmentForm, router));
    }

    const changeTextInput = (name: string, value: any) => {
        dispatch(changeStampStockAllotmentInputValue(name, value));
    };

    const getTotal = () => {
        let total = 0;
        if (stampStockAllotmentForm.qty_100 > 0) {
            total += stampStockAllotmentForm.qty_100 * 100;
        }
        if (stampStockAllotmentForm.qty_50 > 0) {
            total += stampStockAllotmentForm.qty_50 * 50;
        }
        if (stampStockAllotmentForm.qty_30 > 0) {
            total += stampStockAllotmentForm.qty_30 * 30;
        }
        if (stampStockAllotmentForm.qty_20 > 0) {
            total += stampStockAllotmentForm.qty_20 * 20;
        }
        if (stampStockAllotmentForm.qty_10 > 0) {
            total += stampStockAllotmentForm.qty_10 * 10;
        }
        if (stampStockAllotmentForm.qty_5 > 0) {
            total += stampStockAllotmentForm.qty_5 * 5;
        }

        return total;
    }

    const handleStampQtyInputValidation = (name: string, value: any) => {
        if (stampBalance[name] < value) {
            Toaster('error', 'Stamp qty should not be greater than balance.')
        } else {
            changeTextInput(name, value);
        }
    }

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getEmployeeDetails(employeeId, false));
            dispatch(getStampBalanceDetail());
            changeTextInput('employee_id', employeeId);
        }, 1000),
        [employeeId]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    return (
        <>
            <PageHeader
                title={`Allocate stamp For - ${employeeInput?.first_name}`}
                hasSearch={false}
            />

            <PageContent>
                {
                    (isLoadingBalance || isLoadingDetails) ?
                        <div className="text-center">
                            <Loading loadingTitle="Balance..." />
                        </div>
                        :
                        <form
                            method="post"
                            autoComplete="off"
                        >
                            <div className="flex flex-col md:flex-row">
                                <div className='basis-1/4'>
                                    <Input
                                        label="Employee name"
                                        name="employee_name"
                                        value={employeeInput.first_name}
                                        isRequired={true}
                                        inputChange={changeTextInput}
                                    />
                                </div>
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
                                        <div className="flex flex-row justify-center mb-3">
                                            <label htmlFor="qty_100" className='flex-1 mt-3 font-medium'>
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
                                                value={stampStockAllotmentForm?.qty_100}
                                                label=''
                                                placeholder='eg: 5'
                                                inputChange={handleStampQtyInputValidation}
                                                areaClassNames='flex-1'
                                                maxValue={stampBalance?.qty_100}
                                            />
                                            <Input
                                                isDisabled={true}
                                                value={stampStockAllotmentForm?.qty_100 > 0 ? parseInt(stampStockAllotmentForm?.qty_100 + '') * 100 : '0'}
                                                label=''
                                                areaClassNames='flex-1 ml-3'
                                            />
                                        </div>
                                        <div className="flex flex-row justify-center mb-3">
                                            <label htmlFor="qty_50" className='flex-1 mt-3 font-medium'>
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
                                                value={stampStockAllotmentForm?.qty_50}
                                                label=''
                                                placeholder='eg: 5'
                                                inputChange={handleStampQtyInputValidation}
                                                areaClassNames='flex-1'
                                                maxValue={stampBalance?.qty_50}
                                            />
                                            <Input
                                                isDisabled={true}
                                                value={stampStockAllotmentForm?.qty_50 > 0 ? parseInt(stampStockAllotmentForm?.qty_50 + '') * 50 : '0'}
                                                label=''
                                                areaClassNames='flex-1 ml-3'
                                            />
                                        </div>
                                        <div className="flex flex-row justify-center mb-3">
                                            <label htmlFor="qty_30" className='flex-1 mt-3 font-medium'>
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
                                                value={stampStockAllotmentForm?.qty_30}
                                                label=''
                                                placeholder='eg: 5'
                                                inputChange={handleStampQtyInputValidation}
                                                areaClassNames='flex-1'
                                                maxValue={stampBalance?.qty_30}
                                            />
                                            <Input
                                                isDisabled={true}
                                                value={stampStockAllotmentForm?.qty_30 > 0 ? parseInt(stampStockAllotmentForm?.qty_30 + '') * 30 : '0'}
                                                label=''
                                                areaClassNames='flex-1 ml-3'
                                            />
                                        </div>
                                        <div className="flex flex-row justify-center mb-3">
                                            <label htmlFor="qty_20" className='flex-1 mt-3 font-medium'>
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
                                                value={stampStockAllotmentForm?.qty_20}
                                                label=''
                                                placeholder='eg: 5'
                                                inputChange={handleStampQtyInputValidation}
                                                areaClassNames='flex-1'
                                                maxValue={stampBalance?.qty_20}
                                            />
                                            <Input
                                                isDisabled={true}
                                                value={stampStockAllotmentForm?.qty_20 > 0 ? parseInt(stampStockAllotmentForm?.qty_20 + '') * 20 : '0'}
                                                label=''
                                                areaClassNames='flex-1 ml-3'
                                            />
                                        </div>
                                        <div className="flex flex-row justify-center mb-3">
                                            <label htmlFor="qty_10" className='flex-1 mt-3 font-medium'>
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
                                                value={stampStockAllotmentForm?.qty_10}
                                                label=''
                                                placeholder='eg: 5'
                                                inputChange={handleStampQtyInputValidation}
                                                areaClassNames='flex-1'
                                                maxValue={stampBalance?.qty_10}
                                            />
                                            <Input
                                                isDisabled={true}
                                                value={stampStockAllotmentForm?.qty_10 > 0 ? parseInt(stampStockAllotmentForm?.qty_10 + '') * 10 : '0'}
                                                label=''
                                                areaClassNames='flex-1 ml-3'
                                            />
                                        </div>
                                        <div className="flex flex-row justify-center mb-3">
                                            <label htmlFor="qty_5" className='flex-1 mt-3 font-medium'>
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
                                                value={stampStockAllotmentForm?.qty_5}
                                                label=''
                                                placeholder='eg: 5'
                                                inputChange={handleStampQtyInputValidation}
                                                areaClassNames='flex-1'
                                            />
                                            <Input
                                                isDisabled={true}
                                                value={stampStockAllotmentForm?.qty_5 > 0 ? parseInt(stampStockAllotmentForm?.qty_5 + '') * 5 : '0'}
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
                                            title="Allocate"
                                            type='submit'
                                            onClick={(e: any) => onSubmit(e)}
                                            position="text-left"
                                            loadingTitle="Allocating..."
                                            loading={isSubmitting}
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                }
            </PageContent>
        </>
    )
}