import { useSelector } from "react-redux";

import Input from "@/components/input";
import { RootState } from "@/redux/store";
import { IProposalFormSection } from "@/redux/interfaces";

export function ChildEducation({ onChangeText, errors }: IProposalFormSection) {
  const { proposalInput } = useSelector((state: RootState) => state.proposal);
  const { proposer_guardian: guardianInformation } = proposalInput;

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-md">
        Child Information
      </h3>

      <div className="grid gap-2 grid-cols-1 md:grid-cols-4" >
        <Input
          label="Child Name"
          name="name"
          placeholder="Child Name"
          value={guardianInformation.name}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />

        <Input
          label="Date of Birth"
          name="dob"
          type="date"
          placeholder="Date of Birth"
          value={guardianInformation.dob}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />

        <Input
          label="Birth Certificate no."
          name="id_no"
          placeholder="Birth Certificate no."
          value={guardianInformation.id_no}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />
      </div>
    </div>
  );
}
