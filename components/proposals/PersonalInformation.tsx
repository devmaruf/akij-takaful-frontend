import { useEffect, useState } from "react";
import Input from "@/components/input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import { GenderList, identityTypeList, MaritalStatusList, religionList } from "@/utils/proposal-dropdowns";
import { IBMI, calculateAge, calculateBMI } from "@/utils/calculation";

export interface IPersonalInformation {
  handleChangeTextInput: (name: string, value: any) => void;
  identityLabel: any;
  identityValidationMessage: any;
  disabledField: boolean;
  errors?: any;
}

export function PersonalInformation({ handleChangeTextInput, errors }: IPersonalInformation) {
  const { proposalInput, identity_type } = useSelector((state: RootState) => state.proposal);
  const height = proposalInput?.proposal_personal_information?.height;
  const heightInch = proposalInput?.proposal_personal_information?.height_inch;
  const weight = proposalInput?.proposal_personal_information?.weight;
  const dob = proposalInput?.proposal_personal_information?.dob;
  const [age, setAge] = useState(0);
  const [BMI, setBMI] = useState<IBMI>({
    bmi: 0,
    status: ''
  });

  useEffect(() => {
    if (typeof dob !== "undefined") {
      const getAge = calculateAge(dob);
      setAge(getAge);
    }
  }, [dob, age])

  useEffect(() => {
    const { bmi, status } = calculateBMI(height, heightInch, weight);
    setBMI({
      bmi: bmi,
      status: status
    })
  }, [height, heightInch, weight])

  return (
    <div className="border border-gray-200 mt-3 p-2.5 rounded-md shadow-md">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-2xl">
        Personal Information
      </h3>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
        <Input
          label="Full Name"
          name="full_name"
          placeholder="Full Name"
          value={proposalInput?.proposal_personal_information.full_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Input
          label="Father Name"
          name="father_name"
          placeholder="Father Name"
          value={proposalInput?.proposal_personal_information.father_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Input
          label="Mother Name"
          name="mother_name"
          placeholder="Mother Name"
          value={proposalInput?.proposal_personal_information.mother_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Select
          options={MaritalStatusList}
          isSearchable={true}
          isRequired={true}
          label="Marital Status"
          name="marital_status"
          defaultValue={proposalInput?.proposal_personal_information.marital_status}
          placeholder="Marital Status"
          handleChangeValue={handleChangeTextInput}
          errors={errors}
        />
        {
          proposalInput?.proposal_personal_information.marital_status === 'married' &&
          <Input
            label="Spouse Name"
            name="spouse_name"
            placeholder="Spouse Name"
            value={proposalInput?.proposal_personal_information.spouse_name}
            isRequired={true}
            inputChange={handleChangeTextInput}
            errors={errors}
          />
        }
        <Input
          label="Email Address"
          name="email"
          placeholder="Email Address"
          value={proposalInput?.proposal_personal_information.email}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Input
          label="Mobile No"
          name="mobile_no"
          placeholder="Mobile No"
          value={proposalInput?.proposal_personal_information.mobile_no}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Select
          options={identityTypeList}
          isSearchable={true}
          name="identity_type"
          defaultValue={proposalInput?.proposal_personal_information.identity_type}
          label="Identity Type"
          placeholder="Identity Type"
          handleChangeValue={handleChangeTextInput}
          errors={errors}
        />
        <div>
          <Input
            label={identity_type.label}
            name="id_no"
            placeholder={identity_type.label}
            isDisabled={identity_type.isDisabledField}
            value={proposalInput?.proposal_personal_information.id_no}
            isRequired={true}
            minValue={identity_type.minLength}
            maxValue={identity_type.maxLength}
            inputChange={handleChangeTextInput}
            errors={errors}
            hintText={identity_type.message}
          />
        </div>
        <Select
          options={GenderList}
          isSearchable={true}
          isRequired={true}
          name="gender"
          label="Gender"
          defaultValue={proposalInput?.proposal_personal_information.gender}
          placeholder="Gender"
          handleChangeValue={handleChangeTextInput}
          errors={errors}
        />

        <Input
          label="Date of Birth"
          name="dob"
          placeholder="Date of Birth"
          type="date"
          value={proposalInput?.proposal_personal_information.dob}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Input
          label="Occupation"
          name="occupation"
          placeholder="Occupation"
          value={proposalInput?.proposal_personal_information.occupation}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        {/* <Input
          label="Relation"
          name="relation"
          placeholder="Relation"
          value={proposalInput?.proposal_personal_information.relation}
          isRequired={true}
          inputChange={handleChangeTextInput}
        /> */}
        <Select
          options={religionList}
          isSearchable={true}
          name="religion"
          label="Religion"
          defaultValue={proposalInput?.proposal_personal_information.religion}
          placeholder="Select Religion"
          handleChangeValue={handleChangeTextInput}
          errors={errors}
        />
        <div className="flex flex-1 w-full">
          <Input
            areaClassNames='flex-1'
            label="Height Feet"
            name="height"
            type="number"
            placeholder="feet, eg: 5"
            value={proposalInput?.proposal_personal_information.height}
            isRequired={true}
            inputChange={handleChangeTextInput}
            errors={errors}
          />
          <Input
            areaClassNames='flex-1 ml-1'
            label="Height Inch"
            name="height_inch"
            type="number"
            placeholder="inch, eg: 6"
            value={proposalInput?.proposal_personal_information.height_inch}
            isRequired={true}
            inputChange={handleChangeTextInput}
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
            value={proposalInput?.proposal_personal_information.weight}
            isRequired={true}
            inputChange={handleChangeTextInput}
          />
          <Input
            areaClassNames='flex-1 ml-1 mt-1'
            label="Body Mass Index - (BMI)"
            name="bmi"
            placeholder="Body Mass Index(BMI)"
            value={BMI.bmi}
            isRequired={false}
            inputChange={handleChangeTextInput}
            errors={errors}
            isDisabled={true}
            hintText={BMI.status !== '' ? BMI.status : ''}
          />
        </div>

        <Input
          label="Allocation"
          name="allocation"
          placeholder="Allocation"
          value={proposalInput?.proposal_personal_information.allocation}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
      </div>
    </div>
  );
}
