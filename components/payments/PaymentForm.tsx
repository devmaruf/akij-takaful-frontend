import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import Loading from '@/components/loading';
import Button from '@/components/button';
import Input from '@/components/input';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContent } from '@/components/layouts/PageContent';
import { useDebounced } from '@/hooks/use-debounce';
import { getDesignationDropdownList } from '@/redux/actions/designation-action';
import { getBranchDropdownList } from '@/redux/actions/branch-action';
import { changeInputValue, createEmployee, getEmployeeDetails, getEmployeeRolesDropdownList, updateEmployee } from '@/redux/actions/employee-action';
import Select from '@/components/select';
import BankSelect from '@/components/banks/BankSelect';

interface IPaymentForm {
    id: number;
    pageType: 'create' | 'edit' | 'profile';
    isAgent?: boolean;
}

export default function PaymentForm({ id, pageType, isAgent = false }: IPaymentForm) {
    const router = useRouter();
    const dispatch = useDispatch();
    const defaultPassword = 'AKIJTakaful@$@123';

    const { designationDropdownList } = useSelector((state: RootState) => state.designation);
    const { branchDropdownList } = useSelector((state: RootState) => state.Branch);
    const { employeeInput, isSubmitting, isLoadingDetails, rolesDropdownList } = useSelector((state: RootState) => state.employee);

    useDebounced(() => {
        dispatch(getDesignationDropdownList());
        dispatch(getBranchDropdownList());
        dispatch(getEmployeeRolesDropdownList(isAgent));
    });

    const debouncedDispatch = useCallback(
        debounce(() => {
            if (id > 0) {
                dispatch(getEmployeeDetails(id, isAgent));
            }
        }, 500),
        [id, isAgent]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    const handleChangeTextInput = (name: string, value: any) => {
        dispatch(changeInputValue(name, value));
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        const formattedInputObject = {
            ...employeeInput,
            branch_ids: employeeInput.branch_ids.map(branch => branch.value)
        }

        if (pageType === 'create') {
            dispatch(createEmployee(formattedInputObject, router, isAgent));
        } else {
            dispatch(updateEmployee(formattedInputObject, router, pageType, isAgent));
        }
    }

    const getMainPageTitle = () => {

        return 'Payment';
    }

    const getPageTitle = () => {
        let title = '';
        if (pageType === 'create') {
            title += 'New ';
        } else if (pageType === 'edit' || pageType === 'profile') {
            title += 'Edit ';
        }

        title += getMainPageTitle();

        return title;
    }

    return (
        <>
            <PageHeader
                title={getPageTitle()}
                hasSearch={false}
            />
            <PageContent>
                {
                    isLoadingDetails &&
                    <div className="text-center">
                        <Loading
                            loadingTitle={`${getMainPageTitle()} Details...`}
                        />
                    </div>
                }

                {isLoadingDetails === false && typeof employeeInput !== "undefined" && employeeInput !== null && (
                    <form
                        method="post"
                        autoComplete="off"
                        encType="multipart/form-data"
                    >
                        <div className="grid gap-2 grid-cols-1 md:grid-cols-6">
                            {/* <div className="col-span-2">
                                <label htmlFor={''} className="text-sm font-medium text-gray-900 block mb-2">
                                    {pageType === 'profile' ? 'Profile' : 'Employee'} Photo
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">PNG or JPG (MAX. 1MB)</p>
                                        </div>
                                        <input id="dropzone-file" name='avatar' type="file" className="hidden" />
                                    </label>
                                </div>
                            </div> */}

                            <div className='md:ml-4 col-span-4'>
                                
                            </div>

                        </div>

                        <Button
                            title='Pay Now'
                            loadingTitle="Loading..."
                            onClick={(e) => onSubmit(e)}
                            loading={isSubmitting}
                        />
                    </form>
                )
                }
            </PageContent>
        </>
    )
}