import * as React from 'react';
import Input from '@/components/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Select from '@/components/select';
import Button from '@/components/button';

export interface IPersonalInformation {
    handleChangeTextInput: (name: string, value: any) => void;
}

export function PersonalInformation({
    handleChangeTextInput
}: IPersonalInformation) {
    const dispatch = useDispatch();
    const { proposalInput, planList, isSubmitting } = useSelector((state: RootState) => state.Proposal);

    return (
        <div className='border border-gray-200 p-2.5 rounded-md shadow-md'>
            <h3 className='bg-slate-100 p-2 text-cyan-600 mb-3'>Personal Information</h3>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">
                <Input
                    label="Full Name"
                    name="name"
                    placeholder='Full Name'
                    value={proposalInput.proposal_no}
                    isRequired={true}
                    inputChange={handleChangeTextInput}
                />
                <Input
                    label="Mobile No"
                    name="mobile_no"
                    placeholder='Mobile No'
                    value={proposalInput.proposal_no}
                    isRequired={true}
                    inputChange={handleChangeTextInput}
                />
                 <Input
                    label="Mobile No"
                    name="mobile_no"
                    placeholder='Mobile No'
                    value={proposalInput.proposal_no}
                    isRequired={true}
                    inputChange={handleChangeTextInput}
                />
                <Input
                    label="Email"
                    name="proposer_name"
                    placeholder='Email'
                    value={proposalInput.proposer_name}
                    isRequired={true}
                    inputChange={handleChangeTextInput}
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
                    label="Gender"
                    defaultValue=""
                    placeholder='Select gender...'
                    handleChangeValue={handleChangeTextInput}
                />
                <Select
                    options={[
                        {
                            label: 'Married',
                            value: 'married'
                        },
                        {
                            label: 'Unmarried',
                            value: 'Unmarried'
                        }
                    ]}
                    isSearchable={true}
                    name="marrital_status"
                    label="Marrital status"
                    defaultValue=""
                    placeholder='Select Marrital status...'
                    handleChangeValue={handleChangeTextInput}
                />
                <Input
                    label="Father's name"
                    name="proposer_name"
                    placeholder='Father name'
                    value={proposalInput.proposer_name}
                    isRequired={true}
                    inputChange={handleChangeTextInput}
                />
                <Input
                    label="Mother's name"
                    name="proposer_name"
                    placeholder='Mother name'
                    value={proposalInput.proposer_name}
                    isRequired={true}
                    inputChange={handleChangeTextInput}
                />
                <Input
                    label="Spouse name"
                    name="proposer_name"
                    placeholder='Spouse name'
                    value={proposalInput.proposer_name}
                    isRequired={true}
                    inputChange={handleChangeTextInput}
                />
                <Select
                    options={[
                        {
                            label: 'Student',
                            value: 'Student'
                        },
                        {
                            label: 'Business man',
                            value: 'Business man'
                        },
                        {
                            label: 'Private Employee',
                            value: 'Private Employee'
                        }
                    ]}
                    isSearchable={true}
                    name="marrital_status"
                    label="Occupation"
                    defaultValue=""
                    placeholder='Select Occupation...'
                    handleChangeValue={handleChangeTextInput}
                />
                <Select
                    options={[
                        {
                            label: 'Student',
                            value: 'Student'
                        },
                        {
                            label: 'Business man',
                            value: 'Business man'
                        },
                        {
                            label: 'Private Employee',
                            value: 'Private Employee'
                        }
                    ]}
                    isSearchable={true}
                    name="marrital_status"
                    label="Policy Option"
                    defaultValue=""
                    placeholder='Select Policy Option...'
                    handleChangeValue={handleChangeTextInput}
                />
            </div>
        </div>
    );
}
