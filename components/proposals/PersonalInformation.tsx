import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Input from "@/components/input";
import Select from "@/components/select";
import { RootState } from "@/redux/store";
import { GenderList, identityTypeList, MaritalStatusList, religionList } from "@/utils/proposal-dropdowns";
import { IBMI, calculateAge, calculateBMI } from "@/utils/calculation";
import { IProposalFormSection } from "@/redux/interfaces";
import { getCurrentDate } from "@/utils/date-helper";
import { subYears } from "date-fns";

export function PersonalInformation({ onChangeText, errors }: IProposalFormSection) {
  const { proposalInput, identity_type } = useSelector((state: RootState) => state.proposal);
  const personalInformation = proposalInput.proposal_personal_information;
  const { height, height_inch: heightInch, weight, dob, age } = personalInformation;

  const [BMI, setBMI] = useState<IBMI>({
    bmi: 0,
    status: ''
  });

  useEffect(() => {
    const { bmi, status } = calculateBMI(height, heightInch, weight);
    setBMI({
      bmi: bmi,
      status: status
    })
  }, [height, heightInch, weight]);

  const onChangeDob = (name: string, value: string) => {
    onChangeText(name, value);

    if (typeof value !== "undefined") {
      onChangeText('age', calculateAge(dob));
    }
  }

  useEffect(() => {
    if (typeof dob !== "undefined") {
      onChangeText('age', calculateAge(dob));
    }
  }, [dob]);

  return (
    <div className="border border-gray-200 mt-3 p-2.5 rounded-md shadow-md">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-md">
        Personal Information
      </h3>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
        <Input
          label="Full Name"
          name="full_name"
          placeholder="Full Name"
          value={personalInformation.full_name ?? ''}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />

        <Input
          label="Father Name"
          name="father_name"
          placeholder="Father Name"
          value={personalInformation.father_name ?? ''}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />

        <Input
          label="Mother Name"
          name="mother_name"
          placeholder="Mother Name"
          value={personalInformation.mother_name ?? ''}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />

        <Select
          options={GenderList}
          isSearchable={true}
          isRequired={true}
          name="gender"
          label="Gender"
          defaultValue={personalInformation.gender ?? ''}
          placeholder="Gender"
          handleChangeValue={onChangeText}
          errors={errors}
        />

        <Select
          options={MaritalStatusList}
          isSearchable={true}
          isRequired={true}
          label="Marital Status"
          name="marital_status"
          defaultValue={personalInformation.marital_status ?? ''}
          placeholder="Marital Status"
          handleChangeValue={onChangeText}
          errors={errors}
        />

        {
          personalInformation.marital_status === 'married' &&
          <Input
            label={
              `${personalInformation?.gender === 'female' ? 'Husband' : 'Spouse'} name`
            }
            name="spouse_name"
            placeholder={
              `${personalInformation?.gender === 'female' ? 'Husband' : 'Spouse'} name`
            }
            value={personalInformation.spouse_name ?? ''}
            isRequired={true}
            inputChange={onChangeText}
            errors={errors}
          />
        }

        <Input
          label="Email Address"
          name="email"
          placeholder="Email Address"
          value={personalInformation.email ?? ''}
          isRequired={false}
          inputChange={onChangeText}
          errors={errors}
        />

        <Input
          label="Mobile No"
          name="mobile_no"
          placeholder="Mobile No"
          value={personalInformation.mobile_no ?? ''}
          isRequired={true}
          minLength={11}
          maxLength={11}
          inputChange={onChangeText}
          errors={errors}
        />

        <Select
          options={identityTypeList}
          isSearchable={false}
          isRequired={true}
          name="identity_type"
          defaultValue={personalInformation.identity_type ?? ''}
          label="Identity Type"
          placeholder="Identity Type"
          handleChangeValue={onChangeText}
          errors={errors}
        />
        <div>
          <Input
            label={identity_type.label}
            name="id_no"
            placeholder={identity_type.label}
            isDisabled={identity_type.isDisabledField}
            value={personalInformation.id_no ?? ''}
            isRequired={true}
            minValue={identity_type.minLength}
            maxValue={identity_type.maxLength}
            inputChange={onChangeText}
            errors={errors}
            hintText={identity_type.message}
          />
        </div>

        <Input
          label="Date of Birth"
          name="dob"
          placeholder="Date of Birth"
          type="date"
          value={personalInformation.dob ?? ''}
          isRequired={true}
          inputChange={onChangeDob}
          errors={errors}
          maxValue={subYears(new Date(), 18)}
          hintText={
            isNaN(age) ? '' :
              `Calculated age - ${age} year${age > 1 ? 's' : ''}`
          }
        />

        <Input
          label="Occupation"
          name="occupation"
          placeholder="Occupation"
          value={personalInformation.occupation ?? ''}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />

        <Select
          options={religionList}
          isSearchable={true}
          isRequired={true}
          name="religion"
          label="Religion"
          defaultValue={personalInformation.religion ?? ''}
          placeholder="Select Religion"
          handleChangeValue={onChangeText}
          errors={errors}
        />

        <div className="flex flex-1 w-full">
          <Input
            areaClassNames='flex-1'
            label="Height Feet"
            name="height"
            type="number"
            placeholder="feet, eg: 5"
            value={personalInformation.height ?? ''}
            isRequired={true}
            inputChange={onChangeText}
            errors={errors}
          />

          <Input
            areaClassNames='flex-1 ml-1'
            label="Height Inch"
            name="height_inch"
            type="number"
            placeholder="inch, eg: 6"
            value={personalInformation.height_inch ?? ''}
            isRequired={true}
            inputChange={onChangeText}
            errors={errors}
          />
        </div>

        <Input
          label="Weight in KG"
          name="weight"
          type="number"
          placeholder="kg; eg: 65"
          value={personalInformation.weight ?? ''}
          isRequired={true}
          inputChange={onChangeText}
        />
        <div className="flex w-full">
          <Input
            areaClassNames='flex-1 ml-1 mt-1'
            label="BMI"
            name="bmi"
            placeholder="Body Mass Index(BMI)"
            value={BMI.bmi ?? ''}
            isRequired={false}
            inputChange={onChangeText}
            errors={errors}
            isDisabled={true}
          />

          <Input
            areaClassNames='flex-1 ml-1 mt-1'
            label="BMI status"
            name="bmi_status"
            placeholder=""
            value={BMI.status ?? ''}
            isRequired={false}
            isDisabled={true}
            inputChange={onChangeText}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
