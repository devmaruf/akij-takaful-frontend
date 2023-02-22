import { useEffect } from 'react';
import IInput from '@/components/input';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { getPlanList, handleChangeProposalInput, submitProposal } from '@/redux/actions/proposal-action';
import IButton from '@/components/button';
import Link from 'next/link';

export default function ResetPassword() {

    // const dispatch = useDispatch();
    // const { proposalInput, planList, isSubmitting } = useSelector((state: RootState) => state.proposal);

    // useEffect(() => {
    //     dispatch(getPlanList())
    // }, [dispatch])


    // const handleChangeTextInput = (name: string, value: any) => {
    //     dispatch(handleChangeProposalInput(name, value));
    // };

    // const handleSubmitProposal = (e) => {
    //     dispatch(submitProposal(proposalInput));
    //     e.preventDefault();
    // }

    const handleChange = (e) => {
        console.log('e :>> ', e);
    }

    return (
        <section className="md:h-screen py-4 px-6 md:px-10 bg-white text-gray-900 block sm:flex items-center justify-between border-b lg:mt-1.5">
            <div className='block md:flex justify-center items-center w-full'>

                <div className="basis-1 md:basis-1/3 bg-white border border-gray-400 rounded-md p-4 shadow-md">
                    <form>
                        <div className="flex items-center mb-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                            <p className="text-center font-semibold mx-4 mb-0">Reset Password</p>
                        </div>
                        <IInput
                            label='Email'
                            placeholder='Email'
                            name=""
                            value=""
                            inputChange={(e) => handleChange(e)}
                        />
                        <IInput
                            label='Password'
                            placeholder='Password'
                            name=""
                            value=""
                            type="password"
                            inputChange={(e) => handleChange(e)}
                        />
                        <IInput
                            label='Confirm Password'
                            placeholder='Confirm Password'
                            name=""
                            value=""
                            type="password"
                            inputChange={(e) => handleChange(e)}
                        />

                        <div className="text-center lg:text-left">
                            <IButton
                                title="Submit"
                                onClick={(e) => handleChange()}
                                position="text-left"
                            />
                            <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                                <Link
                                    href="/login"
                                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out ml-2"
                                >
                                    Back To Login
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </section>

    )
}
