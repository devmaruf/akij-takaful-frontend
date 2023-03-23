import { useEffect, useState } from "react";
import Input from "@/components/input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import { GenderList, heightMeasurementList, identityTypeList, MaritalStatusList, religionList, weightMeasurementList } from "@/utils/proposal-dropdowns";
import ValidationMessage from "../validationMessage";
import { IBMI, calculateBMI } from "@/utils/calculation";

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

    const [BMI, setBMI] = useState<IBMI>({
        bmi: 0,
        status: ''
    });

    const changeNomineeInputVal = (name: string, value: any) => {
        handleChangeTextInput(name, value, id, index)
    }

    const { height, height_inch, weight } = data;

    useEffect(() => {
        const { bmi, status } = calculateBMI(height, height_inch, weight);
        setBMI({
            bmi: bmi,
            status: status
        })
    }, [height, height_inch, weight]);

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
                <div className="flex flex-1 w-full">
                    <Input
                        areaClassNames='flex-1'
                        label="Height Feet"
                        name="height"
                        type="number"
                        placeholder="feet, eg: 5"
                        value={data.height}
                        isRequired={true}
                        inputChange={changeNomineeInputVal}
                        errors={errors}
                    />
                    <Input
                        areaClassNames='flex-1 ml-1'
                        label="Height Inch"
                        name="height_inch"
                        type="number"
                        placeholder="inch, eg: 6"
                        value={data.height_inch}
                        isRequired={true}
                        inputChange={changeNomineeInputVal}
                        errors={errors}
                    />
                </div>
                <div className="flex w-full">
                    <Input
                        areaClassNames='flex-1'
                        label="Weight in KG"
                        name="weight"
                        type="number"
                        placeholder="kg; eg: 65"
                        value={data.weight}
                        isRequired={true}
                        inputChange={changeNomineeInputVal}
                    />
                    <Input
                        areaClassNames='flex-1 ml-1 mt-1'
                        label="(BMI)"
                        name="bmi"
                        placeholder="Body Mass Index(BMI)"
                        value={BMI.bmi}
                        isRequired={false}
                        inputChange={changeNomineeInputVal}
                        errors={errors}
                        isDisabled={true}
                        hintText={BMI.status !== '' ? BMI.status : ''}
                    />
                </div>
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
