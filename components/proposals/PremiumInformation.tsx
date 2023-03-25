import { useSelector } from "react-redux";
import Input from "@/components/input";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import { IProposalFormSection } from "@/redux/interfaces";

export function PremiumInformation({ onChangeText, errors }: IProposalFormSection) {
  const { projectDropdownList } = useSelector((state: RootState) => state.Project);
  const { branchDropdownList } = useSelector((state: RootState) => state.Branch);
  const { proposalInput, planDropdownList } = useSelector((state: RootState) => state.proposal);
  const { agentsDropdownList } = useSelector((state: RootState) => state.employee);

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-1">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-2xl">
        Premium Information
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
        <Select
          options={projectDropdownList}
          isSearchable={true}
          name="project_id"
          label="Bank"
          defaultValue={proposalInput?.project_id}
          placeholder="Select Bank..."
          isRequired={true}
          errors={errors}
          handleChangeValue={onChangeText}
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
        <Select
          options={planDropdownList}
          isSearchable={true}
          name="plan_id"
          label="Plan"
          defaultValue={proposalInput?.plan_id}
          placeholder="Select Plan..."
          isRequired={true}
          errors={errors}
          handleChangeValue={onChangeText}
        />
        <Input
          type="number"
          label="Initial Sum Assured"
          name="initial_sum_assured"
          placeholder="Initial Sum Assured"
          value={proposalInput?.initial_sum_assured}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
          minValue={0}
        />
        <Input
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
        />
        <Select
          options={agentsDropdownList}
          isSearchable={true}
          isRequired={true}
          name="agent_id"
          label="Agent"
          defaultValue={proposalInput?.agent_id}
          placeholder='Select Agent...'
          handleChangeValue={onChangeText}
        />
      </div>
    </div>
  );
}
