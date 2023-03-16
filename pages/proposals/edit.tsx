import React from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Breadcrumb from '@/components/breadcrumb';
import PageTitle from '@/components/pageTitle';
import Input from '@/components/input';
import { getPlanList, handleChangeProposalInput, updateProposal, getProposalDetails } from '@/redux/actions/proposal-action';
import Select from '@/components/select';
import Button from '@/components/button';
import Loading from '@/components/loading';

export default function Edit() {
  const router = useRouter()
  const { id } = router.query;
  const dispatch = useDispatch();
  const { proposalInput, planList, isSubmitting, loadingDetails } = useSelector((state: RootState) => state.Proposal);

  React.useEffect(() => {
    dispatch(getPlanList())
  }, [dispatch])

  const handleChangeTextInput = (name: string, value: any) => {
    dispatch(handleChangeProposalInput(name, value));
  };

  const handleUpdateProposal = (e) => {
    dispatch(updateProposal(proposalInput, id));
    e.preventDefault();
  }

  React.useEffect(() => {
    dispatch(getProposalDetails(id))
  }, [id, dispatch]);

  return (
    <div>

      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb />
            <PageTitle title="Edit proposal" />
          </div>

          <div className="mt-2">
            <div className='border border-gray-200 p-2.5 rounded-md shadow-md'>
              {
                loadingDetails === false ?
                  <div className="text-center">
                    <Loading loadingTitle="Proposal data" />
                  </div> :
                  <form
                    method="post"
                    autoComplete="off"
                    encType="multipart/form-data"
                  >
                    <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">
                      <Input
                        label="Proposal No"
                        name="proposal_no"
                        placeholder='Proposal No'
                        value={proposalInput && proposalInput.proposal_no ? proposalInput.proposal_no : ""}
                        isRequired={true}
                        inputChange={handleChangeTextInput}
                      />
                      <Input
                        label="Proposal Name"
                        name="proposer_name"
                        placeholder='Proposal Name'
                        value={proposalInput && proposalInput.proposer_name ? proposalInput.proposer_name : ""}
                        isRequired={true}
                        inputChange={handleChangeTextInput}
                      />
                      <Select
                        options={planList}
                        isSearchable={true}
                        name="plan_id"
                        label="Plan"
                        defaultValue={proposalInput && proposalInput.plan_id ? proposalInput.plan_id : ""}
                        placeholder='Select Plan...'
                        handleChangeValue={handleChangeTextInput}
                      />
                      <Input
                        label="FA Code"
                        name="fa_code"
                        placeholder='FA Code'
                        value={proposalInput && proposalInput.fa_code ? proposalInput.fa_code : ""}
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
                      {/* <Input
                      label="Mobile No"
                      name="mobile_no"
                      placeholder='Mobile No'
                      value={proposalInput?.mobile_no}
                      isRequired={true}
                      inputChange={handleChangeTextInput}
                  /> */}
                    </div>

                    <Button title='Update Proposal' onClick={(e) => handleUpdateProposal(e)} loadingTitle="Updating..." loading={isSubmitting} />
                  </form>
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
