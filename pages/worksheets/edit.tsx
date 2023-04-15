import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { RootState } from "@/redux/store";
import {
  changeInputValue,
  handleCheckIdentity,
  getProposalDetails,
  updateProposal,
} from "@/redux/actions/proposal-action";
import Button from "@/components/button";
import BankBranchInformation from "@/components/proposals/BankBranchInformation";
import ClientBankInformation from "@/components/proposals/ClientBankInformation";
import { PersonalInformation } from "@/components/proposals/PersonalInformation";
import { AddressInformation } from "@/components/proposals/AddressInformation";
import { getBranchDropdownList } from "@/redux/actions/branch-action";
import { getAgentsDropdownList } from "@/redux/actions/employee-action";
import { formValidation } from "@/utils/formValidation";
import PageHeader from "@/components/layouts/PageHeader";
import { PageContentList } from "@/components/layouts/PageContentList";
import Loading from "@/components/loading";
import { Questionaires } from "@/components/proposals/Questionaires";
import { NomineeForm } from "@/components/proposals/NomineeForm";
import { useDebounced } from "@/hooks/use-debounce";
import { getProductDropdownListAction } from "@/redux/actions/product-action";
import { PreviousConcurrentPolicyStatus } from "@/components/proposals/PreviousConcurrentPolicyStatus";
import PremiumInformation from "@/components/proposals/PremiumInformation";
import ProposerBMICalculation from "@/components/proposals/ProposerBMICalculation";

export default function EnlistmentPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const [errors, setErrors] = useState({});
  const { proposalInput, isSubmitting, loadingDetails } = useSelector((state: RootState) => state.proposal);

  useDebounced(() => {
    dispatch(getBranchDropdownList());
    dispatch(getAgentsDropdownList());
    dispatch(getProductDropdownListAction());
  });

  const debouncedDispatch = useCallback(
    debounce(() => {
      dispatch(getProposalDetails(id));
    }, 500),
    [id]
  );

  useEffect(() => {
    debouncedDispatch();
    return debouncedDispatch.cancel;
  }, [debouncedDispatch]);

  const handleChangeTextInput = (name: string, value: any) => {
    dispatch(changeInputValue(name, value, ""));
  };

  const onChangeFormSectionInput = (name: string, value: any, sectionName: string) => {
    dispatch(changeInputValue(name, value, sectionName));

    if (sectionName === 'proposal_personal_information' && name == 'identity_type') {
      dispatch(handleCheckIdentity(value))
    }
  };

  const handleSubmitProposal = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const clickedButton = e.nativeEvent.submitter.name;
    if (clickedButton === "submitProposal") {
      const { errors, isValid } = formValidation(e);
      setErrors(errors);

      if (isValid) {
        dispatch(updateProposal(proposalInput, id, router));
      }
    }
  };

  return (
    <div>
      <PageHeader
        title="Worksheet"
        hasSearch={false}
      />

      <PageContentList>
        {
          loadingDetails ?
            <div className="text-center">
              <Loading loadingTitle="Worksheet information" />
            </div>
            :
            <form
              method="post"
              autoComplete="off"
              encType="multipart/form-data"
              onSubmit={(e) => handleSubmitProposal(e)}
              noValidate
            >
              <BankBranchInformation
                onChangeText={handleChangeTextInput}
                errors={errors}
              />

              {
                proposalInput.proposer_bank_information !== undefined &&
                proposalInput.proposer_bank_information !== null &&
                <ClientBankInformation
                  onChangeText={(name: string, value: any) => {
                    onChangeFormSectionInput(name, value, 'proposer_bank_information')
                  }}
                  errors={errors}
                />
              }

              {
                proposalInput.proposal_personal_information !== undefined &&
                proposalInput.proposal_personal_information !== null &&
                <PersonalInformation
                  onChangeText={(name: string, value: any) => {
                    onChangeFormSectionInput(name, value, 'proposal_personal_information')
                  }}
                  errors={errors}
                />
              }

              {
                proposalInput.proposer_permanent_address !== undefined &&
                proposalInput.proposer_permanent_address !== null &&
                proposalInput.proposer_present_address !== undefined &&
                proposalInput.proposer_present_address !== null &&
                <AddressInformation
                  onChangePermanentAddress={(name: string, value: any) => {
                    onChangeFormSectionInput(name, value, 'proposer_permanent_address')
                  }}
                  onChangePresentAddress={(name: string, value: any) => {
                    onChangeFormSectionInput(name, value, 'proposer_present_address')
                  }}
                  onChangeText={handleChangeTextInput}
                  errors={errors}
                />
              }

              {
                proposalInput.proposer_nominees !== undefined &&
                <NomineeForm errors={errors} />
              }

              <PreviousConcurrentPolicyStatus />

              <PremiumInformation
                onChangeText={handleChangeTextInput}
                errors={errors}
              />

              {
                proposalInput.proposal_personal_information !== undefined &&
                proposalInput.proposal_personal_information !== null &&
                <ProposerBMICalculation
                  onChangeText={(name: string, value: any) => {
                    onChangeFormSectionInput(name, value, 'proposal_personal_information')
                  }}
                  errors={errors}
                />
              }

              {
                proposalInput.proposal_personal_information !== undefined &&
                <Questionaires
                  onChangeText={(name: string, value: any) => {
                    onChangeFormSectionInput(name, value, '')
                  }}
                  errors={errors}
                />
              }

              <Button
                name="submitProposal"
                title="Save"
                loadingTitle="Saving..."
                loading={isSubmitting}
                customClass="mt-4"
              />
            </form>
        }
      </PageContentList>
    </div>
  );
}
