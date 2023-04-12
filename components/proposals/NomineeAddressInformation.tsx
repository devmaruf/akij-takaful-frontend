import * as React from "react";
import Input from "@/components/input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Select from "@/components/select";
import { isNomineeSameAddressCheck } from "@/redux/actions/proposal-action";
import { areaList, districtList, divisionList } from "@/utils/proposal-dropdowns";

export interface IAddressInformation {
  handleChangeTextInput: (name: string, value: any, key: string, index: number) => void;
  errors?: any;
  ids: any;
  index?: any;
  data: any;
  divisionList: any;
  cityList: any;
  areaList: any;
}

export function NomineeAddressInformation({ handleChangeTextInput, errors, index, ids, data, divisionList, cityList, areaList }: IAddressInformation) {

  const dispatch = useDispatch();

  const { proposalInput, isNomineeSameAddress } = useSelector((state: RootState) => state.proposal);

  const trackNominee = proposalInput.proposer_nominees.find((item: any, prevIndex: number) => prevIndex === index);

  const handleCheckedNomineeSameAddress = (event: any) => {
    const isChecked = event.target.checked;
    dispatch(isNomineeSameAddressCheck(isChecked, trackNominee?.proposer_permanent_address, index, proposalInput))
  }


  const changePermanentAddressAction = (name: string, value: any) => {
    handleChangeTextInput(name, value, ids.permanent, index);
  }

  const changePresentAddressAction = (name: string, value: any) => {
    handleChangeTextInput(name, value, ids.present, index)
  }

  const {permanentDivisions, presentDivisions} = divisionList;
  const {permanentCities, presentCities} = cityList;
  const {permanentAreas, presentAreas} = areaList;


  return (
    <div className="border border-gray-200 rounded-md shadow-md mt-3">
      <div className="bg-white text-cyan-600 mb-3 text-sm border-b-2 border-gray-200">
        <h3 className="p-2">  Nominee Address Information</h3>
      </div>

      <div className="p-2">
        {
          data.permanent !== undefined && data.permanent !== null &&
          <div className="">
            <h4 className="my-1 text-black text-sm">-- Permanent Address --</h4>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-4 p-2 pb-5">
              <Select
                options={permanentDivisions}
                isSearchable={true}
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

              <div className="flex items-center mb-4 col-span-4">
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
          <div // className={isSameAddress ? 'block' : 'hidden'}
          >
            <h4 className="my-2 text-black text-sm"> -- Present Address --</h4>
            <div className="grid gap-2 grid-cols-1 md:grid-cols-3">
              <Select
                options={presentDivisions}
                isSearchable={true}
                name="division_id"
                label="Division"
                defaultValue={data.present.division_id}
                placeholder="Select Division..."
                handleChangeValue={changePresentAddressAction}
                errors={errors}
              />

              <Select
                options={presentCities}
                isSearchable={true}
                name="district_id"
                label="District"
                defaultValue={data.present.district_id}
                placeholder="Select District..."
                handleChangeValue={changePresentAddressAction}
                errors={errors}
              />

              <Select
                options={presentAreas}
                isSearchable={true}
                name="area_id"
                label="Police Station"
                defaultValue={data.present.area_id}
                placeholder="Select Police station..."
                handleChangeValue={changePresentAddressAction}
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
