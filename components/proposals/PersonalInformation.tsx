import * as React from "react";
import Input from "@/components/input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import { GenderList, identityTypeList, MaritalStatusList, religionList } from "@/utils/proposal-dropdowns";
import { useState } from 'react';
import ValidationMessage from "../validationMessage";

export interface IPersonalInformation {
  handleChangeTextInput: (name: string, value: any) => void;
  identityLabel: any;
  identityValidationMessage: any;
  disabledField: boolean;
  errors?: any;
}

export function PersonalInformation({ handleChangeTextInput, errors }: IPersonalInformation) {
  const { proposalInput , identity_type} = useSelector((state: RootState) => state.proposal);

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
          value={proposalInput.proposal_personal_information.full_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Input
          label="Father Name"
          name="father_name"
          placeholder="Father Name"
          value={proposalInput.proposal_personal_information.father_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Input
          label="Mother Name"
          name="mother_name"
          placeholder="Mother Name"
          value={proposalInput.proposal_personal_information.mother_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Input
          label="Spouse Name"
          name="spouse_name"
          placeholder="Spouse Name"
          value={proposalInput.proposal_personal_information.spouse_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Input
          label="Email Address"
          name="email"
          placeholder="Email Address"
          value={proposalInput.proposal_personal_information.email}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Input
          label="Mobile No"
          name="mobile_no"
          placeholder="Mobile No"
          value={proposalInput.proposal_personal_information.mobile_no}
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
          value={proposalInput.proposal_personal_information.marital_status}
          defaultValue=""
          placeholder="Marital Status"
          handleChangeValue={handleChangeTextInput}
        />

        <Select
          options={identityTypeList}
          // defaultValue={identityTypeList[0]}
          isSearchable={true}
          name="identity_type"
          value={proposalInput.proposal_personal_information.identity_type}
          label="Identity Type"
          placeholder="Identity Type"
          handleChangeValue={handleChangeTextInput}
        />

        <div>
          <Input
            label={identity_type.label}
            name="id_no"
            type="number"
            placeholder={identity_type.label}
            isDisabled={identity_type.isDisabledField}
            value={proposalInput.proposal_personal_information.id_no}
            isRequired={true}
            minValue={identity_type.minLength}
            maxValue={identity_type.maxLength}
            inputChange={handleChangeTextInput}
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
          value={proposalInput.proposal_personal_information.gender}
          defaultValue=""
          placeholder="Gender"
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="Date of Birth"
          name="dob"
          placeholder="Date of Birth"
          type="date"
          value={proposalInput.proposal_personal_information.dob}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Input
          label="Occupation"
          name="occupation"
          placeholder="Occupation"
          value={proposalInput.proposal_personal_information.occupation}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        {/* <Input
          label="Relation"
          name="relation"
          placeholder="Relation"
          value={proposalInput.proposal_personal_information.relation}
          isRequired={true}
          inputChange={handleChangeTextInput}
        /> */}
        <Select
          options={religionList}
          isSearchable={true}
          name="religion"
          label="Religion"
          defaultValue=""
          placeholder="Select Religion"
          handleChangeValue={handleChangeTextInput}
        />
        <Input
          label="Height"
          name="height"
          placeholder="Height"
          value={proposalInput.proposal_personal_information.height}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Select
          options={[
            {
              label: "Feet",
              value: "feet",
            },
            {
              label: "Inches",
              value: "inches",
            },
          ]}
          isSearchable={true}
          name="height_unit"
          value={proposalInput.proposal_personal_information.height_unit}
          label="Height Unit"
          defaultValue=""
          placeholder="Height Unit"
          handleChangeValue={handleChangeTextInput}
        />
        <Input
          label="Weight"
          name="weight"
          placeholder="Weight"
          value={proposalInput.proposal_personal_information.weight}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />
        <Select
          options={[
            {
              label: "KG",
              value: "kg",
            },
            {
              label: "LBS",
              value: "lbs",
            },
          ]}
          isSearchable={true}
          name="weight_unit"
          label="Weight Unit"
          value={proposalInput.proposal_personal_information.weight_unit}
          defaultValue=""
          placeholder="Weight Unit"
          handleChangeValue={handleChangeTextInput}
        />
        <Input
          label="Allocation"
          name="allocation"
          placeholder="Allocation"
          value={proposalInput.proposal_personal_information.allocation}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
      </div>
    </div>
  );
}
