import * as React from "react";
import Input from "@/components/input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
export interface IGuardianInformation {
  handleChangeTextInput: (name: string, value: any) => void;
}

export function GuardianInformation({ handleChangeTextInput }: IGuardianInformation) {

  const { proposalInput } = useSelector((state: RootState) => state.proposal);
  const nomineeList = [
    { label: "Mr. Rahim", value: 1 },
    { label: "Mr. Karim", value: 2 },
    { label: "Mr. Abul Kalam", value: 3 },
    { label: "Mr. Zihad", value: 4 }
  ]


  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-2xl">
        Guardian Information
      </h3>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">
        <Select
          options={nomineeList}
          isSearchable={true}
          name="proposal_nominee_id"
          value={proposalInput.proposer_guardian.proposal_nominee_id}
          label="Proposal Nominee"
          defaultValue=""
          placeholder="Nominee Name"
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="Guardian Name"
          name="name"
          placeholder="Guardian Name"
          value={proposalInput.proposer_guardian.name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Mobile No"
          name="phone_no"
          placeholder="Mobile No"
          value={proposalInput.proposer_guardian.phone_no}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Date of Birth"
          name="dob"
          type="date"
          placeholder="Date of Birth"
          value={proposalInput.proposer_guardian.dob}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="ID No"
          name="id_no"
          placeholder="ID No"
          value={proposalInput.proposer_guardian.id_no}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Relation"
          name="relation"
          placeholder="Relation"
          value={proposalInput.proposer_guardian.relation}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />
      </div>
    </div>
  );
}
