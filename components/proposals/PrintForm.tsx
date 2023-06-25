import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import Input from "@/components/input";
import Select from "@/components/select";
import Button from "@/components/button";
import { RootState } from "@/redux/store";
import { getBranchDropdownList } from "@/redux/actions/branch-action";
import { IProposalView } from "@/redux/interfaces";
import { useDebounced } from "@/hooks/use-debounce";
import BankSelect from "@/components/banks/BankSelect";
import AllottedProposalListTable from "./AllottedProposalListTable";
import { allotProposalAction, getAllotedProposalAction } from "@/redux/actions/proposal-allotment-action";
import { Toaster } from "@/components/toaster";

export function PrintForm({ isAssign = true }: { isAssign: boolean }) {
  const dispatch = useDispatch();
  const { branchDropdownList } = useSelector((state: RootState) => state.Branch);
  const { printProposalList, isLoading } = useSelector((state: RootState) => state.proposal);
  const [noOfProposalPrint, setNoOfProposalPrint] = useState("1");
  const [noOfProposalPrintTo, setNoOfProposalPrintTo] = useState("10");
  const [projectId, setProjectId] = useState<number>(0);
  const [branchId, setBranchId] = useState<number>(0);

  useDebounced(() => {
    dispatch(getBranchDropdownList());
  });

  const onHandleInputChange = (name: string, value: string | number) => {
    switch (name) {
      case 'proposal_print_no':
        setNoOfProposalPrint(value + '');
        break;

      case 'proposal_print_no_to':
        setNoOfProposalPrintTo(value + '');
        break;

      case 'project_id':
        setProjectId(parseInt(value + ''));
        break;

      case 'branch_id':
        setBranchId(parseInt(value + ''));
        break;

      default:
        break;
    }
  }

  const onFormSubmit = (e: any) => {
    e.preventDefault();
    const formData = {
      proposal_print_no: noOfProposalPrint,
      proposal_print_no_to: isAssign ? noOfProposalPrintTo : null,
      project_id: projectId,
      branch_id: branchId,
    }

    dispatch(allotProposalAction(formData));
  }

  const onReportView = (e: any) => {
    if (projectId > 0 && branchId > 0) {
      dispatch(getAllotedProposalAction(projectId, branchId));
      return;
    }

    Toaster('error', 'Please select bank and branch.');
  }

  const divRef = useRef(null);

  const handlePrint = () => {
    const printContents = divRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
  };


  return (
    <>
      <form action="" onSubmit={onFormSubmit}>
        <div className="flex flex-col md:flex-row mb-3">
          <div className="flex flex-1 pr-2">
            <div className="flex-1 pr-2">
              <BankSelect
                defaultValue={projectId}
                changeTextInput={onHandleInputChange}
              />
            </div>

            <div className="flex-1">
              <Select
                options={branchDropdownList}
                isSearchable={true}
                name="branch_id"
                label="Branch"
                placeholder="Select Branch..."
                isRequired={true}
                defaultValue={branchId}
                handleChangeValue={onHandleInputChange}
              />
            </div>
          </div>

          <div className="flex flex-1 bg-slate-100 px-3">
            <div className="flex-1 pr-2">
              <Input
                label={isAssign ? 'Start proposal no.' : 'Proposal Print No'}
                name="proposal_print_no"
                placeholder="eg: 10"
                isRequired={true}
                value={noOfProposalPrint}
                inputChange={onHandleInputChange}
              />
            </div>

            <div className="flex-1">
              {
                isAssign &&
                <Input
                  label="End proposal no."
                  name="proposal_print_no_to"
                  placeholder="eg: 20"
                  isRequired={true}
                  value={noOfProposalPrintTo}
                  inputChange={onHandleInputChange}
                />
              }
            </div>
          </div>
        </div>

        <div className="flex justify-between mb-5">
          <Button
            type="button"
            variant="default"
            title='Report'
            loadingTitle="Loading Report..."
            loading={isLoading}
            iconLeft={<i className="bi bi-list mr-3"></i>}
            customClass='px-6 mt-4 mr-3'
            onClick={onReportView}
            disabled={
              !(projectId > 0 && branchId > 0)
            }
          />

          <Button
            type="submit"
            title='Allot Proposal'
            loadingTitle="Allotting proposals..."
            loading={isLoading}
            iconLeft={<i className="bi bi-plus-circle mr-3"></i>}
            customClass='px-6 mt-4'
          />
        </div>
      </form>

      {
        !isAssign && printProposalList !== undefined && printProposalList.length > 0 &&
        <>
          <div className="mt-2">
            <Button variant="success" onClick={handlePrint}>
              <i className="bi bi-printer"></i> Print
            </Button>
          </div>

          <div className="printDiv" ref={divRef}>
            {
              printProposalList.map((proposal: IProposalView, index: number) => (
                <div className="pl-10" key={index}>
                  <div className="w-full">
                    <a href="#" className="text-xl font-bold lg:ml-2.5">
                      <Image src={'/images/banner.png'} alt={''} className="my-0 mx-auto py-5" height={80} width={400} unoptimized />
                    </a>
                  </div>
                  <div className="flex my-5">
                    <div className="w-1/2">
                      Proposal No: <b>{proposal.proposal_no}</b>
                    </div>

                    <div className="w-1/2">
                      <ul className="items-center w-1/2 text-sm font-medium text-gray-900 bg-white sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <li className="w-full dark:border-gray-600">
                          <h2 className="ml-5 text-left">Plan</h2>
                        </li>
                        <li className="w-full dark:border-gray-600">
                          <div className="flex items-center pl-3">
                            <input id="vue-checkbox-list" type="checkbox" value="checkbox1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medical</label>
                          </div>
                        </li>
                        <li className="w-full dark:border-gray-600">
                          <div className="flex items-center pl-3">
                            <input id="vue-checkbox-list" type="checkbox" value="checkbox2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                            <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Non-Medical</label>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex my-5 pr-4">
                    <div className="w-1/2">
                      <div className="flex">
                        <div className="w-32">
                          Proposer Name :
                        </div>
                        <div className="w-full">
                          ______________________________________
                        </div>
                      </div>
                    </div>

                    <div className="w-1/2">
                      <div className="flex">
                        <div className="w-1/6">
                          Phone No:
                        </div>
                        <div className="w-5/6">
                          ______________________________________
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex my-5">
                    <div className="w-1/2">
                      <div className="flex">
                        <div className="w-1/6">
                          Premium :
                        </div>
                        <div className="w-5/6">
                          ______________________________________
                        </div>
                      </div>
                    </div>


                    <div className="w-1/2">
                      <div className="flex">
                        <div className="w-1/6">
                          Initial Premium :
                        </div>
                        <div className="w-5/6">
                          ______________________________________
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex my-5">
                    <div className="w-1/2">
                      <div className="flex">
                        <div className="w-1/6">
                          Initial Sum Assured:
                        </div>
                        <div className="w-5/6">
                          ______________________________________
                        </div>
                      </div>
                    </div>

                    <div className="w-1/2">
                      <div className="flex">
                        <div className="w-1/6">
                          Agent Name :
                        </div>
                        <div className="w-5/6">
                          ______________________________________
                        </div>
                      </div>
                    </div>

                  </div>

                  <hr className="my-10" />
                </div>
              ))
            }
          </div>
        </>
      }

      {
        isAssign && printProposalList !== undefined && printProposalList.length > 0 &&
        <div className="mt-4">
          <AllottedProposalListTable />
        </div>
      }
    </>
  );
}
