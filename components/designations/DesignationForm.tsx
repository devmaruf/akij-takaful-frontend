import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Input from '@/components/input';
import { Dispatch } from '@reduxjs/toolkit';
import Select from '@/components/select';
import { changeInputValue, submitDesignationAction, updateDesignationAction } from './../../redux/actions/designation-action';
import { formValidation } from '@/utils/formValidation';
import { useState } from 'react';
import Loading from '@/components/loading';

interface IProductForm {
    designationID: number;
    pageType: 'create' | 'edit';
    closeModal: any
}

export default function DesignationForm({ designationID, pageType, closeModal }: IProductForm) {

    const dispatch: Dispatch = useDispatch();
    const { designationInput, isSubmitting, isLoadingDetails } = useSelector((state: RootState) => state.designation);
    const [errors, setErrors] = useState({})

    const changeTextInput = (name: string, value: any) => {
        dispatch(changeInputValue(name, value));
    };

    const submitDesignation = (e: any) => {
        const { errors, isValid } = formValidation(e);
        setErrors(errors);
        if (isValid) {
            if (pageType == "edit") {
                dispatch(updateDesignationAction(designationInput, designationID, closeModal));
            } else {
                dispatch(submitDesignationAction(designationInput, closeModal));
            }
        }
        e.preventDefault();
    }

    return (
        <div>
            {
                isLoadingDetails === true ?
                    <div className='text-center'>
                        <Loading loadingTitle="Designation"/>
                    </div> :
                    <form
                        method="post"
                        autoComplete="off"
                        onSubmit={submitDesignation}
                        noValidate
                    >
                        <Input
                            label="Designation Name"
                            name="name"
                            placeholder='Designation Name'
                            value={designationInput?.name}
                            isRequired={true}
                            errors={errors}
                            inputChange={changeTextInput}
                        />
                        <Input
                            label="Designation Code"
                            name="code"
                            placeholder='Designation Code'
                            value={designationInput?.code}
                            isRequired={true}
                            errors={errors}
                            inputChange={changeTextInput}
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
