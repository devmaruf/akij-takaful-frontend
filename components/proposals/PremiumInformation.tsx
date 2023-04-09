import { useSelector } from "react-redux";

import Input from "@/components/input";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import { IProposalFormSection } from "@/redux/interfaces";
import BankSelect from "@/components/banks/BankSelect";

export function PremiumInformation({ onChangeText, errors }: IProposalFormSection) {
  const { branchDropdownList } = useSelector((state: RootState) => state.Branch);
  const { proposalInput } = useSelector((state: RootState) => state.proposal);
  const { agentsDropdownList } = useSelector((state: RootState) => state.employee);
  const { productDropdownList } = useSelector((state: RootState) => state.product);

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-1">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-2xl">
        Bank & Branch Information
      </h3>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">
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
          isSearchable={false}
          name="branch_id"
          label="Branch"
          defaultValue={proposalInput?.branch_id}
          placeholder="Select Branch..."
          isRequired={true}
          errors={errors}
          handleChangeValue={onChangeText}
        />
        {/* <Select
          options={productDropdownList}
          isSearchable={true}
          name="product_id"
          label="Product"
          defaultValue={proposalInput?.product_id}
          placeholder="Select Product..."
          isRequired={true}
          errors={errors}
          handleChangeValue={onChangeText}
        /> */}
        {/* <Input
          type="number"
          label="Initial Sum Assured"
          name="initial_sum_assured"
          placeholder="Initial Sum Assured"
          value={proposalInput?.initial_sum_assured}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
          minValue={0}
        /> */}
        {/* <Input
          type="number"
          label="Initial Premium"
          name="initial_premium"
          placeholder="Initial Premium"
          value={proposalInput?.initial_premium}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
          minValue={0}
          maxValue={proposalInput?.initial_sum_assured}
        /> */}
        <Select
          options={agentsDropdownList}
          isSearchable={true}
          isRequired={true}
          name="agent_id"
          label="Introducer/Seller"
          defaultValue={proposalInput?.agent_id}
          placeholder='Select Agent...'
          handleChangeValue={onChangeText}
        />
      </div>
    </div>
  );
}
