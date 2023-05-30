import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PageHeader from '@/components/layouts/PageHeader';
import { PageContentList } from '@/components/layouts/PageContentList';
import Loading from '@/components/loading';
import Table from '@/components/table';

export default function PolicySpecificationSchedule() {
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState<boolean>(false);
    const isLoading = false;

    return (
        <div>
            <PageHeader
                title="Worksheet Summary"
                hasSearch={false}
            />


            <PageContentList>
                {
                    isLoading ?
                        <div className="text-center">
                            <Loading loadingTitle="Branches" />
                        </div> :

                        <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-1">
                            <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-xl text-center">
                                Policy Specification Schedule
                            </h3>

                            <Table
                                column={[]}
                            >
                                <tr className="flex text-left">
                                    <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                        Policy Number
                                    </th>
                                    <td className="basis-[28.57%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        34343
                                    </td>
                                    <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                        Age
                                    </td>
                                    <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        45 Years
                                    </td>
                                    <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        Risk Date
                                    </td>
                                    <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        26-05-2023
                                    </td>
                                </tr>
                                <tr className="flex text-left">
                                    <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                        Date of Application
                                    </th>
                                    <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        26-05-2023
                                    </td>
                                    <td className="basis-[28.57%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                        Date of Commencement
                                    </td>
                                    <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        01-05-2023
                                    </td>
                                    <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        Date of Maturity
                                    </td>
                                    <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        26-05-2023
                                    </td>
                                </tr>

                                <tr className="flex text-left">
                                    <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                        Life Insured
                                    </th>
                                    <td className="basis-[85.74%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        MD Tarek Hossen
                                    </td>
                                </tr>
                                <tr className="flex text-left">
                                    <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                        Owner
                                    </th>
                                    <td className="basis-[85.74%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        MD Tarek Hossen
                                    </td>
                                </tr>
                                <tr className="flex text-left">
                                    <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                        Address of correspondence
                                    </th>
                                    <td className="basis-[85.74%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        Mohakhali, Dhaka-1208, Dhaka, Bangladesh.
                                    </td>
                                </tr>

                                <tr className="flex text-left">
                                    <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                        Policy Type
                                    </th>
                                    <td className="basis-[42.87%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        Plan Name
                                    </td>
                                    <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        Sum Assured (BDT)
                                    </td>
                                    <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">

                                    </td>
                                    <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        Premium (BDT)
                                    </td>
                                </tr>

                                <tr className="flex text-left">
                                    <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300 flex items-center">
                                        Basic Policy
                                    </th>
                                    <td className="basis-[42.87%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300 flex items-center">
                                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad vel accusantium nulla corrupti, recusandae deleniti.
                                    </td>
                                    <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300 flex items-center">
                                        10000000
                                    </td>
                                    <td className="basis-[28.57%] font-normal text-gray-900 break-words border border-slate-300">
                                        <tr className="flex text-left">
                                            <td className="basis-1/2 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                Basic
                                            </td>
                                            <td className="basis-1/2 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                9850
                                            </td>
                                        </tr>
                                        <tr className="flex text-left">
                                            <td className="basis-1/2 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                OCC Extra
                                            </td>
                                            <td className="basis-1/2 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                0
                                            </td>
                                        </tr>
                                        <tr className="flex text-left">
                                            <td className="basis-1/2 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                Mortality Extra
                                            </td>
                                            <td className="basis-1/2 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                0
                                            </td>
                                        </tr>
                                    </td>
                                </tr>

                                <tr className="flex text-left">
                                    <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                        Supplementary Contracts Attached
                                    </th>
                                    <td rowSpan={3} className="basis-[85.74%] font-normal text-gray-900 break-words border border-slate-300">

                                        <tr className="flex text-left">
                                            <td className="basis-2/5 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda, beatae.
                                            </td>
                                            <td className="basis-1/5 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                10000
                                            </td>
                                            <td className="basis-2/5 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                350
                                            </td>
                                        </tr>
                                        <tr className="flex text-left">
                                            <td className="basis-2/5 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda, beatae.
                                            </td>
                                            <td className="basis-1/5 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                10000
                                            </td>
                                            <td className="basis-2/5 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                350
                                            </td>
                                        </tr>
                                        <tr className="flex text-left">
                                            <td className="basis-2/5 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Assumenda, beatae.
                                            </td>
                                            <td className="basis-1/5 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                10000
                                            </td>
                                            <td className="basis-2/5 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                350
                                            </td>
                                        </tr>

                                    </td>
                                </tr>
                                <tr className="flex text-left">
                                    <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                        Assured Event
                                    </th>
                                    <td className="basis-[42.87%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        See Endorsments
                                    </td>
                                    <td className="basis-[42.87%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        Net Premium Payable
                                    </td>
                                </tr>
                                <tr className="flex text-left">
                                    <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                        Mode of Payment
                                    </th>
                                    <td className="basis-[21.44%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        Yearly
                                    </td>
                                    <td className="basis-[21.44%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        When Payable
                                    </td>
                                    <td className="basis-[42.87%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, repellendus?
                                    </td>
                                </tr>
                                <tr className="flex text-left">
                                    <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                        NON FCR feature Option
                                    </th>
                                    <td className="basis-[11.44%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        12
                                    </td>
                                    <td className="basis-[31.44%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        Lorem ipsum dolor sit amet.
                                    </td>
                                    <td className="basis-[42.87%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, repellendus?
                                    </td>
                                </tr>

                                <tr className="flex text-left">
                                    <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                        NON FCR feature Option
                                    </th>
                                    <td className="basis-[85.74%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime, repellendus?
                                        <p className="font-bold mt-3">Nominee & Guardian </p>
                                        <tr className='flex text-left'>
                                            <td className="basis-[10%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                                SL
                                            </td>
                                            <td className="basis-[40%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                                Name
                                            </td>
                                            <td className="basis-[10%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                                Age
                                            </td>
                                            <td className="basis-[30%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                                Relation
                                            </td>
                                            <td className="basis-[10%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                                Share
                                            </td>
                                        </tr>
                                        <tr className='flex text-left'>
                                            <td className="basis-[10%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                               01
                                            </td>
                                            <td className="basis-[40%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                                Irfan Hossen
                                            </td>
                                            <td className="basis-[10%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                                16
                                            </td>
                                            <td className="basis-[30%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                                Brother
                                            </td>
                                            <td className="basis-[10%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                                85%
                                            </td>
                                        </tr>

                                    </td>

                                </tr>


                            </Table>

                        </div>
                }
            </PageContentList>
        </div >
    )
}