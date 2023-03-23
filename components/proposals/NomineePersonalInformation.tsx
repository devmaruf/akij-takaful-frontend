import * as React from "react";
import Input from "@/components/input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import { GenderList, heightMeasurementList, identityTypeList, MaritalStatusList, religionList, weightMeasurementList } from "@/utils/proposal-dropdowns";
import ValidationMessage from "../validationMessage";

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

    const { identity_type } = useSelector((state: RootState) => state.proposal);

    // const [age, setAge] = React.useState(0);
    const [BMI, setBMI] = React.useState({});


    const changeNomineeInputVal = (name: string, value: any) => {
        handleChangeTextInput(name, value, id, index)
    }

    return (
        <div className="border border-gray-200 mt-3 rounded-md shadow-md">
            <div className="bg-white text-cyan-600 mb-3 text-sm border border-gray-200">
                <h3 className="p-2">  Nominee Personal Information</h3>
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
                        label="Spouse Name"
                        name="spouse_name"
                        placeholder="Spouse Name"
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
                    isRequired={true}
                    inputChange={changeNomineeInputVal}
                    errors={errors}
                />
                <Select
                    options={identityTypeList}
                    isSearchable={true}
                    name="identity_type"
                    defaultValue={data.identity_type}
                    label="Identity Type"
                    placeholder="Identity Type"
                    handleChangeValue={changeNomineeInputVal}
                    errors={errors}
                />

                <div>
                    <Input
                        label={identity_type.label}
                        name="id_no"
                        placeholder={identity_type.label}
                        isDisabled={identity_type.isDisabledField}
                        value={data.id_no}
                        isRequired={true}
                        minValue={identity_type.minLength}
                        maxValue={identity_type.maxLength}
                        inputChange={changeNomineeInputVal}
                        errors={errors}
                    />
                    <ValidationMessage message={identity_type.message} />
                </div>
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

                <Input
                    label="Date of Birth"
                    name="dob"
                    placeholder="Date of Birth"
                    type="date"
                    value={data.dob}
                    isRequired={true}
                    inputChange={changeNomineeInputVal}
                    errors={errors}
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
                    name="religion"
                    label="Religion"
                    defaultValue={data.religion}
                    placeholder="Select Religion"
                    handleChangeValue={changeNomineeInputVal}
                    errors={errors}
                />
                <Input
                    label="Height"
                    name="height"
                    placeholder="Height"
                    value={data.height}
                    isRequired={true}
                    inputChange={changeNomineeInputVal}
                    errors={errors}
                />
                <Select
                    options={heightMeasurementList}
                    isSearchable={true}
                    name="height_unit"
                    defaultValue={data.height_unit}
                    label="Height Unit"
                    placeholder="Height Unit"
                    handleChangeValue={changeNomineeInputVal}
                    errors={errors}
                />
                <Input
                    label="Weight"
                    name="weight"
                    placeholder="Weight"
                    value={data.weight}
                    isRequired={true}
                    inputChange={changeNomineeInputVal}
                />
                <Select
                    options={weightMeasurementList}
                    isSearchable={true}
                    name="weight_unit"
                    label="Weight Unit"
                    defaultValue={data.weight_unit}
                    placeholder="Weight Unit"
                    handleChangeValue={changeNomineeInputVal}
                    errors={errors}
                />
                <Input
                    label="Body Mass Index - (BMI)"
                    name="bmi"
                    placeholder="Body Mass Index(BMI)"
                    value={BMI.bmi}
                    isRequired={false}
                    inputChange={changeNomineeInputVal}
                    errors={errors}
                    isDisabled={true}
                />
                <Input
                    label="Allocation"
                    name="allocation"
                    placeholder="Allocation"
                    value={data.allocation}
                    isRequired={true}
                    inputChange={changeNomineeInputVal}
                    errors={errors}
                />
            </div>
        </div>
    );
}
