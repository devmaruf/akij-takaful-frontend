import * as React from "react";
import Input from "@/components/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import Button from "@/components/button";

export interface IPersonalInformation {
  handleChangeTextInput: (name: string, value: any) => void;
}

export function PersonalInformation({
  handleChangeTextInput,
}: IPersonalInformation) {
  const dispatch = useDispatch();
  const { proposalInput, planList, isSubmitting } = useSelector(
    (state: RootState) => state.Proposal
  );

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3">
        Personal Information
      </h3>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">
        <Select
          options={[
            {
              label: "Name 01",
              value: "value-01",
            },
            {
              label: "Name 02",
              value: "value-02",
            },
          ]}
          isSearchable={true}
          name="proposal_nominee_id"
          label="Proposal Nominee"
          defaultValue=""
          placeholder="Nominee Name"
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="Full Name"
          name="full_name"
          placeholder="Full Name"
          value={proposalInput.full_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Father Name"
          name="father_name"
          placeholder="Father Name"
          value={proposalInput.father_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Mother Name"
          name="mother_name"
          placeholder="Mother Name"
          value={proposalInput.mother_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Spouse Name"
          name="spouse_name"
          placeholder="Spouse Name"
          value={proposalInput.spouse_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Email Address"
          name="email"
          placeholder="Email Address"
          value={proposalInput.email}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Mobile No"
          name="mobile_no"
          placeholder="Mobile No"
          value={proposalInput.mobile_no}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Select
          options={[
            {
              label: "Marred",
              value: "marred",
            },
            {
              label: "Unmarried",
              value: "unmarried",
            },
            {
              label: "Widower",
              value: "widower",
            },
            {
              label: "Widow",
              value: "widow",
            },
            {
              label: "Divorced",
              value: "divorced",
            },
            {
              label: "Separated",
              value: "separated",
            },
          ]}
          isSearchable={true}
          name="marital_status"
          label="Marital Status"
          defaultValue=""
          placeholder="Marital Status"
          handleChangeValue={handleChangeTextInput}
        />

        <Select
          options={[
            {
              label: "NID",
              value: "nid",
            },
            {
              label: "BRC",
              value: "brc",
            },
            {
              label: "PASSPORT",
              value: "passport",
            },
          ]}
          isSearchable={true}
          name="identity_type"
          label="Identity Type"
          defaultValue=""
          placeholder="Identity Type"
          handleChangeValue={handleChangeTextInput}
        />

        <Select
          options={[
            {
              label: "Male",
              value: "male",
            },
            {
              label: "Female",
              value: "female",
            },
            {
              label: "Others",
              value: "others",
            },
          ]}
          isSearchable={true}
          name="gender"
          label="Gender"
          defaultValue=""
          placeholder="Gender"
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="ID No"
          name="id_no"
          placeholder="ID No"
          value={proposalInput.id_no}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Date of Birth"
          name="dob"
          placeholder="Date of Birth"
          value={proposalInput.dob}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Occupation"
          name="occupation"
          placeholder="Occupation"
          value={proposalInput.occupation}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Relation"
          name="relation"
          placeholder="Relation"
          value={proposalInput.relation}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Height"
          name="height"
          placeholder="Height"
          value={proposalInput.height}
          isRequired={true}
          inputChange={handleChangeTextInput}
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
          label="Height Unit"
          defaultValue=""
          placeholder="Height Unit"
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="Weight"
          name="weight"
          placeholder="Weight"
          value={proposalInput.weight}
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
          defaultValue=""
          placeholder="Weight Unit"
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="Allocation"
          name="allocation"
          placeholder="Allocation"
          value={proposalInput.allocation}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />
      </div>
    </div>
  );
}
