import { useEffect } from 'react';
import { useRouter } from 'next/router';
import IBreadcrumb from '@/components/breadcrumb';
import PageTitle from '@/components/pageTitle';
import Input from '@/components/input';
import Select from '@/components/select';
import Button from '@/components/button';
import { RootState } from '@/redux/store';
import { useDispatch, useSelector } from 'react-redux';
import { getBranchDropdownList } from '@/redux/actions/branch-action';
import { changeInputValue, createEmployee, getEmployeeRolesDropdownList } from '@/redux/actions/employee-action';
import { getProjectListDropdown } from '@/redux/actions/project-action';
import { getDesignationDropdownList } from '@/redux/actions/designation-action';

export default function Create() {
    const router = useRouter();
    const dispatch = useDispatch();
    const { projectDropdownList } = useSelector((state: RootState) => state.Project);
    const { designationDropdownList } = useSelector((state: RootState) => state.designation);
    const { branchDropdownList } = useSelector((state: RootState) => state.Branch);
    const { employeeInput, isSubmitting, rolesDropdownList } = useSelector((state: RootState) => state.employee);

    useEffect(() => {
        dispatch(getProjectListDropdown());
        dispatch(getDesignationDropdownList());
        dispatch(getBranchDropdownList());
        dispatch(getEmployeeRolesDropdownList());
    }, [dispatch])


    const handleChangeTextInput = (name: string, value: any) => {
        if (name === "branch_ids") {
            const branchIDs = value.map(option => option.value);
            dispatch(changeInputValue(name, branchIDs));
        } else {
            dispatch(changeInputValue(name, value));
        }
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch(createEmployee(employeeInput, router));
    }

    return (
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
            <div className="mb-1 w-full">
                <div className="mb-4">
                    <IBreadcrumb />
                    <PageTitle title="create employee" />
                </div>

                <div className="mt-2">
                    <div className='border border-gray-200 p-2.5 rounded-md shadow-md'>
                        <form
                            method="post"
                            autoComplete="off"
                            encType="multipart/form-data"
                        >
                            <div className="grid gap-2 grid-cols-1 md:grid-cols-6">
                                <div className="col-span-2">
                                    <label htmlFor={''} className="text-sm font-medium text-gray-900 block mb-2">Employee Photo</label>
                                    <div className="flex items-center justify-center w-full">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 1MB)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden" />
                                        </label>
                                    </div>
                                </div>


                                <div className='md:ml-4 col-span-4'>
                                    <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
                                        <Input
                                            label="First Name"
                                            name="first_name"
                                            placeholder='First Name'
                                            value={employeeInput.first_name}
                                            isRequired={true}
                                            inputChange={handleChangeTextInput}
                                        />
                                        <Input
                                            label="Last Name"
                                            name="last_name"
                                            placeholder='Last Name'
                                            value={employeeInput.last_name}
                                            isRequired={true}
                                            inputChange={handleChangeTextInput}
                                        />
                                        <Input
                                            label="Email"
                                            name="email"
                                            placeholder='Email'
                                            type='email'
                                            value={employeeInput.email}
                                            isRequired={true}
                                            inputChange={handleChangeTextInput}
                                        />
                                        <Input
                                            label="Phone"
                                            name="phone"
                                            placeholder='Phone'
                                            type='number'
                                            value={employeeInput.phone}
                                            isRequired={true}
                                            inputChange={handleChangeTextInput}
                                        />
                                        <Select
                                            options={designationDropdownList}
                                            isSearchable={true}
                                            name="designation_id"
                                            label="Designation"
                                            defaultValue=""
                                            placeholder='Select Designation...'
                                            handleChangeValue={handleChangeTextInput}
                                        />
                                        <Select
                                            options={projectDropdownList}
                                            isSearchable={true}
                                            name="project_id"
                                            label="Bank"
                                            defaultValue=""
                                            placeholder='Select Bank...'
                                            handleChangeValue={handleChangeTextInput}
                                        />
                                        <Select
                                            options={branchDropdownList}
                                            isSearchable={false}
                                            name="branch_ids"
                                            isMulti={true}
                                            label="Branch"
                                            defaultValue=""
                                            placeholder='Select branch...'
                                            handleChangeValue={handleChangeTextInput}
                                        />
                                        <Select
                                            options={rolesDropdownList}
                                            isSearchable={false}
                                            name="role_id"
                                            label="Assign Role"
                                            defaultValue=""
                                            placeholder='Select role...'
                                            handleChangeValue={handleChangeTextInput}
                                        />

                                        <Input
                                            label="Password"
                                            name="password"
                                            placeholder='Password'
                                            type='password'
                                            value={employeeInput.password}
                                            isRequired={true}
                                            inputChange={handleChangeTextInput}
                                        />
                                    </div>
                                </div>

                            </div>

                            <Button title='Save' loadingTitle="Saving..." onClick={(e) => onSubmit(e)} loading={isSubmitting} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}