import Input from "@/components/input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import { format } from 'date-fns';
import { useEffect, useState } from "react";

export interface IPrintInformation {
  handleChangeTextInput: (name: string, value: any) => void;
  handleBlur: (name: string, value: any) => void;
}

export function PrintInformation({ handleChangeTextInput, handleBlur }: IPrintInformation) {

  const { projectDropdownList } = useSelector((state: RootState) => state.Project);
  const { branchDropdownList } = useSelector((state: RootState) => state.Branch);
  const { proposalInput, planDropdownList } = useSelector((state: RootState) => state.proposal);

  const [placeHolderProposalNo, setplaceHolderProposalNo] = useState('');

  // useEffect(() => {
  //   const formattedDate = format(new Date(), 'yyyyMMdd');
  //   const randomNumber = Math.floor(10000 + Math.random() * 90000);
  //   setplaceHolderProposalNo(`ATLI-${formattedDate}-${randomNumber}`);
  // }, []);

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-2xl">
        Print Information
      </h3>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3 ">
        <Input
          label="Proposal Print No"
          name="proposal_print_no"
          placeholder="Proposal print no"
          value="10"
          isRequired={true}
          inputChange={handleChangeTextInput}
        />
        <Select
          options={projectDropdownList}
          isSearchable={true}
          name="project_id"
          label="Bank"
          defaultValue=""
          placeholder="Select Bank..."
          isRequired={true}
          handleChangeValue={handleChangeTextInput}
        />
        <Select
          options={branchDropdownList}
          isSearchable={false}
          name="branch_id"
          label="Branch"
          defaultValue=""
          placeholder="Select Branch..."
          isRequired={true}
          handleChangeValue={handleChangeTextInput}
        />
        <Input
          label="Agent Name"
          name="agent_id"
          placeholder="Agent name"
          value={proposalInput.agent_id}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
              <h2 className="ml-5">Select Plan</h2>
              
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id="vue-checkbox-list" type="checkbox" value="checkbox1" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Plan 01</label>
                </div>
            </li>
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                    <input id="vue-checkbox-list" type="checkbox" value="checkbox2" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
                    <label className="w-full py-3 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Plan 02</label>
                </div>
            </li>
        </ul>

      </div>
    </div>
  );
}
