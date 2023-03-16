import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "@/components/input";
import Select from "@/components/select";
import Button from "@/components/button";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { getProjectListDropdown } from "@/redux/actions/project-action";
import { getBranchDropdownList } from "@/redux/actions/branch-action";
import { printProposalAction } from "@/redux/actions/proposal-action";
import { IProposalBasicInput } from "@/redux/interfaces";

export function PrintForm() {
  const dispatch = useDispatch();
  const { projectDropdownList } = useSelector((state: RootState) => state.Project);
  const { branchDropdownList } = useSelector((state: RootState) => state.Branch);
  const { printProposalList, isLoading } = useSelector((state: RootState) => state.proposal);
  const [noOfProposalPrint, setNoOfProposalPrint] = useState("1");
  const [projectId, setProjectId] = useState<number>(0);
  const [branchId, setBranchId] = useState<number>(0);

  useEffect(() => {
    dispatch(getProjectListDropdown());
    dispatch(getBranchDropdownList());
  }, []);

  const onHandleInputChange = (name: string, value: string | number) => {
    switch (name) {
      case 'proposal_print_no':
        setNoOfProposalPrint(value + '');
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
      project_id: projectId,
      branch_id: branchId,
      agent_id: 1,
    }
    dispatch(printProposalAction(formData));
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
        <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">
          <Input
            label="Proposal Print No"
            name="proposal_print_no"
            placeholder="Proposal print no, eg: 10"
            isRequired={true}
            value={noOfProposalPrint}
            inputChange={onHandleInputChange}
          />
          <Select
            options={projectDropdownList}
            isSearchable={true}
            name="project_id"
            label="Bank"
            placeholder="Select Bank..."
            isRequired={true}
            defaultValue={projectId}
            handleChangeValue={onHandleInputChange}
          />
          <Select
            options={branchDropdownList}
            isSearchable={false}
            name="branch_id"
            label="Branch"
            placeholder="Select Branch..."
            isRequired={true}
            defaultValue={branchId}
            handleChangeValue={onHandleInputChange}
          />
        </div>

        <Button
          type="submit"
          title='Preview'
          loadingTitle="Generating Preview..."
          loading={isLoading}
          customClass='px-6 mt-4'
        />
      </form>

      {
        printProposalList !== undefined && printProposalList.length > 0 &&
        <>
          <div className="mt-2">
            <Button variant="success" onClick={handlePrint}>
              <i className="bi bi-printer"></i> Print
            </Button>
          </div>

          <div className="printDiv" ref={divRef}>
            {
              printProposalList.map((proposal: IProposalBasicInput, index: number) => (
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
    </>
  );
}
