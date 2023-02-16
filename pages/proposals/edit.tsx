import React from 'react';
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import IBreadcrumb from '@/components/breadcrumb';
import IPageTitle from '@/components/pageTitle';
import IInput from '@/components/input';
import { getPlanList, handleChangeProposalInput, updateProposal, getProposalDetails } from '@/redux/actions/ProposalsAction';
import ISelect from '@/components/select';
import IButton from '@/components/button';
import ILoading from '@/components/loading';

export default function Edit() {
  const router = useRouter()
  const { id } = router.query
  const dispatch = useDispatch();
  const { proposalInput, planList, isSubmitting, loadingDetails } = useSelector((state: RootState) => state.proposal);

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
            <IBreadcrumb />
            <IPageTitle title="Edit proposal" />
          </div>

          <div className="mt-2">
            <div className='border border-gray-200 p-2.5 rounded-md shadow-md'>
              {
                loadingDetails === false ?
                  <div className="text-center">
                    <ILoading loadingTitle="Proposal data" />
                  </div> :
                  <form
                    method="post"
                    autoComplete="off"
                    encType="multipart/form-data"
                  >
                    <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">
                      <IInput
                        label="Proposal No"
                        name="proposal_no"
                        placeholder='Proposal No'
                        value={proposalInput && proposalInput.proposal_no ? proposalInput.proposal_no : ""}
                        isRequired={true}
                        inputChange={handleChangeTextInput}
                      />
                      <IInput
                        label="Proposal Name"
                        name="proposer_name"
                        placeholder='Proposal Name'
                        value={proposalInput && proposalInput.proposer_name ? proposalInput.proposer_name : ""}
                        isRequired={true}
                        inputChange={handleChangeTextInput}
                      />
                      <ISelect
                        options={planList}
                        isSearchable={true}
                        name="plan_id"
                        label="Plan"
                        defaultValue=""
                        placeholder='Select Plan...'
                        handleChangeValue={handleChangeTextInput}
                      />
                      <IInput
                        label="FA Code"
                        name="fa_code"
                        placeholder='FA Code'
                        value={proposalInput && proposalInput.fa_code ? proposalInput.fa_code : ""}
                        isRequired={true}
                        inputChange={handleChangeTextInput}
                      />
                      <IInput
                        label="Initial Sum Assured"
                        name="initial_sum_assured"
                        placeholder='Initial Sum Assured'
                        value={proposalInput && proposalInput.initial_sum_assured ? proposalInput.initial_sum_assured : ""}
                        isRequired={true}
                        inputChange={handleChangeTextInput}
                      />
                      <IInput
                        label="Initial Premium"
                        name="initial_premium"
                        placeholder='Initial Premium'
                        value={proposalInput && proposalInput.initial_premium ? proposalInput.initial_premium : ""}
                        isRequired={true}
                        inputChange={handleChangeTextInput}
                      />
                      {/* <IInput
                      label="Mobile No"
                      name="mobile_no"
                      placeholder='Mobile No'
                      value={proposalInput.mobile_no}
                      isRequired={true}
                      inputChange={handleChangeTextInput}
                  /> */}
                    </div>

                    <IButton title='Update Proposal' onClick={(e) => handleUpdateProposal(e)} loadingTitle="Updating..." loading={isSubmitting} />
                  </form>
              }

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}