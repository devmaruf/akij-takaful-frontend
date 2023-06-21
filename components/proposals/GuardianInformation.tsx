import { useSelector } from "react-redux";

import Input from "@/components/input";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import { relationList } from "@/utils/proposal-dropdowns";
import { IProposalFormSection } from "@/redux/interfaces";

export function GuardianInformation({ onChangeText, errors }: IProposalFormSection) {
  const { proposalInput } = useSelector((state: RootState) => state.proposal);
  const { proposer_guardian: guardianInformation } = proposalInput;

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-md">
        Guardian Information
      </h3>

      <div className="grid gap-2 grid-cols-1 md:grid-cols-4" >
        <Input
          label="Guardian Name"
          name="name"
          placeholder="Guardian Name"
          value={guardianInformation.name}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />

        <Input
          label="Mobile No"
          name="phone_no"
          placeholder="Mobile No"
          value={guardianInformation.phone_no}
          isRequired={true}
          minLength={11}
          maxLength={11}
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
          label="ID No"
          name="id_no"
          placeholder="ID No"
          value={guardianInformation.id_no}
          isRequired={true}
          inputChange={onChangeText}
          errors={errors}
        />

        {/* <Input
          label="Relation"
          name="relation"
          placeholder="Relation"
          value={guardianInformation.relation}
          isRequired={true}
          inputChange={onChangeText}
        /> */}
        <Select
          options={relationList}
          isSearchable={true}
          name="relation"
          label="Relation"
          isRequired={true}
          defaultValue={guardianInformation.relation}
          placeholder="Select Relation"
          handleChangeValue={onChangeText}
          errors={errors}
        />
      </div>
    </div>
  );
}
