import * as React from "react";
import Input from "@/components/input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import { relationList } from "@/utils/proposal-dropdowns";
export interface IGuardianInformation {
  handleChangeTextInput: (name: string, value: any, key: string, index: number) => void;
  errors?: any;
  key: string;
  index?: any;
}

export function NomineeGuardianInformation({ handleChangeTextInput, errors, index, key }: IGuardianInformation) {

  const { proposalInput } = useSelector((state: RootState) => state.proposal);
  const changeNomineeInputVal = (name: string, value: any) => {
    handleChangeTextInput(name, value, key, index)
  }

  return (
    <div className="border border-gray-200 rounded-md shadow-md mt-3">
      <div className="bg-white text-cyan-600 mb-3 text-sm border border-gray-200">
        <h3 className="p-2">  Nominee Guardian Information</h3>
      </div>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-4 p-2">
        <Input
          label="Guardian Name"
          name="name"
          placeholder="Guardian Name"
          value={proposalInput.proposer_nominees[index].proposer_guardian.name}
          isRequired={true}
          inputChange={changeNomineeInputVal}
          errors={errors}
        />

        <Input
          label="Mobile No"
          name="phone_no"
          placeholder="Mobile No"
          value={proposalInput.proposer_nominees[index].proposer_guardian.phone_no}
          isRequired={true}
          inputChange={changeNomineeInputVal}
          errors={errors}
        />

        <Input
          label="Date of Birth"
          name="dob"
          type="date"
          placeholder="Date of Birth"
          value={proposalInput.proposer_nominees[index].proposer_guardian.dob}
          isRequired={true}
          inputChange={changeNomineeInputVal}
          errors={errors}
        />

        <Input
          label="ID No"
          name="id_no"
          placeholder="ID No"
          value={proposalInput.proposer_nominees[index].proposer_guardian.id_no}
          isRequired={true}
          inputChange={changeNomineeInputVal}
          errors={errors}
        />

        {/* <Input
          label="Relation"
          name="relation"
          placeholder="Relation"
          value={proposalInput.proposer_nominees[index].proposer_guardian.relation}
          isRequired={true}
          inputChange={changeNomineeInputVal}
        /> */}
        <Select
          options={relationList}
          isSearchable={true}
          name="relation"
          label="Relation"
          isRequired={true}
          defaultvalue={proposalInput.proposer_nominees[index].proposer_guardian.relation}
          placeholder="Select Relation"
          handleChangeValue={changeNomineeInputVal}
          errors={errors}
        />
      </div>
    </div>
  );
}
