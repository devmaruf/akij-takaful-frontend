import * as React from "react";
import Input from "@/components/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";

export interface IGuardianInformation {
  handleChangeTextInput: (name: string, value: any) => void;
}

export function GuardianInformation({
  handleChangeTextInput,
}: IGuardianInformation) {
  const dispatch = useDispatch();
  const { proposalInput, planList, isSubmitting } = useSelector(
    (state: RootState) => state.Proposal
  );

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-2xl">
        Guardian Information
      </h3>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">
        <Select
          options={[
            {
              label: "Nominee 01",
              value: "nominee-01",
            },
            {
              label: "Nominee 02",
              value: "nominee-02",
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
          label="Guardian Name"
          name="name"
          placeholder="Guardian Name"
          value={proposalInput.name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Mobile No"
          name="phone_no"
          placeholder="Mobile No"
          value={proposalInput.phone_no}
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
          label="ID No"
          name="id_no"
          placeholder="ID No"
          value={proposalInput.id_no}
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
      </div>
    </div>
  );
}
