import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { calculateAge, calculateBMI } from "@/utils/calculation";
import Button from '@/components/button';
import { NomineePersonalInformation } from "./NomineePersonalInformation";
import { NomineeAddressInformation } from "./NomineeAddressInformation";
import { NomineeBankInformation } from "./NomineeBankInformation";
import { NomineeGuardianInformation } from "./NomineeGuardianInformation";
import { addMultipleNomineeForm, changeNomineeInputValue, removeMultipleNomineeForm } from "@/redux/actions/proposal-action";
import { DeleteIconButton } from './../button/delete-icon-button';
import closestIndexTo from "date-fns/closestIndexTo";

export interface IPersonalInformation {
    // handleChangeTextInput: (name: string, value: any) => void;
    identityLabel: any;
    identityValidationMessage: any;
    disabledField: boolean;
    errors?: any;
}

export function NomineeForm({ errors }: IPersonalInformation) {
    const dispatch = useDispatch();

    const { proposalInput, identity_type, proposer_nominees } = useSelector((state: RootState) => state.proposal);
    const height = proposalInput?.proposal_personal_information?.height;
    const weight = proposalInput?.proposal_personal_information?.weight;
    const dob = proposalInput?.proposal_personal_information?.dob;
    const [age, setAge] = React.useState(0);
    const [BMI, setBMI] = React.useState({});
    const [nomineeIndex, setNomineeIndex] = React.useState(0);
    const [nomineeView, setNomineeView] = React.useState(false);


    React.useEffect(() => {
        if (typeof dob !== "undefined") {
            const getAge = calculateAge(dob);
            setAge(getAge);
        }
        if ((typeof height !== "undefined" && height !== null && height !== "") && (typeof weight !== "undefined" && weight !== null && weight !== "") && age !== 0) {
            const { bmi, status } = calculateBMI(height, weight, age);
            setBMI({
                bmi: bmi,
                status: status
            })
        }
    }, [height, weight, dob, age])

    const toggleNomineeForm = (status: boolean, index: number) => {
        setNomineeIndex(index);
        setNomineeView(status);
    }

    const handleChangeProposalNomineeInfo = (name: string, value: any, key: string, index: number) => {
        dispatch(changeNomineeInputValue(name, value, key, index, proposalInput));
    }

    return (
        <div className="border border-gray-200 mt-3 rounded-md shadow-md">
            <div className="flex items-baseline justify-between bg-slate-100 p-2">
                <h3 className="text-cyan-600 mb-3 text-2xl">
                    Nominee Information
                </h3>
                <Button
                    variant='primary'
                    customClass="p-1 rounded-md inline mr-1"
                    onClick={() => dispatch(addMultipleNomineeForm())}
                >
                    Add More
                    <i className="bi bi-plus"></i>

                </Button>
            </div>

            {
                proposalInput.proposer_nominees.length > 0 && proposalInput.proposer_nominees.map((nominee: any, index: number) => (
                    <div className="p-2 5" key={index + 1}>
                        <div className="bg-slate-100 rounded-md">
                            <div className="text-white bg-cyan-600 p-2 border-b-2 border-gray-300 rounded-t-md flex items-baseline justify-between">
                                <h3 className="text-md ml-3">
                                    Nominee - {index + 1}
                                </h3>
                                {
                                    proposalInput.proposer_nominees.length > 1 &&
                                    <div className="flex items-center gap-2">

                                        <DeleteIconButton
                                            toooltipTitle={`Nominee`}
                                            onClick={() => dispatch(removeMultipleNomineeForm(proposalInput.proposer_nominees, index))}
                                        />

                                        <Button
                                            variant='default'
                                            customClass="p-1 rounded-md inline mr-1"
                                            onClick={() => toggleNomineeForm(!nomineeView, index)}
                                        >
                                            {
                                                (nomineeIndex === index && nomineeView === true) ?
                                                    <i className="bi bi-chevron-up"></i> :
                                                    <i className="bi bi-chevron-down"></i>
                                            }

                                        </Button>
                                    </div>
                                }
                            </div>

                            <div className={`p-2 ${(nomineeIndex === index && nomineeView === true || proposalInput.proposer_nominees.length === (index + 1)) ? 'block' : 'hidden'}`}>
                                <NomineePersonalInformation
                                    handleChangeTextInput={handleChangeProposalNomineeInfo}
                                    errors={errors}
                                    id="proposal_personal_information"
                                    index={index}
                                    data={nominee.proposal_personal_information}
                                />
                                <NomineeAddressInformation
                                    handleChangeTextInput={handleChangeProposalNomineeInfo}
                                    errors={errors}
                                    index={index}
                                    ids={{
                                        permanent: "proposer_permanent_address",
                                        present: "proposer_present_address"
                                    }}
                                    data={{
                                        permanent: nominee.proposer_permanent_address,
                                        present: nominee.proposer_present_address
                                    }}
                                />

                                <NomineeGuardianInformation
                                    handleChangeTextInput={handleChangeProposalNomineeInfo}
                                    errors={errors}
                                    id="proposer_guardian"
                                    index={index}
                                    data={nominee.proposer_guardian}
                                />
                            </div>

                        </div>
                    </div>
                ))
            }
        </div >
    );
}