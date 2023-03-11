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
} from "@/redux/actions/proposal-action";
import Button from "@/components/button";
import { getProjectListDropdown } from "@/redux/actions/project-action";
import { getBranchDropdownList } from "@/redux/actions/branch-action";
import { PrintInformation } from "@/components/proposals/PrintInformation";

export default function Create() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { proposalInput, isSubmitting } = useSelector((state: RootState) => state.proposal);

  const [identityLabel, setIdentityLabel] = React.useState("ID No")
  const [identityValidationMessage, setIdentityValidationMessage] = React.useState("Please select identity type first")
  const [disabledField, setDisabledField] = React.useState(true)

  useEffect(() => {
    dispatch(getPlanDropdownList());
    dispatch(getProjectListDropdown());
    dispatch(getBranchDropdownList());
  }, []);

  const handleChangeTextInput = (name: string, value: any) => {
    dispatch(changeInputValue(name, value, ""));
    // const isValid = validateForm(name, "test message")

  };

  // const { errors, validateEmail, validateNumber, validatePassword } =
  // FormValidation();

  const handleSubmitProposal = (e: React.ChangeEvent<HTMLInputElement>) => {

    // if (!isValid) {
    //   return false
    // }
    //dispatch(submitProposal(proposalInput, router));
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
              <PrintInformation />

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
