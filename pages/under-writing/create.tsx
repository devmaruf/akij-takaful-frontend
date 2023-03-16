import { useEffect } from 'react';
import IBreadcrumb from '@/components/breadcrumb';
import PageTitle from '@/components/pageTitle';
import Input from '@/components/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getPlanList, handleChangeProposalInput, submitProposal } from '@/redux/actions/proposal-action';
import Select from '@/components/select';
import Button from '@/components/button';

export default function Create() {

    const dispatch = useDispatch();
    const { proposalInput, planList, isSubmitting } = useSelector((state: RootState) => state.Proposal);

    useEffect(() => {
        dispatch(getPlanList())
    }, [dispatch])

    
    const handleChangeTextInput = (name: string, value: any) => {
        dispatch(handleChangeProposalInput(name, value));
    };

    const handleSubmitProposal = (e) => {
        dispatch(submitProposal(proposalInput));
        e.preventDefault();
    }

    return (
        <div>

            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <IBreadcrumb />
                        <PageTitle title="create proposals" />
                    </div>

                    <div className="mt-2">
                        <div className='border border-gray-200 p-2.5 rounded-md shadow-md'>
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
                                        value={proposalInput.proposal_no}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                    <Input
                                        label="Proposal Name"
                                        name="proposer_name"
                                        placeholder='Proposal Name'
                                        value={proposalInput.proposer_name}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                    <Select
                                        options={planList}
                                        isSearchable={true}
                                        name="plan_id"
                                        label="Plan"
                                        defaultValue={proposalInput.plan_id}
                                        placeholder='Select Plan...'
                                        handleChangeValue={handleChangeTextInput}
                                    />
                                    <Input
                                        label="FA Code"
                                        name="fa_code"
                                        placeholder='FA Code'
                                        value={proposalInput.fa_code}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                    <Input
                                        label="Initial Sum Assured"
                                        name="initial_sum_assured"
                                        placeholder='Initial Sum Assured'
                                        value={proposalInput.initial_sum_assured}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                    <Input
                                        label="Initial Premium"
                                        name="initial_premium"
                                        placeholder='Initial Premium'
                                        value={proposalInput.initial_premium}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                    {/* <Input
                                        label="Mobile No"
                                        name="mobile_no"
                                        placeholder='Mobile No'
                                        value={proposalInput.mobile_no}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    /> */}
                                </div>

                                <Button title='Submit Proposal' loadingTitle="Submitting..." onClick={(e) => handleSubmitProposal(e)} loading={isSubmitting} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}