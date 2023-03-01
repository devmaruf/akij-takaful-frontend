import * as React from "react";
import Input from "@/components/input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";

export interface IAddressInformation {
  handleChangeTextInput: (name: string, value: any) => void;
}

export function AddressInformation({
  changePresentAddress,
  changePermanentAddress,
}: IAddressInformation) {
  const { proposalInput } = useSelector((state: RootState) => state.proposal);

  const divisionList = [
    { label: "Barishal", value: "barishal" },
    { label: "Chattogram", value: "chattogram" },
    { label: "Dhaka ", value: "dhaka " },
    { label: "Khulna ", value: "khulna " },
    { label: "Rajshahi", value: "rajshahi" },
    { label: "Rangpur", value: "rangpur" },
    { label: "Sylhet", value: "sylhet" },
  ];

  const districtList = [
    { label: "Chattogram", value: "chattogram" },
    { label: "Dhaka", value: "dhaka" },
    { label: "Rangamati", value: "rangamati" },
    { label: "Faridpur", value: "raridpur" },
    { label: "Nowakhali", value: "nowakhali" },
  ];

  const areaList = [
    { label: "Karnaphuli", value: "karnaphuli" },
    { label: "Patiya", value: "patiya" },
    { label: "Mohakhali", value: "mohakhali" },
    { label: "Jatrabari", value: "jatrabari" },
  ];

  const nomineeList = [
    { label: "Mr. Rahim", value: 1 },
    { label: "Mr. Karim", value: 2 },
    { label: "Mr. Abul Kalam", value: 3 },
    { label: "Mr. Zihad", value: 4 },
  ];

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-2xl">
        Address Information
      </h3>

      <h4 className="my-2 text-black text-xl">Permanent Address</h4>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3 border-b pb-5">
        <Select
          options={divisionList}
          isSearchable={true}
          name="division_id"
          value={proposalInput.proposer_permanent_address.division_id}
          label="Division"
          defaultValue=""
          placeholder="Select Division..."
          handleChangeValue={changePermanentAddress}
        />

        <Select
          options={districtList}
          isSearchable={true}
          name="district_id"
          label="District"
          value={proposalInput.proposer_permanent_address.district_id}
          defaultValue=""
          placeholder="Select District..."
          handleChangeValue={changePermanentAddress}
        />
        <Select
          options={areaList}
          isSearchable={true}
          name="area_id"
          value={proposalInput.proposer_permanent_address.area_id}
          label="Area"
          defaultValue=""
          placeholder="Select Area..."
          handleChangeValue={changePermanentAddress}
        />

        <Input
          label="Post Office Name"
          name="post_office_name"
          placeholder="Post Office Name"
          value={proposalInput.proposer_permanent_address.post_office_name}
          isRequired={true}
          inputChange={changePermanentAddress}
        />

        <Input
          label="Street address"
          name="street_address"
          placeholder="Street address"
          value={proposalInput.proposer_permanent_address.street_address}
          isRequired={true}
          inputChange={changePermanentAddress}
        />

        <div className="flex items-center mb-4">
          <input
            id="same_as_parmanent"
            type="checkbox"
            value=""
            className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2"
          />
          <label
            htmlFor="same_as_parmanent"
            className="ml-2 text-sm font-medium text-gray-900"
          >
            Is Same Address
          </label>
        </div>
      </div>
      <h4 className="my-2 text-black mt-5 text-xl">Present Address</h4>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
        <Select
          options={nomineeList}
          isSearchable={true}
          name="proposal_nominee_id"
          label="Proposal Nominee"
          defaultValue=""
          value={proposalInput.proposer_present_address.proposal_nominee_id}
          placeholder="Nominee Name"
          handleChangeValue={changePresentAddress}
        />

        <Select
          options={divisionList}
          isSearchable={true}
          name="division_id"
          label="Division"
          value={proposalInput.proposer_present_address.division_id}
          defaultValue=""
          placeholder="Select Division..."
          handleChangeValue={changePresentAddress}
        />

        <Select
          options={districtList}
          isSearchable={true}
          name="district_id"
          label="District"
          value={proposalInput.proposer_present_address.district_id}
          defaultValue=""
          placeholder="Select District..."
          handleChangeValue={changePresentAddress}
        />

        <Select
          options={areaList}
          isSearchable={true}
          name="area_id"
          label="Area"
          value={proposalInput.proposer_present_address.area_id}
          defaultValue=""
          placeholder="Select Area..."
          handleChangeValue={changePresentAddress}
        />

        <Input
          label="Post Office Name"
          name="post_office_name"
          placeholder="Post Office Name"
          value={proposalInput.proposer_present_address.post_office_name}
          isRequired={true}
          inputChange={changePresentAddress}
        />
        <Input
          label="Street address"
          name="street_address"
          placeholder="Street address"
          value={proposalInput.proposer_present_address.street_address}
          isRequired={true}
          inputChange={changePresentAddress}
        />
      </div>
    </div>
  );
}
