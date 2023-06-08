import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { IProposalFormSection } from "@/redux/interfaces";
import Button from "@/components/button";
import Input from "@/components/input";
const parse = require('html-react-parser');

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

  const onHandleChangeNoMessage = (index: number, questionnaire: any, message: string) => {
    const updatedQuestionnaires = [...underwriting_questionnaires];
    updatedQuestionnaires[index] = {
      ...questionnaire,
      message,
    };

    onChangeText('underwriting_questionnaires', updatedQuestionnaires);
  }

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-md">
        Questionaires
      </h3>

      {
        underwriting_questionnaires.map((questionnaire: any, index: number) => (
          <div key={questionnaire.id}>
            {
              (questionnaire.gender === proposal_personal_information.gender
                || questionnaire.gender === 'both') &&
              <div className="flex flex-row px-4 border-b border-slate-200 pb-3 mb-2">
                <p className="basis-4/5">
                  {parse(questionnaire.requirement_name_en)}
                </p>
                <div>
                  <div className="flex">
                    <Button
                      variant="default"
                      title={`Yes`}
                      iconLeft={parseInt(questionnaire?.value) === 1 ? <i className="bi bi-check-circle-fill mr-1"></i> : <></>}
                      customClass={`mr-2 ${parseInt(questionnaire?.value) === 1 ? '!bg-green-500 text-white' : 'text-green-500'}`}
                      onClick={() => onHandleChangeTextInput(index, questionnaire, true)}
                    />

                    <Button
                      variant="default"
                      title="No"
                      iconLeft={parseInt(questionnaire?.value) === 0 ? <i className="bi bi-x-circle mr-1"></i> : <></>}
                      customClass={`mr-2 ${parseInt(questionnaire?.value) === 0 ? '!bg-red-500 text-white' : 'text-red-500'}`}
                      onClick={() => onHandleChangeTextInput(index, questionnaire, false)}
                    />
                  </div>
                  {
                    parseInt(questionnaire?.value) === 0 &&
                    <div>
                      <Input
                        type="textarea"
                        label="Why"
                        name={`questionnaire_${index}_response`}
                        isRequired={true}
                        value={questionnaire.message}
                        placeholder="Write why you've marked as No"
                        inputChange={(name: string, value: string) => onHandleChangeNoMessage(index, questionnaire, value)}
                        errors={errors}
                      />
                    </div>
                  }
                </div>
              </div>
            }
          </div>
        ))
      }
    </div>
  );
}
