import React, { useEffect} from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import Input from '@/components/input';
import { changeInputValue, updateProposal, getProposalDetails, getPlanDropdownList } from '@/redux/actions/proposal-action';
import Select from '@/components/select';
import Button from '@/components/button';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContent } from '@/components/layouts/PageContent';
import { getAgentsDropdownList } from '@/redux/actions/employee-action';
import { getProjectListDropdown } from '@/redux/actions/project-action';
import { getBranchDropdownList } from '@/redux/actions/branch-action';

export default function CreateBasicPage() {
  const router = useRouter()
  const { id } = router.query;
  const pageType = router.query?.mode === 'edit' ? 'edit' : 'create';
  const dispatch = useDispatch();
  const { proposalInput, planDropdownList, isSubmitting, loadingDetails } = useSelector((state: RootState) => state.proposal);
  const { agentsDropdownList } = useSelector((state: RootState) => state.employee);
  const { projectDropdownList } = useSelector((state: RootState) => state.Project);
  const { branchDropdownList } = useSelector((state: RootState) => state.Branch);

  useEffect(() => {
    dispatch(getPlanDropdownList());
    dispatch(getProjectListDropdown());
    dispatch(getBranchDropdownList());
    dispatch(getAgentsDropdownList());
  }, [dispatch])

  const handleChangeTextInput = (name: string, value: any) => {
    dispatch(changeInputValue(name, value));
  };

  const handleUpdateProposal = (e) => {
    dispatch(updateProposal(proposalInput, id, router));
    e.preventDefault();
  }

  useEffect(() => {
    dispatch(getProposalDetails(id))
  }, [id]);

  return (
    <div>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
          <PageHeader
            title={pageType === 'create' ? 'New Proposal' : 'Edit Proposal'}
            hasSearch={false}
          />

          <PageContent>
            {
              loadingDetails ?
                <div className="text-center">
                  <Loading loadingTitle="Proposal" />
                </div> :
                <form method="post" autoComplete="off">
                  <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">
                    <Input
                      label="Proposal No"
                      name="proposal_no"
                      placeholder='Proposal No'
                      value={proposalInput && proposalInput.proposal_no ? proposalInput.proposal_no : ""}
                      isRequired={true}
                      isDisabled={true}
                    />
                    <Select
                      options={projectDropdownList}
                      isSearchable={true}
                      isRequired={true}
                      name="project_id"
                      label="Bank"
                      defaultValue={proposalInput && proposalInput.project_id ? proposalInput.project_id : ""}
                      placeholder="Select Bank..."
                      handleChangeValue={handleChangeTextInput}
                    />
                    <Select
                      options={branchDropdownList}
                      isSearchable={true}
                      isRequired={true}
                      name="branch_id"
                      label="Branch"
                      defaultValue={proposalInput && proposalInput.branch_id ? proposalInput.branch_id : ""}
                      placeholder="Select Branch..."
                      handleChangeValue={handleChangeTextInput}
                    />
                    <Select
                      options={planDropdownList}
                      isSearchable={true}
                      isRequired={true}
                      name="plan_id"
                      label="Plan"
                      defaultValue={proposalInput && proposalInput.plan_id ? proposalInput.plan_id : ""}
                      placeholder='Select Plan...'
                      handleChangeValue={handleChangeTextInput}
                    />
                    <Input
                      label="Proposer Name"
                      name="proposer_name"
                      placeholder='Proposer Name'
                      value={proposalInput && proposalInput.proposer_name ? proposalInput.proposer_name : ""}
                      isRequired={true}
                      inputChange={handleChangeTextInput}
                    />
                    <Input
                      label="Proposer Phone no"
                      name="phone_no"
                      placeholder='Proposer Phone no'
                      value={proposalInput && proposalInput.phone_no ? proposalInput.phone_no : ""}
                      isRequired={true}
                      inputChange={handleChangeTextInput}
                    />
                    <Input
                      label="Initial Sum Assured"
                      name="initial_sum_assured"
                      placeholder='Initial Sum Assured'
                      value={proposalInput && proposalInput.initial_sum_assured ? proposalInput.initial_sum_assured : ""}
                      isRequired={true}
                      inputChange={handleChangeTextInput}
                    />
                    <Input
                      label="Initial Premium"
                      name="initial_premium"
                      placeholder='Initial Premium'
                      value={proposalInput && proposalInput.initial_premium ? proposalInput.initial_premium : ""}
                      isRequired={true}
                      inputChange={handleChangeTextInput}
                    />
                    <Select
                      options={agentsDropdownList}
                      isSearchable={true}
                      isRequired={true}
                      name="agent_id"
                      label="Agent"
                      defaultValue={proposalInput && proposalInput.agent_id ? proposalInput.agent_id : ""}
                      placeholder='Select Agent...'
                      handleChangeValue={handleChangeTextInput}
                    />
                  </div>

                  <Button
                    title='Save'
                    onClick={(e: any) => handleUpdateProposal(e)}
                    loadingTitle="Saving..."
                    loading={isSubmitting}
                  />
                </form>
            }
          </PageContent>
        </div>
      </div>
    </div>
  )
}
