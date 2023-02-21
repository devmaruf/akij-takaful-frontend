import * as React from 'react';
import Input from '@/components/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Select from '@/components/select';

export interface IAddressInformation {
    handleChangeTextInput: (name: string, value: any) => void;
}

export function AddressInformation({
    handleChangeTextInput
}: IAddressInformation) {
    const dispatch = useDispatch();
    const { proposalInput, planList, isSubmitting } = useSelector((state: RootState) => state.Proposal);

    return (
        <div className='border border-gray-200 p-2.5 rounded-md shadow-md mt-3'>
            <h3 className='bg-slate-100 p-2 text-cyan-600 mb-3'>
                Address Information
            </h3>

            <h4 className='my-2'>
                Present Address
            </h4>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-3 border-b">
                <Select
                    options={[
                        {
                            label: 'Male',
                            value: 'male'
                        },
                        {
                            label: 'Female',
                            value: 'female'
                        }
                    ]}
                    isSearchable={true}
                    name="gender"
                    label="District"
                    defaultValue=""
                    placeholder='Select District...'
                    handleChangeValue={handleChangeTextInput}
                />
                <Select
                    options={[
                        {
                            label: 'Male',
                            value: 'male'
                        },
                        {
                            label: 'Female',
                            value: 'female'
                        }
                    ]}
                    isSearchable={true}
                    name="gender"
                    label="Police station"
                    defaultValue=""
                    placeholder='Select Police station...'
                    handleChangeValue={handleChangeTextInput}
                />
                <Select
                    options={[
                        {
                            label: 'Male',
                            value: 'male'
                        },
                        {
                            label: 'Female',
                            value: 'female'
                        }
                    ]}
                    isSearchable={true}
                    name="gender"
                    label="Post office"
                    defaultValue=""
                    placeholder='Select Post office...'
                    handleChangeValue={handleChangeTextInput}
                />
                <Input
                    label="Street address"
                    name="name"
                    placeholder='Street address'
                    value={proposalInput.proposal_no}
                    isRequired={true}
                    inputChange={handleChangeTextInput}
                />
            </div>

            <h4 className='my-2'>
                Permanent Address
            </h4>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">
                <Select
                    options={[
                        {
                            label: 'Male',
                            value: 'male'
                        },
                        {
                            label: 'Female',
                            value: 'female'
                        }
                    ]}
                    isSearchable={true}
                    name="gender"
                    label="District"
                    defaultValue=""
                    placeholder='Select District...'
                    handleChangeValue={handleChangeTextInput}
                />
                <Select
                    options={[
                        {
                            label: 'Male',
                            value: 'male'
                        },
                        {
                            label: 'Female',
                            value: 'female'
                        }
                    ]}
                    isSearchable={true}
                    name="gender"
                    label="Police station"
                    defaultValue=""
                    placeholder='Select Police station...'
                    handleChangeValue={handleChangeTextInput}
                />
                <Select
                    options={[
                        {
                            label: 'Male',
                            value: 'male'
                        },
                        {
                            label: 'Female',
                            value: 'female'
                        }
                    ]}
                    isSearchable={true}
                    name="gender"
                    label="Post office"
                    defaultValue=""
                    placeholder='Select Post office...'
                    handleChangeValue={handleChangeTextInput}
                />
                <Input
                    label="Street address"
                    name="name"
                    placeholder='Street address'
                    value={proposalInput.proposal_no}
                    isRequired={true}
                    inputChange={handleChangeTextInput}
                />
            </div>
        </div>
    );
}
