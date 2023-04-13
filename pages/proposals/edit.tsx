import { useCallback, useEffect } from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { debounce } from 'lodash';

import { RootState } from '@/redux/store';
import Input from '@/components/input';
import { changeInputValue, updateProposal, getProposalDetails } from '@/redux/actions/proposal-action';
import Select from '@/components/select';
import Button from '@/components/button';
import Loading from '@/components/loading';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContent } from '@/components/layouts/PageContent';
import { getAgentsDropdownList } from '@/redux/actions/employee-action';
import { getBranchDropdownList } from '@/redux/actions/branch-action';
import { useDebounced } from '@/hooks/use-debounce';
import BankSelect from '@/components/banks/BankSelect';

export default function ProposalBasicEditPage() {
  const router = useRouter()
  const { id } = router.query;
  const dispatch = useDispatch();
  const { proposalInput, isSubmitting, loadingDetails } = useSelector((state: RootState) => state.proposal);
  const { agentsDropdownList } = useSelector((state: RootState) => state.employee);
  const { branchDropdownList } = useSelector((state: RootState) => state.Branch);

  useDebounced(() => {
    dispatch(getBranchDropdownList());
    dispatch(getAgentsDropdownList());
  });


  const handleChangeTextInput = (name: string, value: any) => {
    dispatch(changeInputValue(name, value, ''));
  };

  const handleUpdateProposal = (e: any) => {
    e.preventDefault();
    dispatch(updateProposal(proposalInput, id, router));
  }

  const debouncedDispatch = useCallback(
    debounce(() => {
      dispatch(getProposalDetails(id));
    }, 500),
    [id]
  );

  useEffect(() => {
    debouncedDispatch();
    return debouncedDispatch.cancel;
  }, [debouncedDispatch]);

  return (
    <div>
      <PageHeader
        title={'Enlist Proposal'}
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
                  value={proposalInput?.proposal_no ?? ''}
                  isRequired={true}
                  isDisabled={true}
                />
                <BankSelect
                  defaultValue={proposalInput?.project_id ?? ''}
                  changeTextInput={handleChangeTextInput}
                />
                <Select
                  options={branchDropdownList}
                  isSearchable={true}
                  isRequired={true}
                  name="branch_id"
                  label="Branch"
                  defaultValue={proposalInput?.branch_id ?? ''}
                  placeholder="Select Branch..."
                  handleChangeValue={handleChangeTextInput}
                />
                <Input
                  label="Proposer Name"
                  name="proposer_name"
                  placeholder='Proposer Name'
                  value={proposalInput?.proposer_name ?? ''}
                  isRequired={true}
                  inputChange={handleChangeTextInput}
                />
                <Input
                  label="Proposer Phone no"
                  name="phone_no"
                  placeholder='Proposer Phone no'
                  value={proposalInput?.phone_no ?? ''}
                  isRequired={true}
                  inputChange={handleChangeTextInput}
                />
                <Input
                  type='number'
                  label="Initial Sum Assured"
                  name="initial_sum_assured"
                  placeholder='Initial Sum Assured'
                  value={proposalInput?.initial_sum_assured ?? ''}
                  isRequired={true}
                  inputChange={handleChangeTextInput}
                  minValue={0}
                />
                <Input
                  type='number'
                  label="Initial Premium"
                  name="initial_premium"
                  placeholder='Initial Premium'
                  value={proposalInput?.initial_premium ?? ''}
                  isRequired={true}
                  inputChange={handleChangeTextInput}
                  minValue={0}
                  maxValue={proposalInput?.initial_sum_assured ?? ''}
                />
                <Select
                  options={agentsDropdownList}
                  isSearchable={true}
                  name="agent_id"
                  label="Introducer/Seller"
                  defaultValue={proposalInput?.agent_id ?? ''}
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
  )
}
