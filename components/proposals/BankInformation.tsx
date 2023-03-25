import { useSelector } from "react-redux";

import Input from "@/components/input";
import { RootState } from "@/redux/store";
import { IProposalFormSection } from "@/redux/interfaces";

export function BankInformation({ onChangeText, errors }: IProposalFormSection) {
  const { proposalInput } = useSelector((state: RootState) => state.proposal);
  const { proposer_bank_information: bankInformation } = proposalInput;

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-2xl">
        Bank Information
      </h3>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">
        <Input
          label="Bank Name"
          name="bank_name"
          placeholder="Bank Name"
          value={bankInformation.bank_name}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />

        <Input
          label="Branch Name"
          name="bank_branch_name"
          placeholder="Branch Name"
          value={bankInformation.bank_branch_name}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />

        <Input
          label="Account No"
          type="number"
          name="bank_account_no"
          placeholder="Account No"
          value={bankInformation.bank_account_no}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />

        <Input
          label="Account Holder Name"
          name="bank_account_holder_name"
          placeholder="Account Holder Name"
          value={bankInformation.bank_account_holder_name}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />
      </div>
    </div>
  );
}
