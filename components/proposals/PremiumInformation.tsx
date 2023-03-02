import Input from "@/components/input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import { format } from 'date-fns';
import { useEffect, useState } from "react";


export interface IPremiumInformation {
  handleChangeTextInput: (name: string, value: any) => void;
}

export function PremiumInformation({
  handleChangeTextInput,
}: IPremiumInformation) {
  const { projectDropdownList } = useSelector(
    (state: RootState) => state.Project
  );
  const { branchDropdownList } = useSelector(
    (state: RootState) => state.Branch
  );
  const { proposalInput, planDropdownList } = useSelector(
    (state: RootState) => state.proposal
  );

  const [placeHolderProposalNo, setplaceHolderProposalNo] = useState('');
  useEffect(() => {
    const formattedDate = format(new Date(), 'yyyyMMdd');
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    setplaceHolderProposalNo(`ATLI-${formattedDate}-${randomNumber}`);
  }, []);

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
          value={proposalInput.proposal_no || placeHolderProposalNo}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />
        <Select
          options={planDropdownList}
          isSearchable={true}
          name="plan_id"
          label="Plan"
          defaultValue=""
          placeholder="Select Plan..."
          isRequired={true}
          handleChangeValue={handleChangeTextInput}
        />
        <Select
          options={projectDropdownList}
          isSearchable={true}
          name="project_id"
          label="Bank"
          defaultValue=""
          placeholder="Select Bank..."
          isRequired={true}
          handleChangeValue={handleChangeTextInput}
        />
        <Select
          options={branchDropdownList}
          isSearchable={false}
          name="branch_id"
          label="Branch"
          defaultValue=""
          placeholder="Select Branch..."
          isRequired={true}
          handleChangeValue={handleChangeTextInput}
        />
        <Input
          label="FA Code"
          name="fa_code"
          placeholder="FA Code"
          value={proposalInput.fa_code}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />
        <Input
          label="Initial Sum Assured"
          name="initial_sum_assured"
          placeholder="Initial Sum Assured"
          value={proposalInput.initial_sum_assured}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />
        <Input
          label="Initial Premium"
          name="initial_premium"
          placeholder="Initial Premium"
          value={proposalInput.initial_premium}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />
      </div>
    </div>
  );
}
