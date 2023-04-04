import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Input from '@/components/input';
import { changeProductInputValue, submitProductAction, updateProductAction } from '@/redux/actions/product-action';
import { formValidation } from '@/utils/formValidation';
import Loading from '@/components/loading';
import ProductModeSelect from './ProductModeSelect';
import Link from 'next/link';
import { Alert } from 'flowbite-react';

interface IProductForm {
    productID: number;
    pageType: 'create' | 'edit';
    closeModal: any
}

export default function ProductForm({ productID, pageType, closeModal }: IProductForm) {
    const dispatch: Dispatch = useDispatch();
    const { productInput, isSubmitting, loadingDetails } = useSelector((state: RootState) => state.product);
    const [errors, setErrors] = useState({})

    const changeTextInput = (name: string, value: any) => {
        dispatch(changeProductInputValue(name, value));
    };

    const submitProduct = (e: any) => {
        e.preventDefault();
        const { errors, isValid } = formValidation(e);
        setErrors(errors);
        if (isValid) {
            if (pageType == "edit") {
                dispatch(updateProductAction(productInput, productID, closeModal));
            } else {
                dispatch(submitProductAction(productInput, closeModal));
            }
        }
    }

    const handleCSV = async (e) => {
        e.preventDefault();

        const file = e.target.files[0];
        const text = await file.text();

        const headers = text.slice(0, text.indexOf("\n")).split(",");
        const rows = text.slice(text.indexOf("\n") + 1).split("\n");

        const rates = rows.map((row) => {
            const values = row.split(",");
            return {
                age: parseInt(values[0]),
                term: parseInt(values[1]),
                rate: parseFloat(values[2])
            };
        });

        dispatch(changeProductInputValue('rates', rates));
    };

    return (
        <div>
            {
                loadingDetails === true ?
                    <div className='text-center'>
                        <Loading loadingTitle="Product" />
                    </div> :
                    <form
                        method="post"
                        autoComplete="off"
                        onSubmit={submitProduct}
                        noValidate
                    >
                        <Input
                            label="Product name"
                            name="name"
                            placeholder='eg: Product 01'
                            value={productInput?.name}
                            isRequired={true}
                            errors={errors}
                            inputChange={changeTextInput}
                        />
                        {
                            pageType === 'edit' &&
                            <Input
                                label="Product code"
                                name="code"
                                placeholder='eg: P001'
                                value={productInput?.code}
                                isRequired={true}
                                errors={errors}
                                inputChange={changeTextInput}
                            />
                        }
                        <ProductModeSelect
                            defaultValue={productInput.modes}
                            changeTextInput={changeTextInput}
                        />
                        <Input
                            type='checkbox'
                            label="Is DPS ?"
                            name="is_dps"
                            checked={productInput?.is_dps}
                            errors={errors}
                            inputChange={changeTextInput}
                        />
                        <>
                            <label
                                htmlFor={'rates_file'}
                                className="text-sm font-medium text-gray-900 block mb-2"
                            >
                                Product rate upload &nbsp;
                                {
                                    pageType === 'create' && <span className="text-red-600 text-base"> * </span>
                                }
                            </label>
                            <input
                                type='file'
                                name="rates_file"
                                value={productInput?.rates_file}
                                onChange={handleCSV}
                            />
                            {
                                productInput.rates.length > 0 &&
                                <Alert className='my-2'>
                                    {productInput.rates.length} entry selected.
                                </Alert>
                            }
                            <p className="text-gray-500 mt-1 text-xs">
                                Upload a .csv file with age, term and rate. <br />
                                <Link href={'/files/product-form-demo.csv'} className='text-blue-500'>
                                    <i className='bi bi-download'></i> Download demo file
                                </Link>
                            </p>
                        </>

                        <Button
                            title="Save"
                            position="text-right mt-4"
                            loadingTitle="Saving..."
                            loading={isSubmitting}
                        />
                    </form>
            }
        </div>
    );
}
