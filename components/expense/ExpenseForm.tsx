import { useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import { debounce } from "lodash";

import { RootState } from '@/redux/store';
import PageHeader from '@/components/layouts/PageHeader';
import Button from '@/components/button';
import Input from '@/components/input';
import { PageContent } from '@/components/layouts/PageContent';
import { IExpense } from '@/redux/interfaces';
import { defaultExpenseForm } from '@/redux/reducers/expense-reducer';
import Loading from '@/components/loading';
import Select from '@/components/select';
import { getExpenseTypeDropdownList, changeExpenseInputValue, submitExpenseAction, getExpenseDetails, updateExpenseAction } from '@/redux/actions/expense-action';
import { formValidation } from '@/utils/formValidation';
import { useDebounced } from '@/hooks/use-debounce';
import { formatCurrency } from '@/utils/currency';

interface IExpenseForm {
    expenseID: number | string;
    pageType: 'create' | 'edit';
}

export default function ExpenseForm({ expenseID, pageType, }: IExpenseForm) {

    const dispatch: Dispatch = useDispatch();
    const router = useRouter();
    const { expenseTypeDropdownList, expenseInput, isSubmitting, loadingDetails } = useSelector((state: RootState) => state.expense);
    const [errors, setErrors] = useState({})

    const onSubmitExpense = (e: any) => {
        const { errors, isValid } = formValidation(e);
        setErrors(errors);
        if (isValid) {
            if (pageType == "edit") {
                dispatch(updateExpenseAction(expenseInput, expenseID, router));
            } else {
                dispatch(submitExpenseAction(expenseInput, router));
            }
        }
        e.preventDefault();
    }
    const changeTextInput = (name: string, value: any, index = -1) => {
        if (index >= 0) {
            const expenseInputData = [
                ...expenseInput.items.slice(0, index),
                { ...expenseInput.items[index], [name]: value },
                ...expenseInput.items.slice(index + 1)
            ]
            dispatch(changeExpenseInputValue('items', expenseInputData));
        } else {
            dispatch(changeExpenseInputValue(name, value));
        }
    };

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getExpenseDetails(expenseID));
        }, 1000),
        [expenseID]
    );

    useEffect(() => {
        if (typeof expenseID !== "undefined" && pageType == "edit") {
            debouncedDispatch();
            return debouncedDispatch.cancel;
        }
    }, [debouncedDispatch, expenseID, pageType]);

    const addNewDemoExpense = () => {
        dispatch(changeExpenseInputValue('items', [
            ...expenseInput.items,
            defaultExpenseForm
        ]));
    }

    const deleteExpenseItem = (index: number) => {
        dispatch(changeExpenseInputValue('items', [
            ...expenseInput.items.slice(0, index),
            ...expenseInput.items.slice(index + 1)
        ]));
    }

    useDebounced(() => {
        dispatch(getExpenseTypeDropdownList());
    });

    const getGrandTotal = () => {
        let total = 0;
        expenseInput.items.forEach(item => {
            if (item.item_quantity > 0 && item?.item_unit_amount > 0) {
                total += parseFloat(item.item_quantity) * parseFloat(item.item_unit_amount)
            }
        });

        return total;
    }

    return (
        <div>
            <PageHeader
                title={pageType === 'create' ? 'New Expense' : 'Edit Expense'}
                hasSearch={false}
                headerRightSide=<></>
            />

            <PageContent>
                {
                    loadingDetails === true ?
                        <div className='text-center'>
                            <Loading loadingTitle="Expense" />
                        </div> :
                        <form
                            method="post"
                            autoComplete="off"
                            onSubmit={onSubmitExpense}
                            noValidate
                        >

                            <div className='mt-2'>
                                <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
                                    <Select
                                        options={expenseTypeDropdownList}
                                        isSearchable={true}
                                        name="expense_type_id"
                                        label="Expense Type"
                                        defaultValue={expenseInput?.expense_type_id}
                                        placeholder="Select Expense Type..."
                                        isRequired={true}
                                        errors={errors}
                                        handleChangeValue={changeTextInput}
                                    />
                                    <Input
                                        label="Expense Title"
                                        name="name"
                                        placeholder='eg: Medical expense for ...'
                                        value={expenseInput?.name}
                                        isRequired={true}
                                        errors={errors}
                                        inputChange={changeTextInput}
                                    />
                                </div>

                                <div className='mt-2'>
                                    <div className="border border-gray-100 rounded-md">
                                        <div className='flex justify-between items-center text-gray-600 bg-gray-100 px-3 py-2 rounded-md'>
                                            <label>Expense Items</label>
                                            <Button type='button' title='+' onClick={addNewDemoExpense} />
                                        </div>
                                        {
                                            expenseInput.items.map((expense: IExpense, index: number) => (
                                                <div className='grid gap-2 grid-cols-1 md:grid-cols-4 border-b p-2' key={index + 1}>
                                                    <Input
                                                        label={index === 0 ? "Item Name" : ''}
                                                        name="item_name"
                                                        placeholder={`eg: Item ${index + 1}`}
                                                        value={expense?.item_name}
                                                        isRequired={false}
                                                        errors={errors}
                                                        inputChange={(name: string, value: any) => changeTextInput(name, value, index)}
                                                    />
                                                    <Input
                                                        label={index === 0 ? "Quantity" : ''}
                                                        name="item_quantity"
                                                        placeholder='eg: 1'
                                                        value={expense.item_quantity}
                                                        isRequired={false}
                                                        errors={errors}
                                                        inputChange={(name: string, value: any) => changeTextInput(name, value, index)}
                                                    />
                                                    <Input
                                                        label={index === 0 ? "Unit Amount" : ''}
                                                        name="item_unit_amount"
                                                        placeholder='eg: 100'
                                                        value={expense.item_unit_amount}
                                                        isRequired={false}
                                                        errors={errors}
                                                        inputChange={(name: string, value: any) => changeTextInput(name, value, index)}
                                                    />
                                                    <div className="flex justify-between items-center">
                                                        <div className={expenseInput.items.length > 1 ? 'basis-11/12' : 'basis-full'}>
                                                            <Input
                                                                label={index === 0 ? "Subtotal" : ''}
                                                                name="grand_total"
                                                                value={
                                                                    expense?.item_quantity > 0 && expense?.item_unit_amount > 0 ?
                                                                        parseFloat(expense.item_quantity) * parseFloat(expense.item_unit_amount)
                                                                        : 0
                                                                }
                                                                placeholder='0'
                                                                isDisabled={true}
                                                                isRequired={false}
                                                            />
                                                        </div>
                                                        {
                                                            expenseInput.items.length > 1 &&
                                                            <div className="basis-1/12 text-center">
                                                                <button type='button' onClick={() => deleteExpenseItem(index)}>
                                                                    <i className='bi bi-trash text-red-500 cursor-pointer'></i>
                                                                </button>
                                                            </div>
                                                        }
                                                    </div>
                                                </div>
                                            ))
                                        }
                                        <div className='text-right p-4'>
                                            <h5>
                                                Requested amount &nbsp;&nbsp;
                                                <input
                                                    type="number"
                                                    required={true}
                                                    value={getGrandTotal()}
                                                    disabled
                                                    className='bg-slate-100 border-0'
                                                />
                                            </h5>
                                            {
                                                pageType === 'edit' &&
                                                <h5 className='my-2'>
                                                    Approved Amount &nbsp;&nbsp;
                                                    <input
                                                        type="number"
                                                        required={true}
                                                        value={expenseInput?.approved_amount}
                                                        className='bg-slate-100 border-0'
                                                        max={getGrandTotal()}
                                                        onChange={e => changeTextInput('approved_amount', e.target.value)}
                                                    />
                                                </h5>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='ml-auto'>
                                <Button
                                    title="Save"
                                    position="text-right mt-2"
                                    loadingTitle="Saving..."
                                    loading={isSubmitting}
                                />
                            </div>
                        </form>
                }

            </PageContent>
        </div>
    );
}
