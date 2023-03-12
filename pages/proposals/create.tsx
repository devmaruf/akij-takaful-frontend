import React, { useEffect } from "react";
import { useRouter } from "next/router";
import IBreadcrumb from "@/components/breadcrumb";
import PageTitle from "@/components/pageTitle";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import {
  getPlanDropdownList,
  changeInputValue,
  submitProposal,
  handleCheckIdentity,
} from "@/redux/actions/proposal-action";
import Button from "@/components/button";
import { PersonalInformation } from "@/components/proposals/PersonalInformation";
import { PremiumInformation } from "@/components/proposals/PremiumInformation";
import { AddressInformation } from "@/components/proposals/AddressInformation";
import { GuardianInformation } from "@/components/proposals/GuardianInformation";
import { BankInformation } from "@/components/proposals/BankInformation";
import { getProjectListDropdown } from "@/redux/actions/project-action";
import { getBranchDropdownList } from "@/redux/actions/branch-action";
import { formValidation } from "./../../utils/formValidation";

export default function Create() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { proposalInput, isSubmitting } = useSelector((state: RootState) => state.proposal);

  const [errors, setErrors] = React.useState({})

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
    if (name == 'identity_type') {
      dispatch(handleCheckIdentity(value))
    }
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

  const handleSubmitProposal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { errors, isValid } = formValidation(e);
    setErrors(errors);
    if (isValid) {
      dispatch(submitProposal(proposalInput, router));
    }
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
              onSubmit={(e) => handleSubmitProposal(e)}
              noValidate
            >
              <PremiumInformation
                handleChangeTextInput={handleChangeTextInput}
                errors={errors}
              />
              <PersonalInformation
                handleChangeTextInput={handleChangePersonalInfo}
                errors={errors}
              />
              <AddressInformation
                changePresentAddress={handleChangePresentAddressInfo}
                changePermanentAddress={handleChangePermanentAddressInfo}
                errors={errors}
              />
              <GuardianInformation
                handleChangeTextInput={handleChangeGuardianInfo}
                errors={errors}
              />
              <BankInformation handleChangeTextInput={handleChangeBankInfo} errors={errors} />

              <Button
                title="Save"
                loadingTitle="Saving..."
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
