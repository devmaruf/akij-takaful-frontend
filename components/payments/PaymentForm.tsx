import { useRouter } from 'next/router';
import { useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@/redux/store';
import Loading from '@/components/loading';
import Button from '@/components/button';
import Input from '@/components/input';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContent } from '@/components/layouts/PageContent';
import { submitPaymentAction,changeInputValue } from '@/redux/actions/payment-action';

interface IPaymentForm {
    id: number;
    pageType: 'create' | 'edit' | 'profile';
    isAgent?: boolean;
}

export default function PaymentForm({ id, pageType, isAgent = false }: IPaymentForm) {
    const router = useRouter();
    const dispatch = useDispatch();
    const { paymentInput, isSubmitting } = useSelector((state: RootState) => state.payment);

    const handleChangeTextInput = (name: string, value: any) => {
        dispatch(changeInputValue(name, value));
    };

    const onSubmit = (e: any) => {
        e.preventDefault();
        // dispatch(updateEmployee(formattedInputObject, router, pageType, isAgent));
        // Hit API and send data and get redirect URL
        dispatch(submitPaymentAction(paymentInput, router));
    }

    const getMainPageTitle = () => {
        return 'Payment';
    }

    const getPageTitle = () => {
        let title = '';
        if (pageType === 'create') {
            title += 'New ';
        } else if (pageType === 'edit' || pageType === 'profile') {
            title += 'Edit ';
        }

        title += getMainPageTitle();

        return title;
    }

    return (
        <>
            <PageHeader
                title={getPageTitle()}
                hasSearch={false}
            />
            <PageContent>
                <form
                    method="post"
                    autoComplete="off"
                    encType="multipart/form-data"
                >
                    <div className="grid gap-2 grid-cols-1 md:grid-cols-6">

                        <div className='md:ml-4 col-span-4'>
                            <Input
                                label="Amount"
                                name="amount"
                                placeholder='Amount'
                                value={paymentInput.amount}
                                isRequired={true}
                                inputChange={handleChangeTextInput}
                            />
                        </div>

                    </div>

                    <Button
                        title='Pay Now'
                        loadingTitle="Loading..."
                        onClick={(e) => onSubmit(e)}
                    // loading={isSubmitting}
                    />
                </form>
            </PageContent>
        </>
    )
}