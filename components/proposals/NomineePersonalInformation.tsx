import Input from "@/components/input";
import Select from "@/components/select";
import {
    GenderList,
    getIdentityLabel,
    identityTypeList,
    MaritalStatusList,
    religionList,
    getIdendityValidationMessage
} from "@/utils/proposal-dropdowns";
import { getCurrentDate } from "@/utils/date-helper";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useState } from "react";

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

    const { occupationDropdownList } = useSelector((state: RootState) => state.occupation);
    const [selectedOccupation, setSelectedOccupation] = useState<number>(0);

    const changeNomineeInputVal = (name: string, value: any) => {
        handleChangeTextInput(name, value, id, index)
    }

    const onChange = (nameAppendedNominee: string, value: any) => {
        const name = nameAppendedNominee.substr(nameAppendedNominee.indexOf("_") + 3);
        changeNomineeInputVal(name, value);
    }

    const onchangeOccupationDropdown = (name: string, value: number) => {
        setSelectedOccupation(value);
        onChange(name, value);
    }

    return (
        <div className="border border-gray-200 mt-3 rounded-md shadow-md">
            <div className="bg-white text-cyan-600 mb-3 text-sm border border-gray-200">
                <h3 className="p-2"> Nominee Personal Information</h3>
            </div>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-4 p-2">
                <Input
                    label="Full Name"
                    name={`nominee_${index}_full_name`}
                    placeholder="Full Name"
                    value={data.full_name}
                    isRequired={true}
                    inputChange={onChange}
                    errors={errors}
                />

                <Input
                    label="Father Name"
                    name={`nominee_${index}_father_name`}
                    placeholder="Father Name"
                    value={data.father_name}
                    isRequired={true}
                    inputChange={onChange}
                    errors={errors}
                />

                <Input
                    label="Mother Name"
                    name={`nominee_${index}_mother_name`}
                    placeholder="Mother Name"
                    value={data.mother_name}
                    isRequired={true}
                    inputChange={onChange}
                    errors={errors}
                />

                <Select
                    options={GenderList}
                    isSearchable={false}
                    isRequired={true}
                    name={`nominee_${index}_gender`}
                    label="Gender"
                    defaultValue={data.gender}
                    placeholder="Gender"
                    handleChangeValue={onChange}
                    errors={errors}
                />

                <Select
                    options={MaritalStatusList}
                    isSearchable={true}
                    isRequired={true}
                    label="Marital Status"
                    name={`nominee_${index}_marital_status`}
                    defaultValue={data.marital_status}
                    placeholder="Marital Status"
                    handleChangeValue={onChange}
                    errors={errors}
                />

                {
                    data.marital_status === 'married' &&
                    <Input
                        label={
                            `${data?.gender === 'female' ? 'Husband' : 'Spouse'} name`
                        }
                        name={`nominee_${index}_spouse_name`}
                        placeholder={
                            `${data?.gender === 'female' ? 'Husband' : 'Spouse'} name`
                        }
                        value={data.spouse_name}
                        isRequired={true}
                        inputChange={onChange}
                        errors={errors}
                    />
                }

                <Input
                    label="Email Address"
                    name={`nominee_${index}_email`}
                    placeholder="Email Address"
                    value={data.email}
                    isRequired={false}
                    inputChange={onChange}
                    errors={errors}
                />

                <Input
                    label="Mobile No"
                    name={`nominee_${index}_mobile_no`}
                    placeholder="Mobile No"
                    value={data.mobile_no}
                    minLength={11}
                    maxLength={11}
                    isRequired={true}
                    inputChange={onChange}
                    errors={errors}
                />
                <Select
                    options={identityTypeList}
                    isSearchable={false}
                    isRequired={true}
                    name={`nominee_${index}_identity_type`}
                    defaultValue={data.identity_type}
                    label="Identity Type"
                    placeholder="Identity Type"
                    handleChangeValue={onChange}
                    errors={errors}
                />

                <div>
                    <Input
                        label={getIdentityLabel(data.identity_type)}
                        name={`nominee_${index}_id_no`}
                        placeholder={`Enter ${getIdentityLabel(data.identity_type)}`}
                        isDisabled={data.identity_type === ''}
                        value={data.id_no}
                        isRequired={true}
                        // minValue={identity_type.minLength}
                        // maxValue={identity_type.maxLength}
                        inputChange={onChange}
                        errors={errors}
                        hintText={getIdendityValidationMessage(data.identity_type)}
                    />
                </div>

                <Input
                    label="Date of Birth"
                    name={`nominee_${index}_dob`}
                    placeholder="Date of Birth"
                    type="date"
                    value={data.dob}
                    maxValue={getCurrentDate()}
                    isRequired={true}
                    inputChange={onChange}
                    errors={errors}
                    hintText={
                        isNaN(data.age) ? '' :
                            `Calculated age - ${data.age} year${data.age > 1 ? 's' : ''}`
                    }
                />

                {/* <OccupationDropdown
                    name={`nominee_${index + 1}_occupation`}
                    occupation={data.occupation ?? ''}
                    onChange={(name, value) => {
                        changeNomineeInputVal('occupation', value);
                    }}
                    errors={errors}
                /> */}

                <Select
                    options={occupationDropdownList}
                    isSearchable={true}
                    isRequired={true}
                    name={`nominee_${index}_occupation`}
                    label="Occupation"
                    defaultValue={typeof data.occupation === 'string' ? selectedOccupation : data.occupation}
                    // defaultValue={data.occupation ?? ''}
                    placeholder="Select Occupation"
                    handleChangeValue={onchangeOccupationDropdown}
                    errors={errors}
                />

                {
                    (typeof selectedOccupation === 'number' && selectedOccupation === 79) &&
                    <Input
                        label="Other Occupation"
                        name={`nominee_${index}_occupation`}
                        type="text"
                        placeholder="Other Occupation"
                        value={data?.occupation ?? ''}
                        isRequired={selectedOccupation === 79 ? true : false}
                        inputChange={onChange}
                        errors={errors}
                    />
                }

                <Select
                    options={religionList}
                    isSearchable={true}
                    isRequired={true}
                    name={`nominee_${index}_religion`}
                    label="Religion"
                    defaultValue={data.religion}
                    placeholder="Select Religion"
                    handleChangeValue={onChange}
                    errors={errors}
                />
            </div>
        </div>
    );
}
