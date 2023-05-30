import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { RootState } from "@/redux/store";
import {
    changeInputValue,
    handleCheckIdentity,
    updateMedical,
} from "@/redux/actions/medical-action";
import { formValidation } from "@/utils/formValidation";
import { useDebounced } from "@/hooks/use-debounce";
import { getMedicalDetails } from "@/redux/actions/medical-action";
import Button from "@/components/button";
import Input from "@/components/input";
import Select from "@/components/select";
import { PageContentList } from "@/components/layouts/PageContentList";
import PageHeader from "@/components/layouts/PageHeader";
import Loading from "@/components/loading";

export default function MedicalForm() {
    const dispatch = useDispatch();
    const router = useRouter();
    const { id } = router.query;
    const [errors, setErrors] = useState({});
    const { medicalDetails, isSubmitting, loadingDetails } = useSelector((state: RootState) => state.medical);

    const medicalStatus=[
        {name:'Standard',code:'standard'},
        {name:'Sub Standard',code:'sub-standard'},
    ]

    useDebounced(() => {
        dispatch(getBranchDropdownList());
    });

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getMedicalDetails(id));
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


    // if (sectionName === 'proposal_personal_information' && name == 'identity_type') {
    //     dispatch(handleCheckIdentity(value))
    // }


const handleSubmitProposal = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const clickedButton = e.nativeEvent.submitter.name;
    if (clickedButton === "submitProposal") {
        const { errors, isValid } = formValidation(e);
        setErrors(errors);

        if (isValid) {
            dispatch(updateMedicalproposalInput, id, router));
        }
    }
};

return (
    <div>
        <PageHeader
            title="Medical"
            hasSearch={false}
        />

        <PageContentList>
            {
                loadingDetails ?
                    <div className="text-center">
                        <Loading loadingTitle="Medical information" />
                    </div>
                    :
                    <form
                        method="post"
                        autoComplete="off"
                        encType="multipart/form-data"
                        onSubmit={(e) => handleSubmitProposal(e)}
                        noValidate
                    >

                        <Select
                            options={medicalStatus}
                            isSearchable={true}
                            isRequired={true}
                            label="Medical Status"
                            name="status"
                            defaultValue={medicalStatus.name ?? ''}
                            placeholder="Decial Status"
                            handleChangeValue={onChangeText}
                            errors={errors}
                        />
                        <Input
                            label="Branch Name"
                            name="bank_branch_name"
                            placeholder="Branch Name"
                            value={medicalInput.bank_branch_name ?? ''}
                            isRequired={true}
                            inputChange={handleChangeTextInput}
                            errors={errors}
                        />

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
