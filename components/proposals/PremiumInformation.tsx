import Input from "@/components/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import React, { useEffect, useState } from "react";
import { getAgentsDropdownList } from "@/redux/actions/employee-action";


export interface IPremiumInformation {
  handleChangeTextInput: (name: string, value: any) => void;
  errors?: any;
}

export function PremiumInformation({ handleChangeTextInput, errors }: IPremiumInformation) {
  const dispatch = useDispatch();
  const { projectDropdownList } = useSelector((state: RootState) => state.Project);
  const { branchDropdownList } = useSelector((state: RootState) => state.Branch);
  const { proposalInput, planDropdownList } = useSelector((state: RootState) => state.proposal);
  const { agentsDropdownList } = useSelector((state: RootState) => state.employee);

  const [placeHolderProposalNo, setplaceHolderProposalNo] = useState('');

  // useEffect(() => {
  //   const formattedDate = format(new Date(), 'yyyyMMdd');
  //   const randomNumber = Math.floor(10000 + Math.random() * 90000);
  //   setplaceHolderProposalNo(`ATLI-${formattedDate}-${randomNumber}`);
  // }, []);

  useEffect(() => {
    dispatch(getAgentsDropdownList());
  }, [])

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-2xl">
        Premium Information
      </h3>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">
        <Input
          label="Proposal No"
          name="proposal_no"
          placeholder={`Proposal No - ${placeHolderProposalNo}`}
          value={proposalInput?.proposal_no || placeHolderProposalNo}
          isRequired={true}
          inputChange={handleChangeTextInput}
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
          handleChangeValue={handleChangeTextInput}
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
          handleChangeValue={handleChangeTextInput}
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
          handleChangeValue={handleChangeTextInput}
        />
        <Input
          label="Proposer Name"
          name="proposer_name"
          placeholder='Proposer Name'
          value={proposalInput?.proposer_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />
        <Input
          label="Proposer Phone no"
          name="phone_no"
          placeholder='Proposer Phone no'
          value={proposalInput?.phone_no}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />
        <Input
          label="Initial Sum Assured"
          name="initial_sum_assured"
          placeholder="Initial Sum Assured"
          value={proposalInput?.initial_sum_assured}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Input
          label="Initial Premium"
          name="initial_premium"
          placeholder="Initial Premium"
          value={proposalInput?.initial_premium}
          isRequired={true}
          inputChange={handleChangeTextInput}
          errors={errors}
        />
        <Select
          options={agentsDropdownList}
          isSearchable={true}
          isRequired={true}
          name="agent_id"
          label="Agent"
          defaultValue={proposalInput?.agent_id}
          placeholder='Select Agent...'
          handleChangeValue={handleChangeTextInput}
        />
      </div>
    </div>
  );
}
