import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import Input from "@/components/input";
import Select from "@/components/select";
import { RootState } from "@/redux/store";
import { IProposalFormSection } from "@/redux/interfaces";
import { get28thDateOfCurrentMonth, getCommencementDate, getCurrentDate } from "@/utils/date-helper";
import { productModesDropdown, riderClassDropdown } from "@/utils/dropdown";
import { formatCurrency } from "@/utils/currency";
import { getProductDetailsAction } from "@/redux/actions/product-action";
import { changeInputValue } from "@/redux/actions/proposal-action";
import { isHeadOfficeUser } from "@/utils/auth";
import { ChildEducation } from "./ChildEducation";

export default function PremiumInformation({ onChangeText, errors }: IProposalFormSection) {
  const dispatch = useDispatch();
  const { proposalInput } = useSelector((state: RootState) => state.proposal);
  const { productDropdownList, productDetails } = useSelector((state: RootState) => state.product);
  const isDisabledBasicPremium = !productDetails?.is_dps;
  const isDisabledSumAssured = productDetails?.is_dps;

  const debouncedDispatch = useCallback(
    debounce(() => {
      if (proposalInput.product_id > 0) {
        dispatch(getProductDetailsAction(proposalInput.product_id));
      }
    }, 500),
    [proposalInput.product_id]
  );

  useEffect(() => {
    debouncedDispatch();
    return debouncedDispatch.cancel;
  }, [debouncedDispatch]);

  const [termDropdownList, setTermDropdownList] = useState([]);
  useEffect(() => {
    if (productDetails?.rates !== undefined && productDetails?.rates?.length > 0) {
      const rates = [];
      const termSet = new Set();

      productDetails.rates.forEach(rate => {
        if (!termSet.has(rate.term)) {
          termSet.add(rate.term);
          rates.push({
            label: rate.term,
            value: rate.term,
          });
        }
      });
      setTermDropdownList(rates);
    } else {
      setTermDropdownList([]);
    }
  }, [productDetails]);

  const onChangeFormSectionInput = (name: string, value: any, sectionName: string) => {
    dispatch(changeInputValue(name, value, sectionName));
  };

  return (
    <div className="border border-gray-200 p-2.5 rounded-md shadow-md mt-1">
      <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-md">
        Products, Plan & Premium Information
      </h3>
      <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
        <Input
          type="date"
          label="Policy issue date"
          name="policy_issue_date"
          placeholder="Policy issue date"
          value={proposalInput.policy_issue_date ?? getCurrentDate()}
          minValue={getCurrentDate()}
          maxValue={getCurrentDate()}
          isRequired={true}
          isDisabled={true}
          inputChange={onChangeText}
          errors={errors}
        />

        <Input
          type="date"
          label="Commencement date"
          name="commencement_date"
          placeholder="Commencement date"
          value={proposalInput?.commencement_date ?? getCommencementDate()}
          maxValue={get28thDateOfCurrentMonth()}
          isRequired={true}
          isDisabled={!isHeadOfficeUser()}
          inputChange={onChangeText}
          errors={errors}
        />

        <Input
          type="date"
          label="Risk date"
          name="risk_date"
          placeholder="Risk date"
          value={proposalInput.policy_issue_date ?? getCurrentDate()}
          minValue={getCurrentDate()}
          maxValue={getCurrentDate()}
          isRequired={true}
          isDisabled={true}
          inputChange={onChangeText}
          errors={errors}
        />
      </div>

      <div>
        <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-md">
          Product Information
        </h3>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
          <Select
            options={productDropdownList}
            isSearchable={true}
            name="product_id"
            label="Product"
            defaultValue={proposalInput?.product_id}
            placeholder="Select Product..."
            isRequired={true}
            errors={errors}
            handleChangeValue={onChangeText}
          />

          <Select
            options={termDropdownList}
            isSearchable={true}
            name="term"
            label="Term"
            defaultValue={proposalInput?.term}
            placeholder="Select term..."
            isRequired={true}
            errors={errors}
            handleChangeValue={onChangeText}
          />

          <Select
            options={
              (productDetails?.modes !== undefined && productDetails?.modes?.length > 0) ?
                productDetails?.modes : productModesDropdown
            }
            isSearchable={false}
            name="mode"
            label="Mode"
            defaultValue={proposalInput?.mode}
            placeholder="Select Mode..."
            isRequired={true}
            isDisabled={isDisabledSumAssured}
            errors={errors}
            handleChangeValue={onChangeText}
          />
        </div>
      </div>

      {
        (parseInt(productDetails?.is_child_health) === 1 &&
          proposalInput.proposer_guardian !== undefined &&
          proposalInput.proposer_guardian !== null) ?
          <ChildEducation
            onChangeText={(name: string, value: any) => {
              onChangeFormSectionInput(name, value, 'proposer_guardian')
            }}
            errors={errors}
          />
          :
          <></>
      }

      <div>
        <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-md">
          Premium Information
        </h3>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
          <Input
            type="number"
            label="Sum Assured"
            name="sum_assured"
            placeholder="Sum Assured"
            value={proposalInput?.sum_assured}
            isRequired={true}
            isDisabled={isDisabledSumAssured}
            inputChange={onChangeText}
            errors={errors}
            minValue={0}
          />

          <Input
            type="number"
            label="Basic Premium"
            name="basic_premium"
            placeholder="Basic Premium"
            value={proposalInput.basic_premium}
            isRequired={true}
            isDisabled={isDisabledBasicPremium}
            inputChange={onChangeText}
            errors={errors}
            minValue={0}
          />

          <div className="flex">
            <Input
              type="number"
              label="Occupation extra (%)"
              name="occupation_extra_percentage"
              placeholder="Occupation extra (%)"
              value={proposalInput.occupation_extra_percentage ?? 0}
              isRequired={false}
              inputChange={onChangeText}
              errors={errors}
              minValue={0}
              areaClassNames="flex-1 mr-2"
            />
            <Input
              type="number"
              label="&nbsp;"
              name="occupation_extra"
              placeholder=""
              value={proposalInput.occupation_extra ?? 0}
              isRequired={false}
              isDisabled={true}
              inputChange={onChangeText}
              errors={errors}
              minValue={0}
              areaClassNames="w-24 mt-0"
            />
          </div>

          <Input
            type="number"
            label="Extra mortality"
            name="extra_mortality"
            placeholder="Extra mortality"
            value={proposalInput.extra_mortality ?? 0}
            isRequired={false}
            inputChange={onChangeText}
            errors={errors}
            isDisabled={true}
            minValue={0}
          />

          <Input
            type="number"
            label="Sum at risk"
            name="sum_at_risk"
            placeholder="Sum at risk"
            value={proposalInput.sum_at_risk ?? proposalInput.sum_assured}
            isRequired={true}
            inputChange={onChangeText}
            errors={errors}
            minValue={0}
          />

          <Input
            type="number"
            label="Total Sum at risk"
            name="total_sum_at_risk"
            placeholder="Total Sum at risk"
            value={proposalInput.total_sum_at_risk}
            isRequired={true}
            inputChange={onChangeText}
            isDisabled={true}
            errors={errors}
            minValue={0}
          />
        </div>
      </div>

      <div>
        <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-md">
          Rider Information
        </h3>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
          {
            parseInt(productDetails?.is_adb_enabled) == 1 ?
              <div>
                <label htmlFor="rider_selection_hi" className="text-sm font-medium text-gray-900 block mb-1">
                  Rider Selection
                  <span className="text-red-600">*</span>
                </label>
                <div className="flex">
                  <Input
                    type="checkbox"
                    label="HI"
                    name="rider_selection_hi"
                    placeholder="HI"
                    checked={proposalInput.rider_selection === 'rider_hi'}
                    isRequired={false}
                    inputChange={onChangeText}
                    errors={errors}
                    areaClassNames="flex-1"
                  />

                  <Input
                    type="checkbox"
                    label="CI"
                    name="rider_selection_ci"
                    placeholder="CI"
                    checked={proposalInput.rider_selection === 'rider_ci'}
                    isRequired={false}
                    inputChange={onChangeText}
                    errors={errors}
                    areaClassNames="flex-1"
                  />

                  {/* <Input
                    type="checkbox"
                    label="AD&D"
                    name="rider_selection_adnd"
                    placeholder="AD&D"
                    checked={proposalInput.rider_selection === 'rider_adnd'}
                    isRequired={false}
                    inputChange={onChangeText}
                    errors={errors}
                    areaClassNames="flex-1"
                  /> */}

                  <Input
                    type="checkbox"
                    label="ADB"
                    name="rider_selection_adb"
                    placeholder="ADB"
                    checked={proposalInput.rider_selection === 'rider_adb'}
                    isRequired={false}
                    inputChange={onChangeText}
                    errors={errors}
                    areaClassNames="flex-1"
                  />
                </div>
              </div> :
              <></>
          }

          <Select
            options={riderClassDropdown}
            isSearchable={false}
            name="rider_class"
            label="Rider class"
            defaultValue={proposalInput?.rider_class}
            placeholder="Select Rider class..."
            isRequired={true}
            errors={errors}
            handleChangeValue={onChangeText}
          />

          {
            proposalInput.rider_selection === 'rider_adnd' &&
            <Input
              type="number"
              label="AD&D"
              name="rider_adnd"
              placeholder="AD&D"
              value={proposalInput.rider_adnd}
              isRequired={true}
              isDisabled={true}
              inputChange={onChangeText}
              errors={errors}
            />
          }

          {
            proposalInput.rider_selection === 'rider_adb' &&
            <Input
              type="number"
              label="ADB"
              name="adb"
              placeholder="ADB"
              value={proposalInput.rider_adb}
              isRequired={true}
              isDisabled={true}
              inputChange={onChangeText}
              errors={errors}
            />
          }

          {
            proposalInput.rider_selection === 'rider_hi' &&
            <Input
              type="number"
              label="HI"
              name="hi"
              placeholder="hi"
              value={proposalInput.rider_hi}
              isRequired={true}
              isDisabled={true}
              inputChange={onChangeText}
              errors={errors}
            />
          }

          {
            proposalInput.rider_selection === 'rider_ci' &&
            <Input
              type="number"
              label="CI"
              name="ci"
              placeholder="ci"
              value={proposalInput.rider_ci}
              isRequired={true}
              isDisabled={true}
              inputChange={onChangeText}
              errors={errors}
            />
          }

          <Input
            type="number"
            label="Rider Sum Assured"
            name="rider_sum_assured"
            placeholder="Rider Sum Assured"
            value={proposalInput?.rider_sum_assured ?? proposalInput.sum_assured}
            isRequired={true}
            inputChange={onChangeText}
            errors={errors}
            minValue={0}
          />
          <Input
            type="number"
            label="Rider Premium"
            name="rider_premium"
            placeholder="Rider Premium"
            value={proposalInput?.rider_premium}
            isRequired={true}
            isDisabled={true}
            inputChange={onChangeText}
            errors={errors}
            minValue={0}
          />
        </div>
      </div>

      <div>
        <h3 className="mt-3 bg-slate-100 p-2 text-green-500 mb-3 text-md text-center">
          Total Premium &nbsp;
          {formatCurrency((isNaN(proposalInput?.total_premium) ? 0 : proposalInput?.total_premium) ?? 0)}
        </h3>
      </div>
    </div>
  );
}
