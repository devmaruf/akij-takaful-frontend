import * as React from "react";
import Input from "@/components/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";

export interface IAddressInformation {
  handleChangeTextInput: (name: string, value: any) => void;
}

export function AddressInformation({
  handleChangeTextInput,
}: IAddressInformation) {
  const dispatch = useDispatch();
  const { proposalInput, planList, isSubmitting } = useSelector(
    (state: RootState) => state.Proposal
  );

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-2xl">
        Address Information
      </h3>

      <h4 className="my-2 text-black text-xl">Permanent Address</h4>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3 border-b pb-5">
        <Select
          options={[
            {
              label: "Nominee 01",
              value: "nominee-01",
            },
            {
              label: "Nominee 02",
              value: "nominee-02",
            },
          ]}
          isSearchable={true}
          name="proposal_nominee_id"
          label="Proposal Nominee"
          defaultValue=""
          placeholder="Nominee Name"
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="Street address"
          name="name"
          placeholder="Street address"
          value={proposalInput.proposal_no}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Post Office Name"
          name="post_office_name"
          placeholder="Post Office Name"
          value={proposalInput.post_office_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Select
          options={[
            {
              label: "Area-01",
              value: "area-01",
            },
            {
              label: "Area-02",
              value: "area-02",
            },
          ]}
          isSearchable={true}
          name="area_id"
          label="Area"
          defaultValue=""
          placeholder="Select Area..."
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="Area Name"
          name="area_name"
          placeholder="Area Name"
          value={proposalInput.area_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Select
          options={[
            {
              label: "District-01",
              value: "district-01",
            },
            {
              label: "District-02",
              value: "district-02",
            },
          ]}
          isSearchable={true}
          name="district_id"
          label="District"
          defaultValue=""
          placeholder="Select District..."
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="District Name"
          name="district_name"
          placeholder="District Name"
          value={proposalInput.district_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Select
          options={[
            {
              label: "Division-01",
              value: "division-01",
            },
            {
              label: "Division-02",
              value: "division-02",
            },
          ]}
          isSearchable={true}
          name="division_id"
          label="Division"
          defaultValue=""
          placeholder="Select Division..."
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="Division Name"
          name="division_name"
          placeholder="Division Name"
          value={proposalInput.division_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Select
          options={[
            {
              label: "Yes",
              value: "yes",
            },
            {
              label: "No",
              value: "no",
            },
          ]}
          isSearchable={true}
          name="is_same_address"
          label="Is Same Address"
          defaultValue=""
          placeholder="Select Address Type..."
          handleChangeValue={handleChangeTextInput}
        />
      </div>

      <h4 className="my-2 text-black mt-5 text-xl">Present Address</h4>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
        <Select
          options={[
            {
              label: "Nominee 01",
              value: "nominee-01",
            },
            {
              label: "Nominee 02",
              value: "nominee-02",
            },
          ]}
          isSearchable={true}
          name="proposal_nominee_id"
          label="Proposal Nominee"
          defaultValue=""
          placeholder="Nominee Name"
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="Street address"
          name="name"
          placeholder="Street address"
          value={proposalInput.proposal_no}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Input
          label="Post Office Name"
          name="post_office_name"
          placeholder="Post Office Name"
          value={proposalInput.post_office_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Select
          options={[
            {
              label: "Area-01",
              value: "area-01",
            },
            {
              label: "Area-02",
              value: "area-02",
            },
          ]}
          isSearchable={true}
          name="area_id"
          label="Area"
          defaultValue=""
          placeholder="Select Area..."
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="Area Name"
          name="area_name"
          placeholder="Area Name"
          value={proposalInput.area_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Select
          options={[
            {
              label: "District-01",
              value: "district-01",
            },
            {
              label: "District-02",
              value: "district-02",
            },
          ]}
          isSearchable={true}
          name="district_id"
          label="District"
          defaultValue=""
          placeholder="Select District..."
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="District Name"
          name="district_name"
          placeholder="District Name"
          value={proposalInput.district_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Select
          options={[
            {
              label: "Division-01",
              value: "division-01",
            },
            {
              label: "Division-02",
              value: "division-02",
            },
          ]}
          isSearchable={true}
          name="division_id"
          label="Division"
          defaultValue=""
          placeholder="Select Division..."
          handleChangeValue={handleChangeTextInput}
        />

        <Input
          label="Division Name"
          name="division_name"
          placeholder="Division Name"
          value={proposalInput.division_name}
          isRequired={true}
          inputChange={handleChangeTextInput}
        />

        <Select
          options={[
            {
              label: "Yes",
              value: "yes",
            },
            {
              label: "No",
              value: "no",
            },
          ]}
          isSearchable={true}
          name="is_same_address"
          label="Is Same Address"
          defaultValue=""
          placeholder="Select Address Type..."
          handleChangeValue={handleChangeTextInput}
        />
      </div>
    </div>
  );
}
