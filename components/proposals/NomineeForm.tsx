import * as React from "react";
import Input from "@/components/input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import { GenderList, identityTypeList, MaritalStatusList, religionList } from "@/utils/proposal-dropdowns";
import ValidationMessage from "../validationMessage";
import { calculateAge, calculateBMI } from "@/utils/calculation";
import { Accordion, Tabs } from "flowbite-react";
import Button from '@/components/button';
import { type } from './../../redux/store/index';
import { NomineePersonalInformation } from "./NomineePersonalInformation";
import { NomineeAddressInformation } from "./NomineeAddressInformation";
import { NomineeBankInformation } from "./NomineeBankInformation";
import { NomineeGuardianInformation } from "./NomineeGuardianInformation";

export interface IPersonalInformation {
    handleChangeTextInput: (name: string, value: any) => void;
    identityLabel: any;
    identityValidationMessage: any;
    disabledField: boolean;
    errors?: any;
}

export function NomineeForm({ handleChangeTextInput, errors }: IPersonalInformation) {
    const { proposalInput, identity_type } = useSelector((state: RootState) => state.proposal);
    const height = proposalInput?.proposal_personal_information?.height;
    const weight = proposalInput?.proposal_personal_information?.weight;
    const dob = proposalInput?.proposal_personal_information?.dob;
    const [age, setAge] = React.useState(0);
    const [BMI, setBMI] = React.useState({});

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

    const handleChangePresentAddressInfo = (name: string, value: any) => {
        // dispatch(changeInputValue(name, value, "proposer_present_address"));
    };
    const handleChangePermanentAddressInfo = (name: string, value: any) => {
        // dispatch(changeInputValue(name, value, "proposer_permanent_address"));
    };

    const [nominee, setNominee] = React.useState([1]);

    const handleAddNewNominee = () => {
        const newList = [...nominee, nominee.length + 1];
        setNominee(newList)
    }

    return (
        <div className="border border-gray-200 mt-3 rounded-md shadow-md">
            <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-2xl">
                Nominee Information
            </h3>

            {
                nominee.length > 0 && nominee.map((item, index) => (
                    <div className="p-2 5" key={index + 1}>
                        <div className="bg-slate-100 rounded-md">

                            {
                                nominee.length === (index + 1) ? (
                                    <div>
                                        <div className="text-white bg-cyan-600 p-2 border-b-2 border-gray-300 rounded-t-md flex items-baseline justify-between">
                                            <h3 className="text-md ml-3">
                                                Nominee - {index + 1}
                                            </h3>

                                            <a
                                                className='text-gray-900 bg-white focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg transition text-xs text-center leading-none px-3 py-2 hover:opacity-80 flex gap-2 items-center mr-3'
                                                onClick={() => handleAddNewNominee()}
                                            >
                                                Add More
                                                <i className="bi bi-plus"></i>
                                            </a>
                                        </div>

                                        <div className="p-2">
                                            <NomineePersonalInformation
                                                handleChangeTextInput={handleChangeTextInput}
                                                errors={errors}
                                            />
                                            <NomineeAddressInformation
                                                changePresentAddress={handleChangePresentAddressInfo}
                                                changePermanentAddress={handleChangePermanentAddressInfo}
                                                errors={errors}
                                            />
                                            <NomineeBankInformation
                                                handleChangeTextInput={handleChangeTextInput}
                                                errors={errors}
                                            />
                                            <NomineeGuardianInformation
                                                handleChangeTextInput={handleChangeTextInput}
                                                errors={errors}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <Accordion alwaysOpen={true} className="divide-none p-0">
                                        <Accordion.Panel>
                                            <Accordion.Title className="bg-cyan-600 text-white hover:bg-cyan-600 transition p-2 py-0">
                                                Nominee - {index + 1}
                                            </Accordion.Title>
                                            <Accordion.Content>
                                                <div className="">
                                                    <NomineePersonalInformation
                                                        handleChangeTextInput={handleChangeTextInput}
                                                        errors={errors}
                                                    />
                                                    <NomineeAddressInformation
                                                        changePresentAddress={handleChangePresentAddressInfo}
                                                        changePermanentAddress={handleChangePermanentAddressInfo}
                                                        errors={errors}
                                                    />
                                                    <NomineeBankInformation
                                                        handleChangeTextInput={handleChangeTextInput}
                                                        errors={errors}
                                                    />
                                                    <NomineeGuardianInformation
                                                        handleChangeTextInput={handleChangeTextInput}
                                                        errors={errors}
                                                    />
                                                </div>
                                            </Accordion.Content>
                                        </Accordion.Panel>
                                    </Accordion>
                                )
                            }









                            {/* <div className="text-gray-700 p-2 border-b-2 border-gray-300 flex items-baseline justify-between">
                                    <h3 className="text-md ml-3">
                                        Nominee - 1
                                    </h3>

                                    <a
                                        className='text-white transition bg-cyan-600 focus:ring-4 focus:ring-cyan-200 font-medium rounded-lg text-xs text-center leading-none px-3 py-2 hover:opacity-80 flex gap-2 items-center mr-3'
                                        onClick={() => handleAddNewNominee()}
                                    >
                                        Add More
                                        <i className="bi bi-plus"></i>
                                    </a>
                                </div>

                                <div className="p-2">
                                    <NomineePersonalInformation
                                        handleChangeTextInput={handleChangeTextInput}
                                        errors={errors}
                                    />
                                    <NomineeAddressInformation
                                        changePresentAddress={handleChangePresentAddressInfo}
                                        changePermanentAddress={handleChangePermanentAddressInfo}
                                        errors={errors}
                                    />
                                    <NomineeBankInformation
                                        handleChangeTextInput={handleChangeTextInput}
                                        errors={errors}
                                    />
                                    <NomineeGuardianInformation
                                        handleChangeTextInput={handleChangeTextInput}
                                        errors={errors}
                                    />
                                </div> */}

                        </div>
                    </div>
                ))
            }

        </div >
    );
}