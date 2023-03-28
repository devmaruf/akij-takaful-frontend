import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Input from '@/components/input';
import { Dispatch } from '@reduxjs/toolkit';
import Select from '@/components/select';
import { changeProductInputValue, submitProductAction, updateProductAction } from './../../redux/actions/product-action';
import { formValidation } from '@/utils/formValidation';
import { useState } from 'react';
import Loading from '@/components/loading';

interface IProductForm {
    productID: number;
    pageType: 'create' | 'edit';
    closeModal: any
}

export default function ProductForm({ productID, pageType, closeModal }: IProductForm) {

    const dispatch: Dispatch = useDispatch();
    const { productInput, isSubmitting, loadingDetails } = useSelector((state: RootState) => state.product);
    const { projectDropdownList } = useSelector((state: RootState) => state.Project);
    const [errors, setErrors] = useState({})

    const changeTextInput = (name: string, value: any) => {
        dispatch(changeProductInputValue(name, value));
    };

    const submitProduct = (e: any) => {
        const { errors, isValid } = formValidation(e);
        setErrors(errors);
        if (isValid) {
            if (pageType == "edit") {
                dispatch(updateProductAction(productInput, productID, closeModal));
            } else {
                dispatch(submitProductAction(productInput, closeModal));
            }
        }
        e.preventDefault();
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
                        <Input
                            label="Product Name"
                            name="name"
                            placeholder='Product Name'
                            value={productInput?.name}
                            isRequired={true}
                            errors={errors}
                            inputChange={changeTextInput}
                        />
                        <Select
                            options={projectDropdownList}
                            isSearchable={true}
                            name="project_id"
                            label="Project"
                            defaultValue={productInput?.project_id}
                            placeholder="Select Project..."
                            isRequired={true}
                            errors={errors}
                            handleChangeValue={changeTextInput}
                        />

                        <Button
                            title="Save"
                            position="text-right mt-2"
                            loadingTitle="Saving..."
                            loading={isSubmitting}
                        />
                    </form>
            }
        </div>
    );
}
