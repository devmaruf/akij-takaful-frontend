import Input from "@/components/input";
import Select from "@/components/select";
import { relationList } from "@/utils/proposal-dropdowns";

export interface IGuardianInformation {
  handleChangeTextInput: (name: string, value: any, key: string, index: number) => void;
  errors?: any;
  id: string;
  index?: any;
  data: any;
}

export function NomineeGuardianInformation({ handleChangeTextInput, errors, index, id, data }: IGuardianInformation) {
  const changeNomineeInputVal = (name: string, value: any) => {
    handleChangeTextInput(name, value, id, index)
  }

  const onChangeGuardianDob = (name: string, value: any) => {
    changeNomineeInputVal('dob', value);
  }

  return (
    <div className="border border-gray-200 rounded-md shadow-md mt-3">
      <div className="bg-white text-cyan-600 mb-3 text-sm border border-gray-200">
        <h3 className="p-2"> Nominee Guardian Information</h3>
      </div>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-4 p-2">
        <Input
          label="Guardian Name"
          name="name"
          placeholder="Guardian Name"
          value={data.name}
          isRequired={true}
          inputChange={changeNomineeInputVal}
          errors={errors}
        />

        <Input
          label="Mobile No"
          name="phone_no"
          placeholder="Mobile No"
          value={data.phone_no}
          isRequired={false}
          inputChange={changeNomineeInputVal}
          errors={errors}
        />

        <Input
          label="Date of Birth"
          name="guardian_dob"
          type="date"
          placeholder="Date of Birth"
          value={data.dob}
          isRequired={true}
          inputChange={onChangeGuardianDob}
          errors={errors}
        />

        <Input
          label="ID No"
          name="id_no"
          placeholder="ID No"
          value={data.id_no}
          isRequired={true}
          inputChange={changeNomineeInputVal}
          errors={errors}
        />

        <Select
          options={relationList}
          isSearchable={true}
          name="relation"
          label="Relation"
          isRequired={true}
          defaultValue={data.relation}
          placeholder="Select Relation"
          handleChangeValue={changeNomineeInputVal}
          errors={errors}
        />
      </div>
    </div>
  );
}
