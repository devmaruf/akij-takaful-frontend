import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from '@reduxjs/toolkit';

import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Input from '@/components/input';
import { changeProductInputValue, submitProductAction, updateProductAction } from '@/redux/actions/product-action';
import { formValidation } from '@/utils/formValidation';
import Loading from '@/components/loading';
import BankSelect from '@/components/banks/BankSelect';

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
                        <BankSelect
                            defaultValue={productInput.project_id}
                            changeTextInput={changeTextInput}
                        />
                        <Input
                            label="Product name"
                            name="name"
                            placeholder='Product name'
                            value={productInput?.name}
                            isRequired={true}
                            errors={errors}
                            inputChange={changeTextInput}
                        />
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
