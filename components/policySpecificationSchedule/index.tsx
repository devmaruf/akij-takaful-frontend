import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import PageHeader from '@/components/layouts/PageHeader';
import { PageContentList } from '@/components/layouts/PageContentList';
import Loading from '@/components/loading';
import Table from '@/components/table';
import { RootState } from '@/redux/store';
import { getProposalDetails } from '@/redux/actions/proposal-action';
import Button from "../button";
import { calculateAge } from "@/utils/calculation";

export default function PolicySpecificationSchedule() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;

    const { proposalDetails, loadingDetails } = useSelector((state: RootState) => state.proposal);
    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getProposalDetails(id))
        }, 2000),
        [id]
    );

    const divRef = useRef(null);

    const handlePrint = () => {
        const printContents = divRef.current.innerHTML;
        const originalContents = document.body.innerHTML;

        document.body.innerHTML = printContents;
        window.print();
        document.body.innerHTML = originalContents;
    };


    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    return (
        <div>

            <PageHeader
                title="Policy Specification Schedule"
                hasSearch={false}
            />
            <div className="mt-2 mr-4">
                <Button variant="success" onClick={handlePrint}>
                    <i className="bi bi-printer"></i> Print
                </Button>
            </div>
            <div className="printDiv" ref={divRef}>
                <PageContentList>
                    {
                        loadingDetails ?
                            <div className="text-center">
                                <Loading loadingTitle="Policy Specification Schedule..." />
                            </div> :

                            <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-1">
                                <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-xl text-center">
                                    Policy Specification Schedule
                                </h3>
                                {
                                    typeof proposalDetails !== "undefined" && proposalDetails !== null &&
                                    <div className="uppercase">
                                        <Table
                                            column={[]}
                                        >
                                            <tr className="flex text-left">
                                                <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                                    Policy Number
                                                </th>
                                                <td className="basis-[28.57%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    {proposalDetails.proposal_no ?? 'N/A'}
                                                </td>
                                                <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                                    Age
                                                </td>
                                                <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    {proposalDetails.age ?? 0} Years
                                                </td>
                                                <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    Risk Date
                                                </td>
                                                <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    {proposalDetails.risk_date ?? "N/A"}
                                                </td>
                                            </tr>
                                            <tr className="flex text-left">
                                                <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                                    Date of Application
                                                </th>
                                                <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    {proposalDetails.created_at ?? 'N/A'}
                                                </td>
                                                <td className="basis-[28.57%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                                    Date of Commencement
                                                </td>
                                                <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    {proposalDetails.commencement_date ?? "N/A"}
                                                </td>
                                                <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    Date of Maturity
                                                </td>
                                                <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    {proposalDetails.policy_issue_date ?? 'N/A'}
                                                </td>
                                            </tr>

                                            <tr className="flex text-left">
                                                <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                                    Life Insured
                                                </th>
                                                <td className="basis-[85.74%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    {proposalDetails.proposer_name ?? "N/A"}
                                                </td>
                                            </tr>
                                            <tr className="flex text-left">
                                                <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                                    Owner
                                                </th>
                                                <td className="basis-[85.74%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    {proposalDetails.proposer_name ?? "N/A"}
                                                </td>
                                            </tr>
                                            <tr className="flex text-left">
                                                <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                                    Address of correspondence
                                                </th>
                                                <td className="basis-[85.74%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    {proposalDetails.proposer_present_address.area_name ?? 'N/A'}, {proposalDetails.proposer_present_address.district_name ?? 'N/A'}, {proposalDetails.proposer_present_address.division_name ?? 'N/A'}, Bangladesh.
                                                </td>
                                            </tr>

                                            <tr className="flex text-left">
                                                <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                                    Policy Type
                                                </th>
                                                <td className="basis-[40.87%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    Plan Name
                                                </td>
                                                <td className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    Sum Assured (BDT)
                                                </td>
                                                <td className="basis-[15.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">

                                                </td>
                                                <td className="basis-[15.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    Premium (BDT)
                                                </td>
                                            </tr>

                                            <tr className="flex text-left">
                                                <th rowSpan={3} className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300 flex items-center">
                                                    Basic Policy
                                                </th>
                                                <td rowSpan={3} className="basis-[40.87%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300 flex items-center">
                                                    {proposalDetails.product_name ?? 'N/A'}
                                                </td>
                                                <td rowSpan={3} className="basis-[14.29%] px-2 py-3 font-normal text-center text-gray-900 break-words border border-slate-300 flex items-center justify-center">
                                                    {proposalDetails.sum_assured ?? 0.00}
                                                </td>
                                                <td className="basis-[30.57%] font-normal text-gray-900 break-words border border-slate-300">
                                                    <table className="w-full">
                                                        <tbody>
                                                            <tr className="flex text-left">
                                                                <td className="basis-1/2 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                                    Basic
                                                                </td>
                                                                <td className="basis-1/2 px-2 py-1 font-normal text-right text-gray-900 break-words border border-slate-300">
                                                                    {proposalDetails.basic_premium ?? 0}
                                                                </td>
                                                            </tr>
                                                            <tr className="flex text-left">
                                                                <td className="basis-1/2 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                                    OCC Extra
                                                                </td>
                                                                <td className="basis-1/2 px-2 py-1 font-normal text-right text-gray-900 break-words border border-slate-300">
                                                                    {proposalDetails.occupation_extra_percentage ?? "N/A"}
                                                                </td>
                                                            </tr>
                                                            <tr className="flex text-left">
                                                                <td className="basis-1/2 px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                                    Mortality Extra
                                                                </td>
                                                                <td className="basis-1/2 px-2 py-1 font-normal text-right text-gray-900 break-words border border-slate-300">
                                                                    {proposalDetails.extra_mortality ?? 0}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>

                                            <tr className="flex text-left">
                                                <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300 flex items-center" >
                                                    Supplementary Contracts Attached
                                                </th>
                                                <td rowSpan={3} className="basis-[85.74%] font-normal text-gray-900 break-words border border-slate-300">
                                                    <table className="w-full">
                                                        <tbody>
                                                            <tr className="flex text-left">
                                                                <td className="basis-[47.65%] px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                                    AD(Need modify) FROM GLSC-102 EXPIRY DATE: 25 Aug, 2035
                                                                </td>
                                                                <td className="basis-[16.75%] px-2 py-1 font-normal text-center text-gray-900 break-words border border-slate-300 flex items-center justify-center">
                                                                    {proposalDetails.rider_sum_assured ?? 0.00}
                                                                </td>
                                                                <td className="basis-[35.6%] px-2 py-1 font-normal text-right text-gray-900 break-words border border-slate-300 flex items-center justify-end">
                                                                    {proposalDetails.rider_adnd ?? 0}
                                                                </td>
                                                            </tr>
                                                            <tr className="flex text-left">
                                                                <td className="basis-[47.65%] px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                                    CI FROM GLSC-103 EXPIRY DATE: 25 Aug, 2030
                                                                </td>
                                                                <td className="basis-[16.75%] px-2 py-1 font-normal text-center text-gray-900 break-words border border-slate-300 flex items-center justify-center">
                                                                    {proposalDetails.rider_sum_assured ?? 0}
                                                                </td>
                                                                <td className="basis-[35.6%] px-2 py-1 font-normal text-right text-gray-900 break-words border border-slate-300 flex items-center justify-end">
                                                                    {proposalDetails.rider_ci ?? 0.00}
                                                                </td>
                                                            </tr>

                                                            <tr className="flex text-left">
                                                                <td className="basis-[47.65%] px-2 py-1 font-normal text-gray-900 break-words border border-slate-300">
                                                                    HI-FROM GLSC-104 EXPIRY DATE: 28-06-2026
                                                                </td>
                                                                <td className="basis-[16.75%] px-2 py-1 font-normal text-center text-gray-900 break-words border border-slate-300 flex items-center justify-center">
                                                                    {proposalDetails.rider_sum_assured ?? 0}
                                                                </td>
                                                                <td className="basis-[35.6%] px-2 py-1 font-normal text-right text-gray-900 break-words border border-slate-300 flex items-center justify-end">
                                                                    {proposalDetails.rider_hi ?? 0.00}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                </td>
                                            </tr>

                                            <tr className="flex text-left">
                                                <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                                    Assured Event
                                                </th>
                                                <td className="basis-[42.87%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    See Endorsments
                                                </td>
                                                <td className="basis-[42.87%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300 flex justify-between">
                                                    <p>Net Premium Payable </p>
                                                    <p>{proposalDetails.total_premium} </p>
                                                </td>
                                            </tr>
                                            <tr className="flex text-left">
                                                <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                                    Mode of Payment
                                                </th>
                                                <td className="basis-[21.44%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    {proposalDetails.mode ?? 'N/A'}
                                                </td>
                                                <td className="basis-[21.44%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    When Payable
                                                </td>
                                                <td className="basis-[42.87%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    N/A
                                                </td>
                                            </tr>
                                            <tr className="flex text-left">
                                                <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                                    NON FCR feature Option
                                                </th>
                                                <td className="basis-[11.44%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    C
                                                </td>
                                                <td className="basis-[31.44%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    period during which payable
                                                </td>
                                                <td className="basis-[42.87%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    N/A
                                                </td>
                                            </tr>

                                            <tr className="flex text-left">
                                                <th className="basis-[14.29%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                                    Beneficiary (IES)
                                                </th>
                                                <td className="basis-[85.74%] px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                    The applicant or his/her assign (s) in the event of death of the life insured to:
                                                    <p className="font-bold mt-3">Nominee & Guardian </p>
                                                    <table className="w-full">
                                                        <tbody>
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
                                                            {
                                                                proposalDetails.proposer_nominees && proposalDetails.proposer_nominees.length > 0 && proposalDetails.proposer_nominees.map((nominee: any, index: index) => (
                                                                    <tr className='flex text-left' key={nominee.id}>
                                                                        <td className="basis-[10%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                                                            {index + 1}
                                                                        </td>
                                                                        <td className="basis-[40%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                                                        {nominee.proposal_personal_information.full_name??'N/A'}
                                                                        </td>
                                                                        <td className="basis-[10%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                                                        {calculateAge(nominee.proposal_personal_information.dob)??'N/A'}
                                                                        </td>
                                                                        <td className="basis-[30%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                                                            {nominee.proposal_personal_information.dob??'N/A'}
                                                                        </td>
                                                                        <td className="basis-[10%] px-2 py-2 font-normal text-gray-900 break-words border border-slate-300">
                                                                            85%
                                                                        </td>
                                                                    </tr>
                                                                ))
                                                            }
                                                        </tbody>
                                                    </table>
                                                </td>

                                            </tr>
                                        </Table>

                                        <div className="mt-5">
                                            <h4 className="text-center font-semibold text-slate-900 mb-5"> Endorsments (To be made by company only )</h4>
                                            <Table
                                                column={[]}
                                            >
                                                <tr className="flex">
                                                    <th className="basis-1/5 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300" >
                                                        Guardian Probriddhi Provision assured event
                                                    </th>
                                                    <td className="basis-4/5 px-2 py-3 font-normal text-gray-900 break-words border border-slate-300">
                                                        <p> a) in the event of the {"issured's"} survival the fulll sum assured will be paid on the maturity date. </p>
                                                        <p> b) in the event of the {"issured's"} death at any time before the maturity date, the full sum assured will be paid. </p>
                                                        <p> c) accrued bonus will be payable on maturity date or earlier death of insured as per the policy provisions. </p>
                                                    </td>
                                                </tr>
                                            </Table>

                                            <p className="text-slate-900 mt-3 capitalize ml-2"> Date of Issue: {proposalDetails.policy_issue_date}</p>
                                        </div>

                                        <div className="mt-5">
                                            <h4 className="text-center font-semibold text-slate-900 mb-5"> First Premium Receipt </h4>

                                            <p className="text-slate-900 mt-3 normal-case mx-2 text-justify"> We hereby acknowledge receipt of BDT <span className="font-bold">12,745</span> from the policy owner as First Premium of this policy and any Supplementary Contract (s) under the condition that this receipt shall not be binding upon the Company for any part of said payment covered by cheque or other form of remittance unless such remittance is promptly honored on presentation for payment. Suspense (if any) BDT <span className="font-bold">55</span> deposited into your policy account </p>
                                            <p className="text-slate-900 mt-3 normal-case mx-2">On Behalf of Guardian Life Insurance Limited Authorized {"Officer's"} Signature for PSS, Endorsements (if any) and First Premium Receipt. </p>

                                            <div className="flex justify-end my-10 mx-4">
                                                <div className="basis-1/5 relative text-center">
                                                    <p className="text-slate-900 mt-3">admin (20200005)</p>
                                                    <span className="absolute top-0 left-0 w-full h-px bg-gray-300"></span>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                }

                            </div>
                    }
                </PageContentList>
            </div>
        </div >
    )
}