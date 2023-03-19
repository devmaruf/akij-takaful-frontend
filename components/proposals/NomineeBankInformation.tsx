import * as React from "react";
import Input from "@/components/input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";

export interface IBankInformation {
  handleChangeTextInput: (name: string, value: any) => void;
  errors?: any;
}

export function NomineeBankInformation({ handleChangeTextInput, errors }: IBankInformation) {
  const { proposalInput } = useSelector((state: RootState) => state.proposal);

  return (
    <div className="border border-gray-200 rounded-md shadow-md mt-3">
      <div className="bg-white text-cyan-600 mb-3 text-sm border border-gray-200">
        <h3 className="p-2">  Nominee bank Information</h3>
      </div>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-4 p-2">
        <Input
          label="Bank Name"
          name="bank_name"
          placeholder="Bank Name"
          value={proposalInput?.proposer_bank_information.bank_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
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
          defaultValue={proposalInput?.proposer_guardian.bank_branch_name}
          placeholder="Branch Name"
          handleChangeValue={handleChangeTextInput}
          errors={errors}
        />

        <Input
          label="Account No"
          type="number"
          name="bank_account_no"
          placeholder="Account No"
          value={proposalInput?.proposer_bank_information.bank_account_no}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />

        <Input
          label="Account Holder Name"
          name="bank_account_holder_name"
          placeholder="Account Holder Name"
          value={proposalInput?.proposer_bank_information.bank_account_holder_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
      </div>
    </div>
  );
}
