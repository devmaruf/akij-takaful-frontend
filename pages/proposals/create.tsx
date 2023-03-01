import { useEffect, useState } from "react";
import IBreadcrumb from "@/components/breadcrumb";
import PageTitle from "@/components/pageTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  getPlanDropdownList,
  changeInputValue,
  submitProposal,
} from "@/redux/actions/proposal-action";
import Button from "@/components/button";
import { PersonalInformation } from "@/components/proposals/PersonalInformation";
import { PremiumInformation } from "@/components/proposals/PremiumInformation";
import { AddressInformation } from "@/components/proposals/AddressInformation";
import { GuardianInformation } from "@/components/proposals/GuardianInformation";
import { BankInformation } from "@/components/proposals/BankInformation";
import { getProjectListDropdown } from "@/redux/actions/project-action";
import { getBranchDropdownList } from "@/redux/actions/branch-action";

export default function Create() {
  const dispatch = useDispatch();
  const { proposalInput, isSubmitting } = useSelector(
    (state: RootState) => state.proposal
  );
  const [key, setKey] = useState("");
  useEffect(() => {
    dispatch(getPlanDropdownList());
    dispatch(getProjectListDropdown());
    dispatch(getBranchDropdownList());
  }, []);

  const handleChangeTextInput = (name: string, value: any) => {
    dispatch(changeInputValue(name, value, ""));
  };

  const handleChangePersonalInfo = (name: string, value: any) => {
    dispatch(changeInputValue(name, value, "proposal_personal_information"));
  };
  const handleChangePresentAddressInfo = (name: string, value: any) => {
    dispatch(changeInputValue(name, value, "proposer_present_address"));
  };
  const handleChangePermanentAddressInfo = (name: string, value: any) => {
    dispatch(changeInputValue(name, value, "proposer_permanent_address"));
  };
  const handleChangeBankInfo = (name: string, value: any) => {
    dispatch(changeInputValue(name, value, "proposer_bank_information"));
  };
  const handleChangeGuardianInfo = (name: string, value: any) => {
    dispatch(changeInputValue(name, value, "proposer_guardian"));
  };

  const handleSubmitProposal = (e) => {
    console.log(e);

    dispatch(submitProposal(proposalInput));
    e.preventDefault();
  };

  return (
    <div>
      <div className="p-4 bg-white block sm:flex items-center justify-between border-b border-gray-200 lg:mt-1.5">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <IBreadcrumb />
            <PageTitle title="New Proposal" />
          </div>

          <div className="mt-2">
            <form
              method="post"
              autoComplete="off"
              encType="multipart/form-data"
            >
              <PremiumInformation
                handleChangeTextInput={handleChangeTextInput}
              />
              <PersonalInformation
                handleChangeTextInput={handleChangePersonalInfo}
              />
              <AddressInformation
                changePresentAddress={handleChangePresentAddressInfo}
                changePermanentAddress={handleChangePermanentAddressInfo}
              />
              <GuardianInformation
                handleChangeTextInput={handleChangeGuardianInfo}
              />
              <BankInformation handleChangeTextInput={handleChangeBankInfo} />

              <Button
                title="Save"
                loadingTitle="Saving..."
                onClick={(e) => handleSubmitProposal(e)}
                loading={isSubmitting}
                customClass="mt-4"
              />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
