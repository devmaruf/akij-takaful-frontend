import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import Breadcrumb from '@/components/breadcrumb';
import Loading from '@/components/loading';
import Button from '@/components/button';
import Input from '@/components/input';
import { RootState } from '@/redux/store';
import { checkPermissionGroupAction, emptyRoleStatusMessage, getPermissionGroups, roleCheckboxSelect, allCheckboxSelected, changeRoleInputAction, storeRoleAction } from '@/redux/actions/role-action';

const RolePermissionCreate = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { inputData, isLoading } = useSelector((state: RootState) => state.role);

    useEffect(() => {
        dispatch(emptyRoleStatusMessage());
        dispatch(getPermissionGroups());
    }, []);

    const roleCheck = (e, permissionGroup, item, indexChild, permissionGroupIndex) => {
        let checkboxStatus = e.target.checked;
        dispatch(roleCheckboxSelect(checkboxStatus, permissionGroup, item, indexChild, permissionGroupIndex));
    }

    const checkPermissionGroup = (e, index, checkboxStatus) => {
        dispatch(checkPermissionGroupAction(index, checkboxStatus));
    }

    const allChecked = (e) => {
        let checkStausCheck = e.target.checked;
        dispatch(allCheckboxSelected(checkStausCheck, inputData));
    }

    const changeRoleInput = (name: string, value: any) => {
        dispatch(changeRoleInputAction(name, value));
    }

    const onFormSubmit = (e: any) => {
        e.preventDefault();
        dispatch(storeRoleAction(inputData, router));
    }

    return (
        <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
            <div className="mb-1 w-full">
                <div className="mb-4">
                    <Breadcrumb />
                </div>
                {
                    isLoading && <Loading loadingTitle="Role List...." />
                }
                <div className="mt-2">
                    <div className='border border-gray-200 p-2.5 rounded-md shadow-md'>
                        <form method="post" autoComplete="off">
                            <div className="">
                                <Input
                                    label="Role name"
                                    name="role"
                                    placeholder="Give a role name"
                                    value={inputData.role}
                                    isRequired={true}
                                    inputChange={changeRoleInput}
                                />
                                {
                                    inputData.groupList.length > 0 &&
                                    <div className="flex items-center my-3">
                                        <label className="text-sm font-medium text-gray-900 mr-8">Permissions</label>
                                        <input id="all_permission_checked" onChange={allChecked} type="checkbox" value="" className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2 mr-2" />
                                        <label htmlFor="all_permission_checked" className="text-sm font-medium text-gray-900">All</label>
                                    </div>
                                }
                            </div>
                            <div>
                                {
                                    inputData.groupList.length > 0 && inputData.groupList.map((permissionGroup: any, permissionGroupIndex: any) => (
                                        <div className='flex' key={permissionGroupIndex}>
                                            <div className="basis-full md:basis-2/12">
                                                <div className="flex items-center my-3">
                                                    <input
                                                        id={`group-${permissionGroupIndex}`}
                                                        checked={permissionGroup.isChecked}
                                                        type="checkbox"
                                                        onClick={(e) => checkPermissionGroup(e, permissionGroupIndex, permissionGroup.isChecked ? false : true)}
                                                        className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2 mr-2"
                                                    />
                                                    <label htmlFor={`group-${permissionGroupIndex}`} className="text-sm font-medium text-gray-900">{permissionGroup.name}</label>
                                                </div>
                                            </div>
                                            <div className="basis-full md:basis-10/12 grid gap-2 grid-cols-1 md:grid-cols-4 border-b py-2">
                                                {
                                                    permissionGroup && permissionGroup.permissions.length > 0 && permissionGroup.permissions.map((permission: any, indexChild: any) => (
                                                        <div className="flex items-center my-2" key={indexChild}>
                                                            <input
                                                                id={`group-child-${permission.name}`}
                                                                checked={permission.isChecked}
                                                                type="checkbox"
                                                                className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2 mr-2"
                                                                onClick={(e) => roleCheck(e, permissionGroup, permission, indexChild, permissionGroupIndex)}
                                                            />
                                                            <label htmlFor={`group-child-${permission.name}`} className="text-sm font-medium text-gray-900">{permission.printName}</label>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ))}
                            </div>

                            <Button onClick={onFormSubmit} title='Save' loadingTitle="Saving..." loading={isLoading} customClass='my-3' />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RolePermissionCreate;
