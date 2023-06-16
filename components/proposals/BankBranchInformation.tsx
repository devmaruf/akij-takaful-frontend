import { useSelector } from "react-redux";

import { RootState } from "@/redux/store";
import { IProposalFormSection } from "@/redux/interfaces";
import Input from "@/components/input";
import Select from "@/components/select";
import BankSelect from "@/components/banks/BankSelect";
import SectionTitle from "../sectionTitle";

export default function BankBranchInformation({ onChangeText, errors }: IProposalFormSection) {
  const { branchDropdownList } = useSelector((state: RootState) => state.Branch);
  const { proposalInput } = useSelector((state: RootState) => state.proposal);
  const { agentsDropdownList } = useSelector((state: RootState) => state.employee);

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-1">
      <SectionTitle title="Bank & Branch Information"/>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
        <Input
          label="Proposal No"
          name="proposal_no"
          value={proposalInput?.proposal_no}
          isRequired={true}
          isDisabled={true}
          inputChange={onChangeText}
          errors={errors}
        />
        <BankSelect
              defaultValue={proposalInput?.project_id}
              changeTextInput={onChangeText}
          />
        <Select
          options={branchDropdownList}
          isSearchable={true}
          name="branch_id"
          label="Branch"
          defaultValue={proposalInput?.branch_id}
          placeholder="Select Branch..."
          isRequired={true}
          errors={errors}
          handleChangeValue={onChangeText}
        />
        <Select
          options={agentsDropdownList}
          isSearchable={true}
          isRequired={true}
          name="agent_id"
          label="Introducer/Seller"
          defaultValue={proposalInput?.agent_id}
          placeholder='Select Seller...'
          handleChangeValue={onChangeText}
        />
      </div>
    </div>
  );
}
