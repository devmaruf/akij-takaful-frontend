import Breadcrumb from '@/components/breadcrumb';
import PageTitle from '@/components/pageTitle';
import Input from '@/components/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { handleChangeProposalInput } from '@/redux/actions/proposalsAction';

export default function Create() {

    const dispatch = useDispatch();
    const { proposalInput, isSubmitting } = useSelector((state: RootState) => state.proposal);

    const handleChangeTextInput = (name, value) => {
        dispatch(handleChangeProposalInput(name, value));
    };

    console.log("proposalInput", proposalInput)

    return (
        <div>

            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <Breadcrumb />
                        <PageTitle title="create proposals" />
                    </div>

                    <div className="mt-2">
                        <div className="grid gap-2 grid-cols-1 md:grid-cols-3 border border-gray-200 p-2.5 rounded-md shadow-md">
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
                            <Input
                                label="Plan"
                                name="plan_id"
                                placeholder='Plan'
                                value={proposalInput.plan_id}
                                isRequired={true}
                                inputChange={handleChangeTextInput}
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
                            <Input
                                label="Mobile No"
                                name="mobile_no"
                                placeholder='Mobile No'
                                value={proposalInput.mobile_no}
                                isRequired={true}
                                inputChange={handleChangeTextInput}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}