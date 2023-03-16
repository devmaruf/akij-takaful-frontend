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
  getProposalDetails,
} from "@/redux/actions/proposal-action";
import Button from "@/components/button";
import { PersonalInformation } from "@/components/proposals/PersonalInformation";
import { PremiumInformation } from "@/components/proposals/PremiumInformation";
import { AddressInformation } from "@/components/proposals/AddressInformation";
import { GuardianInformation } from "@/components/proposals/GuardianInformation";
import { BankInformation } from "@/components/proposals/BankInformation";
import { getProjectListDropdown } from "@/redux/actions/project-action";
import { getBranchDropdownList } from "@/redux/actions/branch-action";
import { formValidation } from "@/utils/formValidation";
import PageHeader from "@/components/layouts/PageHeader";
import { PageContent } from "@/components/layouts/PageContent";
import Loading from "@/components/loading";
import { Questionaires } from "@/components/proposals/Questionaires";

export default function Create() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { proposalInput, isSubmitting, loadingDetails } = useSelector((state: RootState) => state.proposal);

  const [errors, setErrors] = React.useState({})

  useEffect(() => {
    dispatch(getPlanDropdownList());
    dispatch(getProjectListDropdown());
    dispatch(getBranchDropdownList());
  }, []);

  useEffect(() => {
    if (id !== undefined && parseInt(id + '') > 0) {
      dispatch(getProposalDetails(id))
    }
  }, [id]);

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
      <PageHeader
        title="Enlist proposal"
        hasSearch={false}
      />

      <PageContent>
        {
          loadingDetails ?
            <Loading loadingTitle="Proposal information" />
            :
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
              {
                proposalInput.proposal_personal_information !== undefined &&
                <PersonalInformation
                  handleChangeTextInput={handleChangePersonalInfo}
                  errors={errors}
                />
              }

              {
                proposalInput.proposer_permanent_address !== undefined &&
                <AddressInformation
                  changePresentAddress={handleChangePresentAddressInfo}
                  changePermanentAddress={handleChangePermanentAddressInfo}
                  errors={errors}
                />
              }

              {
                proposalInput.proposer_guardian !== undefined &&
                <GuardianInformation
                  handleChangeTextInput={handleChangeGuardianInfo}
                  errors={errors}
                />
              }

              {
                proposalInput.proposer_bank_information !== undefined &&
                <BankInformation handleChangeTextInput={handleChangeBankInfo} errors={errors} />
              }

              {
                proposalInput.proposal_personal_information !== undefined &&
                <Questionaires proposalId={parseInt(id + '')}/>
              }

              <Button
                title="Save"
                loadingTitle="Saving..."
                loading={isSubmitting}
                customClass="mt-4"
              />
            </form>
        }

      </PageContent>
    </div>
  );
}
