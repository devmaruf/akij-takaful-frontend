import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "@/components/input";
import Select from "@/components/select";
import { RootState } from "@/redux/store";
import { isNomineeSameAddressCheck } from "@/redux/actions/proposal-action";
import { getAreasByCity } from "@/redux/actions/area-action";
import { getCitiesByDivision } from "@/redux/actions/city-action";

export interface IAddressInformation {
  handleChangeTextInput: (name: string, value: any, key: string, index: number) => void;
  errors?: any;
  ids: any;
  index?: any;
  data: any;
}

export function NomineeAddressInformation({ handleChangeTextInput, errors, index, ids, data }: IAddressInformation) {
  const dispatch = useDispatch();

  const { divisions } = useSelector((state: RootState) => state.division);
  const { cities } = useSelector((state: RootState) => state.city);
  const { areas } = useSelector((state: RootState) => state.area);

  const [cityList, setCityList] = useState({
    presentCities: [],
    permanentCities: []
  });
  const [areaList, setAreaList] = useState({
    presentAreas: [],
    permanentAreas: []
  });

  const { proposalInput, isNomineeSameAddress } = useSelector((state: RootState) => state.proposal);
  const nomineeInfo = proposalInput.proposer_nominees.find((item: any, prevIndex: number) => prevIndex === index);

  const handleCheckedNomineeSameAddress = (event: any) => {
    const isChecked = event.target.checked;
    dispatch(isNomineeSameAddressCheck(isChecked, nomineeInfo?.proposer_permanent_address, index, proposalInput));

    if (isChecked
      && nomineeInfo?.proposer_permanent_address?.division_id
      && nomineeInfo?.proposer_permanent_address?.district_id
      && nomineeInfo?.proposer_permanent_address?.area_id
      && nomineeInfo?.proposer_permanent_address?.post_office_name
      && nomineeInfo?.proposer_permanent_address?.street_address) {
      setCityList({ presentCities: permanentCities, permanentCities });
      setAreaList({ presentAreas: permanentAreas, permanentAreas });
    }
  }

  const changePermanentAddressAction = (name: string, value: any) => {
    handleChangeTextInput(name, value, ids.permanent, index);

    if (name == "division_id") {
      setCityList({ ...cityList, permanentCities: getCitiesByDivision(value, cities) });
      setAreaList({ ...areaList, permanentAreas: [] });
    } else if (name == "district_id") {
      setAreaList({ ...areaList, permanentAreas: getAreasByCity(value, areas) });
    }
  }

  const changePresentAddressAction = (name: string, value: any) => {
    handleChangeTextInput(name, value, ids.present, index)

    if (name == "division_id") {
      setCityList({ ...cityList, presentCities: getCitiesByDivision(value, cities) });
      setAreaList({ ...areaList, presentAreas: [] });
    } else if (name == "district_id") {
      setAreaList({ ...areaList, presentAreas: getAreasByCity(value, areas) });
    }
  }

  const { permanentCities, presentCities } = cityList;
  const { permanentAreas, presentAreas } = areaList;

  useEffect(() => {
    setCityList({ 
      ...cityList,
      permanentCities: getCitiesByDivision(nomineeInfo?.proposer_permanent_address?.division_id ?? 0, cities),
      presentCities: getCitiesByDivision(nomineeInfo?.proposer_present_address?.division_id ?? 0, cities)
    });
    setAreaList({
      ...areaList,
      permanentAreas: getAreasByCity(nomineeInfo?.proposer_permanent_address?.district_id ?? 0, areas),
      presentAreas: getAreasByCity(nomineeInfo?.proposer_present_address?.district_id ?? 0, areas)
    });
  }, [
    nomineeInfo?.proposer_present_address?.division_id,
    nomineeInfo?.proposer_present_address?.district_id,
    nomineeInfo?.proposer_permanent_address?.division_id,
    nomineeInfo?.proposer_permanent_address?.district_id,
    cities,
    areas
  ]);

  return (
    <div className="border border-gray-200 rounded-md shadow-md mt-3">
      <div className="bg-white text-cyan-600 mb-3 text-sm border-b-2 border-gray-200">
        <h3 className="p-2"> Nominee Address Information</h3>
      </div>

      <div className="p-2">
        {
          data.permanent !== undefined && data.permanent !== null &&
          <div className="">
            <h4 className="my-1 text-black text-sm">-- Permanent Address --</h4>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-4 p-2 pb-5">
              <Select
                options={divisions}
                isSearchable={true}
                isRequired={true}
                name="division_id"
                defaultValue={data.permanent.division_id}
                label="Division"
                placeholder="Select Division..."
                handleChangeValue={changePermanentAddressAction}
                errors={errors}
              />

              <Select
                options={permanentCities}
                isSearchable={true}
                isRequired={true}
                name="district_id"
                label="District"
                defaultValue={data.permanent.district_id}
                placeholder="Select District..."
                handleChangeValue={changePermanentAddressAction}
                errors={errors}
              />

              <Select
                options={permanentAreas}
                isSearchable={true}
                isRequired={true}
                name="area_id"
                defaultValue={data.permanent.area_id}
                label="Police Station"
                placeholder="Select Police station..."
                handleChangeValue={changePermanentAddressAction}
                errors={errors}
              />

              <Input
                label="Post Office Name"
                name="post_office_name"
                placeholder="Post Office Name"
                value={data.permanent.post_office_name}
                isRequired={true}
                inputChange={changePermanentAddressAction}
                errors={errors}
              />

              <Input
                label="House No / Road no / Street / Village"
                name="street_address"
                placeholder="House No / Road no / Street / Village"
                value={data.permanent.street_address}
                isRequired={true}
                inputChange={changePermanentAddressAction}
                errors={errors}
              />

              <div className="mt-5">
                <input
                  id={`same_as_nominee_permanent-${index}`}
                  type="checkbox"
                  value=" "
                  checked={isNomineeSameAddress}
                  onChange={(e) => handleCheckedNomineeSameAddress(e)}
                  className="w-4 h-4 text-cyan-600 bg-gray-100 border-gray-300 rounded focus:ring-cyan-500 focus:ring-2"
                />
                <label
                  htmlFor={`same_as_nominee_permanent-${index}`}
                  className="ml-2 text-sm font-medium text-gray-900"
                >
                  Is Same Address
                </label>
              </div>
            </div>
          </div>
        }

        {
          data.present !== undefined && data.present !== null &&
          <div>
            <h4 className="my-2 text-black text-sm"> -- Present Address --</h4>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
              <Select
                options={divisions}
                isSearchable={true}
                isRequired={true}
                name="division_id"
                label="Division"
                defaultValue={data.present.division_id}
                placeholder="Select Division..."
                handleChangeValue={changePresentAddressAction}
                isDisabled={isNomineeSameAddress}
                errors={errors}
              />

              <Select
                options={presentCities}
                isSearchable={true}
                isRequired={true}
                name="district_id"
                label="District"
                defaultValue={data.present.district_id}
                placeholder="Select District..."
                handleChangeValue={changePresentAddressAction}
                isDisabled={isNomineeSameAddress}
                errors={errors}
              />

              <Select
                options={presentAreas}
                isSearchable={true}
                isRequired={true}
                name="area_id"
                label="Police Station"
                defaultValue={data.present.area_id}
                placeholder="Select Police station..."
                handleChangeValue={changePresentAddressAction}
                isDisabled={isNomineeSameAddress}
                errors={errors}
              />

              <Input
                label="Post Office Name"
                name="post_office_name"
                placeholder="Post Office Name"
                value={data.present.post_office_name}
                isRequired={true}
                isDisabled={isNomineeSameAddress}
                inputChange={changePresentAddressAction}
                errors={errors}
              />

              <Input
                label="House No / Road no / Street / Village"
                name="street_address"
                placeholder="House No / Road no / Street / Village"
                value={data.present.street_address}
                isRequired={true}
                isDisabled={isNomineeSameAddress}
                inputChange={changePresentAddressAction}
                errors={errors}
              />
            </div>
          </div>
        }
      </div>
    </div>
  );
}
