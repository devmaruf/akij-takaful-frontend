import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Select from '@/components/select';
import Input from '@/components/input';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContent } from '@/components/layouts/PageContent';
import { submitPaymentAction, changeInputValue, searchPaymentProposalAction } from '@/redux/actions/payment-action';
import { useEffect } from 'react';
import { Toaster } from '../toaster';

interface IPaymentForm {
    id: number;
    pageType: 'create' | 'edit' | 'profile';
    isAgent?: boolean;
}

export default function PaymentForm({ id, pageType }: IPaymentForm) {
    const router = useRouter();
    const paymentCompleted = router.query?.payment_completed ?? false;
    const dispatch = useDispatch();
    const { paymentInput, isSubmitting, isSearching } = useSelector((state: RootState) => state.payment);

    const handleChangeTextInput = (name: string, value: any) => {
        dispatch(changeInputValue(name, value));
    }

    const onSubmit = (e: any) => {
        e.preventDefault();
        // Hit API and send data and get redirect URL
        dispatch(submitPaymentAction(paymentInput, router));
    }

    const getPageTitle = () => {
        return 'Pay Now'
    }

    const onSearch = (e: any) => {
        e.preventDefault();
        dispatch(searchPaymentProposalAction(paymentInput.proposal_no));
    }

    const hasProposalFound = paymentInput.proposal?.id !== undefined;

    useEffect(() => {
        if (paymentCompleted) {
            Toaster('success', 'Your payment has been processed successfully.');
            router.push('/pay-now');
        }
    }, [paymentCompleted, router]);

    return (
        <>
            <PageHeader
                title={getPageTitle()}
                hasSearch={false}
            />
            <PageContent>
                <form method="post" autoComplete="off" encType="multipart/form-data">
                    <div className="grid gap-2 grid-cols-1 md:grid-cols-6">
                        <div className='md:ml-4 col-span-4'>
                            <div className='grid gap-2 grid-cols-1 md:grid-cols-3'>
                                <div>
                                    <Input
                                        label="Search by proposal no"
                                        name="proposal_no"
                                        placeholder='eg: ATLI-20230101-10'
                                        value={paymentInput.proposal_no}
                                        isRequired={true}
                                        inputChange={handleChangeTextInput}
                                    />
                                    <Button
                                        title="Search now"
                                        type='button'
                                        onClick={onSearch}
                                        position="text-left"
                                        loadingTitle="Searching..."
                                        loading={isSearching}
                                        iconRight={<i className='bi bi-search ml-2'></i>}
                                    />
                                </div>

                                {
                                    hasProposalFound &&
                                    <>
                                        <Input
                                            label="Amount"
                                            name="amount"
                                            placeholder='Amount'
                                            value={paymentInput.amount}
                                            isDisabled={true}
                                            isRequired={true}
                                            inputChange={handleChangeTextInput}
                                        />

                                        <Select
                                            options={[
                                                {
                                                    label: 'Online (Card / Mobile)',
                                                    value: 'online',
                                                },
                                                {
                                                    label: 'Manual (Bank)',
                                                    value: 'manual',
                                                }
                                            ]}
                                            isSearchable={false}
                                            name="payment_media"
                                            label="Payment media"
                                            defaultValue={paymentInput.payment_media}
                                            placeholder='Select Payment media...'
                                            handleChangeValue={handleChangeTextInput}
                                        />

                                        {
                                            paymentInput.payment_media === 'manual' &&
                                            <>
                                                <div className='bg-gray-100 border-t-2 border-t-blue-600'>
                                                    <h2 className="border-b text-lg p-3">
                                                        Bank Information
                                                    </h2>
                                                    <div className='p-3'>
                                                        <h2>Bank Name: [XXXX]</h2>
                                                        <h2>Bank Account No: XXXXXXXX</h2>
                                                        <h2>Bank Address: XXXXXXXX</h2>
                                                    </div>
                                                </div>
                                                <Input
                                                    type="file"
                                                    label="Attachment"
                                                    name="attachment"
                                                    placeholder='Attachment'
                                                    value={paymentInput.attachment}
                                                    isRequired={true}
                                                    inputChange={handleChangeTextInput}
                                                />
                                            </>
                                        }

                                    </>
                                }
                            </div>
                        </div>
                    </div>
                    {
                        hasProposalFound &&
                        <Button
                            title='Pay Now'
                            loadingTitle="Payment processing..."
                            onClick={(e: any) => onSubmit(e)}
                            loading={isSubmitting}
                            disabled={paymentInput.payment_media?.length > 0 && paymentInput.amount > 0}
                        />
                    }
                </form>
            </PageContent>
        </>
    )
}