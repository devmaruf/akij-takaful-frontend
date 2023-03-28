import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Input from '@/components/input';
import Select from '@/components/select';
import { getProjectListDropdown } from '@/redux/actions/project-action';
import { changeInputValue, submitBranch } from '@/redux/actions/branch-action';

export default function Create({ setShowModal }) {

    const dispatch = useDispatch();
    const { branchInput, isSubmitting } = useSelector((state: RootState) => state.Branch);
    const { projectDropdownList } = useSelector((state: RootState) => state.Project);

    React.useEffect(() => {
        dispatch(getProjectListDropdown());
    }, [dispatch]);

    const changeTextInput = (name: string, value: any) => {
        dispatch(changeInputValue(name, value));
    };

    const onSubmit = (e: any) => {
        dispatch(submitBranch(branchInput, setShowModal));
        e.preventDefault();
    }

    return (
        <form
            method="post"
            autoComplete="off"
        >
            <Input
                label="Branch name"
                name="name"
                placeholder='Branch name'
                value={branchInput.name}
                isRequired={true}
                inputChange={changeTextInput}
            />
            <Input
                label="Branch code"
                name="code"
                placeholder='Branch code'
                value={branchInput.code}
                isRequired={true}
                inputChange={changeTextInput}
            />

            <Select
                options={projectDropdownList}
                isSearchable={true}
                name="project_id"
                label="Bank"
                defaultValue={branchInput.project_id}
                placeholder='Select Bank...'
                handleChangeValue={changeTextInput}
            />

            <div className="mt-2">
                <Button
                    title="Save"
                    onClick={(e) => onSubmit(e)}
                    position="text-left"
                    loadingTitle="Saving..."
                    loading={isSubmitting}
                />
            </div>
        </form>
    )
}