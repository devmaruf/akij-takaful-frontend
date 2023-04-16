import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Input from "@/components/input";
import Select from "@/components/select";
import { RootState } from "@/redux/store";
import { changeNomineeInputValue, isSameAddressCheck } from "@/redux/actions/proposal-action";
import { IProposalFormSection } from "@/redux/interfaces";
import { useDebounced } from "@/hooks/use-debounce";
import { getDivisionsDropdownListAction } from "@/redux/actions/division-action";
import { getCitiesByDivision, getCitiesDropdownListAction, setNomineeDefaultCityListAction } from "@/redux/actions/city-action";
import { getAreasByCity, getAreasDropdownListAction, setNomineeDefaultAreaListAction } from "@/redux/actions/area-action";

export interface IAddressInformation extends IProposalFormSection {
  onChangePermanentAddress: (name: string, value: any) => void;
  onChangePresentAddress: (name: string, value: any) => void;
}

export function AddressInformation({ onChangeText, onChangePresentAddress, onChangePermanentAddress, errors }: IAddressInformation) {
  const dispatch = useDispatch();

  const { divisions } = useSelector((state: RootState) => state.division);
  const { cities } = useSelector((state: RootState) => state.city);
  const { areas } = useSelector((state: RootState) => state.area);

  useDebounced(() => {
    dispatch(getDivisionsDropdownListAction());
    dispatch(getCitiesDropdownListAction());
    dispatch(getAreasDropdownListAction());
  });

  const { proposalInput, isSameAddress } = useSelector((state: RootState) => state.proposal);
  const [cityList, setCityList] = useState({
    presentCities: [],
    permanentCities: []
  });
  const [areaList, setAreaList] = useState({
    presentAreas: [],
    permanentAreas: []
  });

  const { proposer_permanent_address: permanentAddress, proposer_present_address: presentAddress } = proposalInput;

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

      dispatch(setNomineeDefaultCityListAction(permanentCities));
      dispatch(setNomineeDefaultAreaListAction(permanentAreas));
    }
  }

  const handlePermanentAddressChange = (name: string, value: any) => {
    if (name == "division_id") {
      setAreaList({ ...areaList, permanentAreas: [] });
      setCityList({ ...cityList, permanentCities: getCitiesByDivision(value, cities) });
    } else if (name == "district_id") {
      setAreaList({ ...areaList, permanentAreas: getAreasByCity(value, areas) });
    }

    proposalInput.proposer_nominees.forEach((nominee: any, index: number) => {
      dispatch(changeNomineeInputValue(name, value, 'proposer_permanent_address', index, proposalInput));
    });
    onChangePermanentAddress(name, value);
  }

  const handlePresentAddressChange = (name: string, value: any) => {
    if (name == "division_id") {
      setAreaList({ ...areaList, presentAreas: [] });
      setCityList({ ...cityList, presentCities: getCitiesByDivision(value, cities) });
    } else if (name == "district_id") {
      setAreaList({ ...areaList, presentAreas: getAreasByCity(value, areas) });
    }

    proposalInput.proposer_nominees.forEach((nominee: any, index: number) => {
      dispatch(changeNomineeInputValue(name, value, 'proposer_present_address', index, proposalInput));
    });
    onChangePresentAddress(name, value);
  }

  useEffect(() => {
    // Permanent address
    setAreaList({ ...areaList, permanentAreas: [] });
    setCityList({ ...cityList, permanentCities: getCitiesByDivision(permanentAddress.division_id ?? 0, cities) });
    setAreaList({ ...areaList, permanentAreas: getAreasByCity(permanentAddress.district_id ?? 0, areas) });

    // Present address
    setAreaList({ ...areaList, presentAreas: [] });
    setCityList({ ...cityList, presentCities: getCitiesByDivision(presentAddress.division_id ?? 0, cities) });
    setAreaList({ ...areaList, presentAreas: getAreasByCity(presentAddress.district_id ?? 0, areas) });
  }, []);

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-3">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-md">
        Address Information
      </h3>

      <h4 className="my-2 text-black text-xl">Permanent Address</h4>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-4 border-b pb-5">
        <Select
          options={divisions}
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
          handleChangeValue={handlePermanentAddressChange}
          errors={errors}
        />

        <Input
          label="Post Office Name"
          name="post_office_name"
          placeholder="Post Office Name"
          value={permanentAddress.post_office_name}
          isRequired={true}
          inputChange={handlePermanentAddressChange}
          errors={errors}
        />

        <Input
          label="House No / Road no / Street / Village"
          name="street_address"
          placeholder="House No / Road no / Street / Village"
          value={permanentAddress.street_address}
          isRequired={true}
          inputChange={handlePermanentAddressChange}
          errors={errors}
        />

        <div className="flex items-center mb-4 mt-6 col-span-3">
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
            options={divisions}
            isSearchable={true}
            isRequired={true}
            name="division_id"
            label="Division"
            defaultValue={presentAddress.division_id}
            placeholder="Select Division..."
            handleChangeValue={handlePresentAddressChange}
            errors={errors}
            isDisabled={isSameAddress}
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
            isDisabled={isSameAddress}
          />

          <Select
            options={presentAreas}
            isSearchable={true}
            isRequired={true}
            name="area_id"
            label="Police Station"
            defaultValue={presentAddress.area_id}
            placeholder="Select Police station..."
            handleChangeValue={handlePresentAddressChange}
            errors={errors}
            isDisabled={isSameAddress}
          />

          <Input
            label="Post Office Name"
            name="post_office_name"
            placeholder="Post Office Name"
            value={presentAddress.post_office_name}
            isRequired={true}
            isDisabled={isSameAddress}
            inputChange={handlePresentAddressChange}
            errors={errors}
          />

          <Input
            label="House No / Road no / Street / Village"
            name="street_address"
            placeholder="House No / Road no / Street / Village"
            value={presentAddress.street_address}
            isRequired={true}
            isDisabled={isSameAddress}
            inputChange={handlePresentAddressChange}
            errors={errors}
          />
        </div>
      </div>
    </div>
  );
}
