import { useEffect } from 'react';
import IBreadcrumb from '@/components/breadcrumb';
import PageTitle from '@/components/pageTitle';
import Input from '@/components/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getPlanList, handleChangeProposalInput, submitProposal } from '@/redux/actions/proposal-action';
import Select from '@/components/select';
import Button from '@/components/button';
import { PersonalInformation } from '@/components/proposals/PersonalInformation';
import { PremiumInformation } from '@/components/proposals/PremiumInformation';
import { AddressInformation } from '@/components/proposals/AddressInformation';

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
                        <PageTitle title="New Proposal" />
                    </div>

                    <div className="mt-2">
                        <form
                            method="post"
                            autoComplete="off"
                            encType="multipart/form-data"
                        >
                            <PersonalInformation
                                handleChangeTextInput={handleChangeTextInput}
                            />

                            <AddressInformation
                                handleChangeTextInput={handleChangeTextInput}
                            />

                            <PremiumInformation
                                handleChangeTextInput={handleChangeTextInput}
                            />

                            <Button title='Save' loadingTitle="Saving..."
                                onClick={(e) => handleSubmitProposal(e)} loading={isSubmitting}
                                customClass='mt-4'
                            />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
