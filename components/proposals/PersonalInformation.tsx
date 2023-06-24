import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Input from "@/components/input";
import Select from "@/components/select";
import { RootState } from "@/redux/store";
import { GenderList, identityTypeList, MaritalStatusList, religionList } from "@/utils/proposal-dropdowns";
import { calculateAge } from "@/utils/calculation";
import { IProposalFormSection } from "@/redux/interfaces";
import { subYears } from "date-fns";
import OccupationDropdown from "@/components/occupations/OccupationDropdown";
import SectionTitle from "../sectionTitle";

export function PersonalInformation({ onChangeText, errors }: IProposalFormSection) {
  const { proposalInput, identity_type } = useSelector((state: RootState) => state.proposal);
  const { occupationDropdownList } = useSelector((state: RootState) => state.occupation);
  const personalInformation = proposalInput.proposal_personal_information;
  const { age, dob } = personalInformation;
  const [selectedOccupation, setSelectedOccupation] = useState<number>(0);

  const onChangeDob = (name: string, value: string) => {

    onChangeText(name, value);

    if (typeof value !== "undefined") {
      onChangeText('age', calculateAge(dob));
    }
  }

  const onchangeOccupationDropdown = (name: string, value: number) => {
    setSelectedOccupation(value);
    onChangeText(name, value);
  }

  useEffect(() => {
    if (typeof dob !== "undefined") {
      onChangeText('age', calculateAge(dob));
    }
  }, [dob]);

  return (
    <div className="border border-gray-200 mt-3 p-2.5 rounded-md shadow-md">
      <SectionTitle title="Personal Information" />
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
          isSearchable={true}
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
            minLength={identity_type.minLength}
            maxLength={identity_type.maxLength}
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
          label="Annual Income"
          name="annual_income"
          type="number"
          placeholder="Annual Income"
          value={personalInformation.annual_income ?? ''}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />

        {/* <OccupationDropdown
          occupation={personalInformation.occupation ?? ''}
          onChange={onChangeText}
          onChangeOccupationId={(occupationId) => onChangeText('occupation_id', occupationId)}
          errors={errors}
        /> */}
        <Select
          options={occupationDropdownList}
          isSearchable={true}
          isRequired={true}
          name="occupation"
          label="Occupation"
          defaultValue={typeof personalInformation.occupation === 'string' ? selectedOccupation : personalInformation.occupation}
          // defaultValue={personalInformation.occupation ?? ''}
          placeholder="Select Occupation"
          handleChangeValue={onchangeOccupationDropdown}
          errors={errors}
        />

        {
          (typeof selectedOccupation === 'number' && selectedOccupation === 79) &&
          <Input
            label="Other Occupation"
            name="occupation"
            type="text"
            placeholder="Other Occupation"
            value={personalInformation?.occupation ?? ''}
            isRequired={selectedOccupation === 79 ? true : false}
            inputChange={onChangeText}
            errors={errors}
          />
        }

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
      </div>

    </div>
  );
}
