import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Input from '@/components/input';
import Select from '@/components/select';
import { getProjectListDropdown } from '@/redux/actions/project-action';
import { changeInputValue, submitBranch } from '@/redux/actions/branch-action';

interface IBranchForm {
    setShowModal: (showModal: boolean) => void;
    onSubmit: (e: any, pageType: string) => void;
    pageType: 'add' | 'edit';
}

export default function BranchForm({ setShowModal, pageType, onSubmit }: IBranchForm) {
    const dispatch = useDispatch();
    const { branchInput, isSubmitting } = useSelector((state: RootState) => state.Branch);
    const { projectDropdownList } = useSelector((state: RootState) => state.Project);

    useEffect(() => {
        dispatch(getProjectListDropdown());
    }, [dispatch]);

    const changeTextInput = (name: string, value: any) => {
        dispatch(changeInputValue(name, value));
    };

    return (
        <form
            method="post"
            autoComplete="off"
        >
            <Select
                options={projectDropdownList}
                isSearchable={true}
                name="project_id"
                label="Bank"
                defaultValue={branchInput.project_id}
                placeholder='Select Bank...'
                handleChangeValue={changeTextInput}
            />
            <Input
                label="Branch name"
                name="name"
                placeholder='Branch name'
                value={branchInput.name}
                isRequired={true}
                inputChange={changeTextInput}
            />
            <Input
                type='textarea'
                label="Branch address"
                name="address"
                placeholder='Branch address'
                value={branchInput.address}
                isRequired={false}
                inputChange={changeTextInput}
            />
            <div className="mt-4">
                <Button
                    title="Save"
                    onClick={(e: any) => onSubmit(e, pageType)}
                    position="text-left"
                    loadingTitle="Saving..."
                    loading={isSubmitting}
                />
            </div>
        </form>
    )
}