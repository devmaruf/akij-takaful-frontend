import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Alert } from 'flowbite-react';
import { Dispatch } from '@reduxjs/toolkit';
import Link from 'next/link';

import { RootState } from '@/redux/store';
import { changeProductInputValue, submitProductAction, updateProductAction } from '@/redux/actions/product-action';
import { formValidation } from '@/utils/formValidation';
import { Toaster } from '@/components/toaster';
import Loading from '@/components/loading';
import Button from '@/components/button';
import Input from '@/components/input';
import ProductModeSelect from '@/components/products/ProductModeSelect';

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

    const handleCSV = async (e: any) => {
        e.preventDefault();

        const file = e.target.files[0];
        const text = await file.text();

        const headers = text.slice(0, text.indexOf("\n")).split(",");
        console.table('headers', headers);
        const rates: { age: number; term: number; rate: number; }[] = [];

        if (typeof headers[1] === 'string') {
            headers.forEach((term: string, index: number) => {
                if (index > 0) {
                    const ageWithRates = text.slice(text.indexOf("\n") + 1).split("\n");
                    term = parseInt(term.replace('\r', ''));

                    if (!isNaN(parseInt(term))) {
                        ageWithRates.forEach((ageAndRate: string) => {
                            const rows = ageAndRate.split(",");
                            const age = parseInt(rows[0]);

                            rows.forEach((rate: number, indexAge: number) => {
                                if (indexAge > 0) {
                                    rate = parseFloat(rate);

                                    if (!isNaN(rate) && !isNaN(age)) {
                                        rates.push({
                                            age,
                                            term,
                                            rate
                                        });
                                    }
                                }
                            });
                        });
                    }
                }
            });

            dispatch(changeProductInputValue('rates', rates));
            return;
        }

        Toaster('error', 'The CSV format is not valid.');
        return;
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

                        <div className='flex flex-col md:flex-row'>
                            <Input
                                type='checkbox'
                                label="Is DPS"
                                name="is_dps"
                                checked={productInput?.is_dps}
                                errors={errors}
                                inputChange={changeTextInput}
                                areaClassNames="flex-1"
                            />

                            <Input
                                type='checkbox'
                                label="Show ADB & AD&D"
                                name="is_adb_enabled"
                                checked={productInput?.is_adb_enabled}
                                errors={errors}
                                inputChange={changeTextInput}
                                areaClassNames="flex-1"
                            />

                            <Input
                                type='checkbox'
                                label="Is Child Health"
                                name="is_child_health"
                                checked={productInput?.is_child_health}
                                errors={errors}
                                inputChange={changeTextInput}
                                areaClassNames="flex-1"
                            />
                        </div>

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
