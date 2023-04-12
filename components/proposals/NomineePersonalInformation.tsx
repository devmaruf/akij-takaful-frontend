import { useSelector } from "react-redux";

import Input from "@/components/input";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import {
    GenderList,
    getIdentityLabel,
    identityTypeList,
    MaritalStatusList,
    religionList,
    getIdendityValidationMessage
} from "@/utils/proposal-dropdowns";
import { calculateAge } from "@/utils/calculation";
import { getCurrentDate } from "@/utils/date-helper";

export interface IPersonalInformation {
    handleChangeTextInput: (name: string, value: any, id: string, index: number) => void;
    identityLabel: any;
    identityValidationMessage: any;
    disabledField: boolean;
    id: string;
    index?: any;
    errors?: any;
    data: any;
}

export function NomineePersonalInformation({ handleChangeTextInput, errors, id, index, data }: IPersonalInformation) {
    const changeNomineeInputVal = (name: string, value: any) => {
        handleChangeTextInput(name, value, id, index)
    }

    const onChangeDob = (name: string, value: string) => {
        if (typeof value !== "undefined") {
            changeNomineeInputVal('age', calculateAge(value));
        }

        changeNomineeInputVal('dob', value);
    }

    return (
        <div className="border border-gray-200 mt-3 rounded-md shadow-md">
            <div className="bg-white text-cyan-600 mb-3 text-sm border border-gray-200">
                <h3 className="p-2"> Nominee Personal Information</h3>
            </div>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-4 p-2">
                <Input
                    label="Full Name"
                    name="full_name"
                    placeholder="Full Name"
                    value={data.full_name}
                    isRequired={true}
                    inputChange={changeNomineeInputVal}
                    errors={errors}
                />

                <Input
                    label="Father Name"
                    name="father_name"
                    placeholder="Father Name"
                    value={data.father_name}
                    isRequired={true}
                    inputChange={changeNomineeInputVal}
                    errors={errors}
                />

                <Input
                    label="Mother Name"
                    name="mother_name"
                    placeholder="Mother Name"
                    value={data.mother_name}
                    isRequired={true}
                    inputChange={changeNomineeInputVal}
                    errors={errors}
                />

                <Select
                    options={GenderList}
                    isSearchable={true}
                    isRequired={true}
                    name="gender"
                    label="Gender"
                    defaultValue={data.gender}
                    placeholder="Gender"
                    handleChangeValue={changeNomineeInputVal}
                    errors={errors}
                />

                <Select
                    options={MaritalStatusList}
                    isSearchable={true}
                    isRequired={true}
                    label="Marital Status"
                    name="marital_status"
                    defaultValue={data.marital_status}
                    placeholder="Marital Status"
                    handleChangeValue={changeNomineeInputVal}
                    errors={errors}
                />
                {
                    data.marital_status === 'married' &&
                    <Input
                        label={
                            `${data?.gender === 'female' ? 'Husband' : 'Spouse'} name`
                        }
                        name="spouse_name"
                        placeholder={
                            `${data?.gender === 'female' ? 'Husband' : 'Spouse'} name`
                        }
                        value={data.spouse_name}
                        isRequired={true}
                        inputChange={changeNomineeInputVal}
                        errors={errors}
                    />
                }
                <Input
                    label="Email Address"
                    name="email"
                    placeholder="Email Address"
                    value={data.email}
                    isRequired={true}
                    inputChange={changeNomineeInputVal}
                    errors={errors}
                />
                <Input
                    label="Mobile No"
                    name="mobile_no"
                    placeholder="Mobile No"
                    value={data.mobile_no}
                    minLength={11}
                    maxLength={11}
                    isRequired={true}
                    inputChange={changeNomineeInputVal}
                    errors={errors}
                />
                <Select
                    options={identityTypeList}
                    isSearchable={false}
                    isRequired={true}
                    name="identity_type"
                    defaultValue={data.identity_type}
                    label="Identity Type"
                    placeholder="Identity Type"
                    handleChangeValue={changeNomineeInputVal}
                    errors={errors}
                />

                <div>
                    <Input
                        label={getIdentityLabel(data.identity_type)}
                        name="id_no"
                        placeholder={`Enter ${getIdentityLabel(data.identity_type)}`}
                        isDisabled={data.identity_type === ''}
                        value={data.id_no}
                        isRequired={true}
                        // minValue={identity_type.minLength}
                        // maxValue={identity_type.maxLength}
                        inputChange={changeNomineeInputVal}
                        errors={errors}
                        hintText={getIdendityValidationMessage(data.identity_type)}
                    />
                </div>

                <Input
                    label="Date of Birth"
                    name={`nominee_${index + 1}_dob`}
                    placeholder="Date of Birth"
                    type="date"
                    value={data.dob}
                    maxValue={getCurrentDate()}
                    isRequired={true}
                    inputChange={onChangeDob}
                    errors={errors}
                    hintText={
                        isNaN(data.age) ? '' :
                            `Calculated age - ${data.age} year${data.age > 1 ? 's' : ''}`
                    }
                />

                <Input
                    label="Occupation"
                    name="occupation"
                    placeholder="Occupation"
                    value={data.occupation}
                    isRequired={true}
                    inputChange={changeNomineeInputVal}
                    errors={errors}
                />

                <Select
                    options={religionList}
                    isSearchable={true}
                    isRequired={true}
                    name="religion"
                    label="Religion"
                    defaultValue={data.religion}
                    placeholder="Select Religion"
                    handleChangeValue={changeNomineeInputVal}
                    errors={errors}
                />

                <Input
                    label="Allocation"
                    name="allocation"
                    placeholder="Allocation"
                    value={data.allocation}
                    isRequired={false}
                    inputChange={changeNomineeInputVal}
                    errors={errors}
                />
            </div>
        </div>
    );
}
