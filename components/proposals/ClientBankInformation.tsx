import { useSelector } from "react-redux";

import Input from "@/components/input";
import { RootState } from "@/redux/store";
import { IProposalFormSection } from "@/redux/interfaces";
import SectionTitle from "../sectionTitle";
import Select from '@/components/select';

export default function ClientBankInformation({ onChangeText, errors }: IProposalFormSection) {
  const { proposalInput } = useSelector((state: RootState) => state.proposal);
  const { branchDropdownList } = useSelector((state: RootState) => state.Branch);

  const { proposer_bank_information: bankInformation } = proposalInput;
  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <SectionTitle title="Client's Bank Information" />
      <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
        <Input
          label="Bank Name"
          name="bank_name"
          placeholder="Bank Name"
          value={proposalInput?.project_name || ''}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
          isDisabled={true}
        />

        {/* <Input
          label="Branch Name"
          name="bank_branch_name"
          placeholder="Branch Name"
          value={bankInformation?.bank_branch_name ?? ''}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        /> */}
        <Select
          options={branchDropdownList}
          isSearchable={true}
          name="branch_id"
          label="Branch"
          defaultValue={bankInformation?.branch_id}
          placeholder="Select Branch..."
          isRequired={true}
          errors={errors}
          handleChangeValue={onChangeText}
        />

        <Input
          label="Account Holder Name"
          name="bank_account_holder_name"
          placeholder="Account Holder Name"
          value={bankInformation.bank_account_holder_name || proposalInput?.proposer_name || ''}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
          isDisabled={bankInformation.bank_account_holder_name || proposalInput?.proposer_name || false}
        />

        <Input
          label="Account No"
          type="number"
          name="bank_account_no"
          placeholder="Account No"
          value={bankInformation.bank_account_no ?? ''}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />
      </div>
    </div>
  );
}
