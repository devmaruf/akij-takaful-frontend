import { Label, ToggleSwitch } from "flowbite-react";
import { useSelector } from "react-redux";
import ReactHtmlParser from 'react-html-parser';

import { RootState } from "@/redux/store";
import { IProposalFormSection } from "@/redux/interfaces";

export function Questionaires({ onChangeText, errors }: IProposalFormSection) {
  const { proposalInput } = useSelector((state: RootState) => state.proposal);
  const { proposal_personal_information, underwriting_questionnaires } = proposalInput;

  const onHandleChangeTextInput = (index: number, questionnaire: any, isChecked: boolean) => {
    const updatedQuestionnaires = [...underwriting_questionnaires];
    updatedQuestionnaires[index] = {
      ...questionnaire,
      value: isChecked ? 1 : 0,
    };

    onChangeText('underwriting_questionnaires', updatedQuestionnaires);
  }

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-2xl">
        Questionaires
      </h3>

      {
        underwriting_questionnaires.map((questionnaire: any, index: number) => (
          <Label key={questionnaire.id}>
            <div className="flex flex-row px-4 border-b border-slate-200 pb-3 mb-2">
              <p className="basis-4/5">
                {ReactHtmlParser(questionnaire.requirement_name_en)}
              </p>
              <div>
                <ToggleSwitch
                  className="basis-1/5"
                  checked={parseInt(questionnaire?.value) === 1}
                  label=""
                  onChange={(isChecked) => onHandleChangeTextInput(index, questionnaire, isChecked)}
                />
              </div>
            </div>
          </Label>
        ))
      }
    </div>
  );
}
