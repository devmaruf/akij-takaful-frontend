import { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Breadcrumb from '@/components/breadcrumb';
import Button from '@/components/button';
import Input from '@/components/input';
import { RootState } from '@/redux/store';
import { checkPermissionGroupAction, emptyRoleStatusMessage, getPermissionGroups, roleCheckboxSelect, allCheckboxSelected, AddRolePermissionInput } from '@/redux/actions/role-action';

import Loading from '@/components/loading';

const RolePermissionCreate = () => {

    const dispatch = useDispatch();
    const { inputData, isLoading, isRoleCreated, roleCreateMessage, roleInput } = useSelector((state: RootState) => state.role);

    useEffect(() => {
        dispatch(emptyRoleStatusMessage());
        dispatch(getPermissionGroups());
    }, [])

    const roleCheck = ( e,   parentRole,    item,  indexChild, indexparentRole ) => {
        let checkboxStatus = e.target.checked
        dispatch(roleCheckboxSelect(checkboxStatus, parentRole, item, indexChild, indexparentRole));
    }

    const checkPermissionGroup = (e, index, checkboxStatus) => {
        dispatch(checkPermissionGroupAction(index, checkboxStatus));
    }

    const allChecked = (e) => {
        let checkStausCheck = e.target.checked;
        dispatch(allCheckboxSelected(checkStausCheck));
    }

    useEffect(() => {
        if (isRoleCreated) {
            dispatch(emptyRoleStatusMessage());
            // history.push('/role-permission/list');
        }
    }, [isRoleCreated, roleCreateMessage]);


    const addRolePermission = (name: string, value: any) => {
        dispatch(AddRolePermissionInput(name, value));
    }

    
    // const onSubmit = () => {
    // 	dispatch(storeRoleAction(roleInput));
    // }

    return (
        <div>

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
                            <form
                                method="post"
                                autoComplete="off"
                                encType="multipart/form-data"
                            >
                                <div className="">
                                    <Input
                                        label="Role Name"
                                        name="proposal_no"
                                        placeholder="Search by Role Name"
                                        value={inputData.role}
                                        isRequired={false}
                                        inputChange={addRolePermission}
                                    />
                                    <div className="flex items-center my-3">
                                        <label className="text-sm font-medium text-gray-900 mr-8">Permission</label>
                                        <input id="same_as_parmanent" type="checkbox" value="" className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2 mr-2" />
                                        <label htmlFor="same_as_parmanent" className="text-sm font-medium text-gray-900">All</label>
                                    </div>
                                </div>

                                <div>
                                    {inputData.groupList && inputData.groupList.map((parentRole: any, indexParentRole: any) => (
                                        <div className='flex' key={indexParentRole}>
                                            <div className="basis-full md:basis-2/12">
                                                <div className="flex items-center my-3">
                                                    <input
                                                        id={`group-${indexParentRole}`}
                                                        checked={parentRole.indexParentRole}
                                                        type="checkbox"
                                                        // onClick={(e) => checkPermissionGroup(e, indexParentRole, parentRole.isChecked ? false : true)}
                                                        className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2 mr-2"
                                                    />
                                                    <label htmlFor={`group-${indexParentRole}`} className="text-sm font-medium text-gray-900">{parentRole.name}</label>
                                                </div>
                                            </div>
                                            <div className="basis-full md:basis-10/12 grid gap-2 grid-cols-1 md:grid-cols-4 border-b py-2">
                                                {parentRole && parentRole.permissions.map((item: any, indexChild: any) => (
                                                    <div className="flex items-center my-2" key={indexChild}>
                                                        <input
                                                            id={`group-${indexChild}`}
                                                            checked={item.isChecked}
                                                            type="checkbox"
                                                            className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2 mr-2"
                                                            // onClick={(e) =>
                                                            //     roleCheck(
                                                            //         e,
                                                            //         parentRole,
                                                            //         item,
                                                            //         indexChild,
                                                            //         indexParentRole
                                                            //     )
                                                            // }
                                                        />
                                                        <label htmlFor={`group-${indexChild}`} className="text-sm font-medium text-gray-900">{item.printName}</label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    ))}
                                </div>

                                <Button title='Save Permission' loadingTitle="Saving..." loading={false} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RolePermissionCreate;
