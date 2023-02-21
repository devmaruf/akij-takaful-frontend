import { useEffect } from 'react';
import IBreadcrumb from '@/components/breadcrumb';
import PageTitle from '@/components/pageTitle';
import Input from '@/components/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getPlanList, handleChangeProposalInput, submitProposal } from '@/redux/actions/ProposalsAction';
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
                        <PageTitle title="create employee" />
                    </div>

                    <div className="mt-2">
                        <div className='border border-gray-200 p-2.5 rounded-md shadow-md'>
                            <form
                                method="post"
                                autoComplete="off"
                                encType="multipart/form-data"
                            >
                                <div className="grid gap-2 grid-cols-1 md:grid-cols-5">

                                    <div className="flex items-center justify-center w-full col-span-1">
                                        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <svg aria-hidden="true" className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path></svg>
                                                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                            </div>
                                            <input id="dropzone-file" type="file" className="hidden" />
                                        </label>
                                    </div>


                                    <div className='md:ml-4 col-span-4'>
                                        <div className='grid gap-2 grid-cols-1 md:grid-cols-2'>
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
                                                defaultValue=""
                                                placeholder='Select Plan...'
                                                handleChangeValue={handleChangeTextInput}
                                            />
                                        </div>
                                    </div>

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