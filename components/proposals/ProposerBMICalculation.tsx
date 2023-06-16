import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import Input from "@/components/input";
import { RootState } from "@/redux/store";
import { IBMI, calculateBMI } from "@/utils/calculation";
import { IProposalFormSection } from "@/redux/interfaces";
import SectionTitle from "../sectionTitle";

export default function ProposerBMICalculation({ onChangeText, errors }: IProposalFormSection) {
    const { proposalInput } = useSelector((state: RootState) => state.proposal);
    const personalInformation = proposalInput.proposal_personal_information;
    const { height, height_inch: heightInch, weight } = personalInformation;
    const [BMI, setBMI] = useState<IBMI>({
        bmi: 0,
        status: ''
    });

    useEffect(() => {
        const { bmi, status } = calculateBMI(height, heightInch, weight);
        setBMI({
            bmi: bmi,
            status: status
        })
    }, [height, heightInch, weight]);

    return (
        <div className="border border-gray-200 mt-3 p-2.5 rounded-md shadow-md">
            <SectionTitle title="BMI Calculation" />
            <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
                <div className="flex flex-1 w-full">
                    <Input
                        areaClassNames='flex-1'
                        label="Height Feet"
                        name="height"
                        type="number"
                        placeholder="feet, eg: 5"
                        value={personalInformation.height ?? ''}
                        isRequired={true}
                        inputChange={onChangeText}
                        errors={errors}
                    />

                    <Input
                        areaClassNames='flex-1 ml-1'
                        label="Height Inch"
                        name="height_inch"
                        type="number"
                        placeholder="inch, eg: 6"
                        value={personalInformation.height_inch ?? ''}
                        isRequired={true}
                        inputChange={onChangeText}
                        errors={errors}
                    />
                </div>

                <Input
                    label="Weight in KG"
                    name="weight"
                    type="number"
                    placeholder="kg; eg: 65"
                    value={personalInformation.weight ?? ''}
                    isRequired={true}
                    inputChange={onChangeText}
                />
                <div className="flex w-full">
                    <Input
                        areaClassNames='flex-1 ml-1 mt-1'
                        label="BMI"
                        name="bmi"
                        placeholder="Body Mass Index(BMI)"
                        value={BMI.bmi ?? ''}
                        isRequired={false}
                        inputChange={onChangeText}
                        errors={errors}
                        isDisabled={true}
                    />

                    <Input
                        areaClassNames='flex-1 ml-1 mt-1'
                        label="BMI status"
                        name="bmi_status"
                        placeholder=""
                        value={BMI.status ?? ''}
                        isRequired={false}
                        isDisabled={true}
                        inputChange={onChangeText}
                        errors={errors}
                    />
                </div>
            </div>
        </div>
    )
}
