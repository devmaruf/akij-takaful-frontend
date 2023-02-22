import * as React from "react";
import Input from "@/components/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";

export interface IBankInformation {
  handleChangeTextInput: (name: string, value: any) => void;
}

export function BankInformation({ handleChangeTextInput }: IBankInformation) {
  const dispatch = useDispatch();
  const { proposalInput, planList, isSubmitting } = useSelector(
    (state: RootState) => state.Proposal
  );

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-2xl">
        Bank Information
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
          label="Bank Name"
          name="bank_name"
          placeholder="Bank Name"
          value={proposalInput.bank_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Select
          options={[
            {
              label: "Branch 01",
              value: "branch-01",
            },
            {
              label: "Branch 02",
              value: "branch-02",
            },
          ]}
          isSearchable={true}
          name="bank_branch_name"
          label="Branch Name"
          defaultValue=""
          placeholder="Branch Name"
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="Account No"
          name="bank_account_no"
          placeholder="Account No"
          value={proposalInput.bank_account_no}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Account Holder Name"
          name="bank_account_holder_name"
          placeholder="Account Holder Name"
          value={proposalInput.bank_account_holder_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />
      </div>
    </div>
  );
}
