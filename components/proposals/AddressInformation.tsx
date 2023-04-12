import { useDispatch, useSelector } from "react-redux";

import Input from "@/components/input";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import { isSameAddressCheck } from "@/redux/actions/proposal-action";
import { IProposalFormSection } from "@/redux/interfaces";
import { useEffect, useState } from "react";
import { getAreasDropdownList, getCitiesDropdownList, getDivisionDropdownList } from "@/utils/address-dropdown";

export interface IAddressInformation extends IProposalFormSection {
  onChangePermanentAddress: (name: string, value: any) => void;
  onChangePresentAddress: (name: string, value: any) => void;
}

export function AddressInformation({ onChangeText, onChangePresentAddress, onChangePermanentAddress, errors }: IAddressInformation) {
  const dispatch = useDispatch();
  const { proposalInput, isSameAddress } = useSelector((state: RootState) => state.proposal);
  const [divisionList, setDivisionList] = useState({
    presentDivisions: [],
    permanentDivisions: []
  });
  const [cityList, setCityList] = useState({
    presentCities: [],
    permanentCities: []
  });
  const [areaList, setAreaList] = useState({
    presentAreas: [],
    permanentAreas: []
  });

  const { proposer_permanent_address: permanentAddress, proposer_present_address: presentAddress } = proposalInput;

  const { permanentDivisions, presentDivisions } = divisionList;
  const { permanentCities, presentCities } = cityList;
  const { permanentAreas, presentAreas } = areaList;

  const handleCheckedSameAddress = (e: any) => {
    const isChecked = e.target.checked;
    dispatch(
      isSameAddressCheck(isChecked, permanentAddress)
    )

    if (isChecked
      && permanentAddress.division_id
      && permanentAddress.district_id
      && permanentAddress.area_id
      && permanentAddress.post_office_name
      && permanentAddress.street_address) {
      setCityList({ presentCities: permanentCities, permanentCities });
      setAreaList({ presentAreas: permanentAreas, permanentAreas });
    }
  }

  const handlePermanentAddressChange = (name: string, value: any) => {
    if (name == "division_id") {
      getCitiesDropdownList(value).then((data) => {
        setAreaList({ ...areaList, permanentAreas: [] })
        setCityList({ ...cityList, permanentCities: data });
      });
    }

    if (name == "district_id") {
      getAreasDropdownList(value).then((data) => {
        setAreaList({ ...areaList, permanentAreas: data });
      });
    }

    onChangePermanentAddress(name, value);
  }

  const handlePresentAddressChange = (name: string, value: any) => {
    if (name == "division_id") {
      getCitiesDropdownList(value).then((data) => {
        setAreaList({ ...areaList, presentAreas: [] })
        setCityList({ ...cityList, presentCities: data });
      });
    }

    if (name == "district_id") {
      getAreasDropdownList(value).then((data) => {
        setAreaList({ ...areaList, presentAreas: data });
      });
    }

    onChangePresentAddress(name, value);
  }

  useEffect(() => {
    getDivisionDropdownList().then((data) => {
      setDivisionList({ permanentDivisions: data, presentDivisions: data });
      setCityList({ presentCities: [], permanentCities: [] });
      setAreaList({ presentAreas: [], permanentAreas: [] });
    });
  }, []);

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-md">
        Address Information
      </h3>

      <h4 className="my-2 text-black text-xl">Permanent Address</h4>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-4 border-b pb-5">
        <Select
          options={permanentDivisions}
          isSearchable={true}
          isRequired={true}
          name="division_id"
          defaultValue={permanentAddress.division_id}
          label="Division"
          placeholder="Select Division..."
          handleChangeValue={handlePermanentAddressChange}
          errors={errors}
        />

        <Select
          options={permanentCities}
          isSearchable={true}
          isRequired={true}
          name="district_id"
          label="District"
          defaultValue={permanentAddress.district_id}
          placeholder="Select District..."
          handleChangeValue={handlePermanentAddressChange}
          errors={errors}
        />

        <Select
          options={permanentAreas}
          isSearchable={true}
          isRequired={true}
          name="area_id"
          defaultValue={permanentAddress.area_id}
          label="Police Station"
          placeholder="Select Police station..."
          handleChangeValue={onChangePermanentAddress}
          errors={errors}
        />

        <Input
          label="Post Office Name"
          name="post_office_name"
          placeholder="Post Office Name"
          value={permanentAddress.post_office_name}
          isRequired={true}
          inputChange={onChangePermanentAddress}
          errors={errors}
        />

        <Input
          label="House No / Road no / Street / Village"
          name="street_address"
          placeholder="House No / Road no / Street / Village"
          value={permanentAddress.street_address}
          isRequired={true}
          inputChange={onChangePermanentAddress}
          errors={errors}
        />

        <div className="flex items-center mb-4 col-span-3">
          <input
            id="same_as_parmanent"
            type="checkbox"
            value=""
            checked={isSameAddress}
            onChange={handleCheckedSameAddress}
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

      <div>
        <h4 className="my-2 text-black mt-5 text-xl">Present Address</h4>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
          <Select
            options={presentDivisions}
            isSearchable={true}
            isRequired={true}
            name="division_id"
            label="Division"
            defaultValue={presentAddress.division_id}
            placeholder="Select Division..."
            handleChangeValue={handlePresentAddressChange}
            errors={errors}
          />

          <Select
            options={presentCities}
            isSearchable={true}
            isRequired={true}
            name="district_id"
            label="District"
            defaultValue={presentAddress.district_id}
            placeholder="Select District..."
            handleChangeValue={handlePresentAddressChange}
            errors={errors}
          />

          <Select
            options={presentAreas}
            isSearchable={true}
            isRequired={true}
            name="area_id"
            label="Police Station"
            defaultValue={presentAddress.area_id}
            placeholder="Select Police station..."
            handleChangeValue={onChangePresentAddress}
            errors={errors}
          />

          <Input
            label="Post Office Name"
            name="post_office_name"
            placeholder="Post Office Name"
            value={presentAddress.post_office_name}
            isRequired={true}
            isDisabled={isSameAddress}
            inputChange={onChangePresentAddress}
            errors={errors}
          />

          <Input
            label="House No / Road no / Street / Village"
            name="street_address"
            placeholder="House No / Road no / Street / Village"
            value={presentAddress.street_address}
            isRequired={true}
            isDisabled={isSameAddress}
            inputChange={onChangePresentAddress}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
