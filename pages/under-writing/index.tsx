import React from 'react';
import IBreadcrumb from '@/components/breadcrumb';
import PageTitle from '@/components/pageTitle';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@/components/button';

export default function UnderWriting() {

    const dispatch = useDispatch();

    const [showModal, setShowModal] = React.useState<boolean>(false);

    const onSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div>

            <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
                <div className="mb-1 w-full">
                    <div className="mb-4">
                        <IBreadcrumb />
                        <PageTitle title="Under Writing" />
                    </div>

                    <div className="mt-2">
                        <div className='border border-gray-200 p-2.5 rounded-md shadow-md'>
                            <form
                                method="post"
                                autoComplete="off"
                                encType="multipart/form-data"
                            >

                                <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">

                                    <div className="flex items-center mb-4">
                                        <input id="default-checkbox" type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                        <label htmlFor="default-checkbox" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Default checkbox</label>
                                    </div>

                                </div>
                                <Button title='Submit Proposal' loadingTitle="Submitting..." onClick={(e) => onSubmit(e)} loading={false} />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}