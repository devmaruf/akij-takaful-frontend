import * as React from "react";
import Input from "@/components/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import { isSameAddressCheck } from "@/redux/actions/proposal-action";
import { areaList, districtList, divisionList } from "@/utils/proposal-dropdowns";

export interface IAddressInformation {
  handleChangeTextInput: (name: string, value: any) => void;
  errors?: any;
}

export function AddressInformation({ changePresentAddress, changePermanentAddress, errors }: IAddressInformation) {

  const dispatch = useDispatch();

  const { proposalInput, isSameAddress } = useSelector((state: RootState) => state.proposal);

  const handleCheckedSameAddress = (event, proposalInput) => {
    const isChecked = event.target.checked;
    dispatch(isSameAddressCheck(isChecked, proposalInput.proposer_permanent_address))
  }

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
          defaultValue={proposalInput.proposer_permanent_address.defaultDivision}
          placeholder="Select Division..."
          handleChangeValue={changePermanentAddress}
          errors={errors}
        />

        <Select
          options={districtList}
          isSearchable={true}
          name="district_id"
          label="District"
          value={proposalInput.proposer_permanent_address.district_id}
          defaultValue={proposalInput.proposer_permanent_address.defaultDistrict}
          placeholder="Select District..."
          handleChangeValue={changePermanentAddress}
          errors={errors}
        />
        <Select
          options={areaList}
          isSearchable={true}
          name="area_id"
          value={proposalInput.proposer_permanent_address.area_id}
          label="Area"
          defaultValue={proposalInput.proposer_permanent_address.defaultArea}
          placeholder="Select Area..."
          handleChangeValue={changePermanentAddress}
          errors={errors}
        />

        <Input
          label="Post Office Name"
          name="post_office_name"
          placeholder="Post Office Name"
          value={proposalInput.proposer_permanent_address.post_office_name}
          isRequired={true}
          inputChange={changePermanentAddress}
          errors={errors}
        />

        <Input
          label="Street address"
          name="street_address"
          placeholder="Street address"
          value={proposalInput.proposer_permanent_address.street_address}
          isRequired={true}
          inputChange={changePermanentAddress}
          errors={errors}
        />

        <div className="flex items-center mb-4 col-span-3">
          <input
            id="same_as_parmanent"
            type="checkbox"
            value=""
            checked={isSameAddress}
            onChange={(e) => handleCheckedSameAddress(e, proposalInput)}
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
      <div
      // className={isSameAddress ? 'block' : 'hidden'}
      >
        <h4 className="my-2 text-black mt-5 text-xl">Present Address</h4>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
          <Select
            options={[
              {
                label: "Present",
                value: "present",
              },
            ]}
            isSearchable={true}
            name="address_type"
            value={proposalInput.proposer_present_address.address_type}
            label="Address Type"
            defaultValue="present"
            placeholder="Address Type"
            handleChangeValue={changePresentAddress}
          />

          <Select
            options={divisionList}
            isSearchable={true}
            name="division_id"
            label="Division"
            // value={proposalInput.proposer_present_address.division_id}
            defaultValue={proposalInput.proposer_present_address.defaultDivision}
            placeholder="Select Division..."
            handleChangeValue={changePresentAddress}
            errors={errors}
          />

          <Select
            options={districtList}
            isSearchable={true}
            name="district_id"
            label="District"
            value={proposalInput.proposer_present_address.district_id}
            defaultValue={proposalInput.proposer_present_address.defaultDistrict}
            placeholder="Select District..."
            handleChangeValue={changePresentAddress}
            errors={errors}
          />

          <Select
            options={areaList}
            isSearchable={true}
            name="area_id"
            label="Area"
            value={proposalInput.proposer_present_address.area_id}
            defaultValue={proposalInput.proposer_present_address.defaultArea}
            placeholder="Select Area..."
            handleChangeValue={changePresentAddress}
            errors={errors}
          />

          <Input
            label="Post Office Name"
            name="post_office_name"
            placeholder="Post Office Name"
            value={proposalInput.proposer_present_address.post_office_name}
            isRequired={true}
            isDisabled={isSameAddress}
            inputChange={changePresentAddress}
            errors={errors}
          />
          <Input
            label="Street address"
            name="street_address"
            placeholder="Street address"
            value={proposalInput.proposer_present_address.street_address}
            isRequired={true}
            isDisabled={isSameAddress}
            inputChange={changePresentAddress}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
