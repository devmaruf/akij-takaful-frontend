import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import Input from "@/components/input";
import Select from "@/components/select";
import { RootState } from "@/redux/store";
import { IProposalFormSection } from "@/redux/interfaces";
import { getCommencementDate, getCurrentDate } from "@/utils/date-helper";
import { productModesDropdown, riderClassDropdown } from "@/utils/dropdown";
import { formatCurrency } from "@/utils/currency";
import { getProductDetailsAction } from "@/redux/actions/product-action";
import { Toaster } from "@/components/toaster";
import { isHeadOfficeUser } from "@/utils/auth";

export default function PremiumInformation({ onChangeText, errors }: IProposalFormSection) {
  const dispatch = useDispatch();
  const { proposalInput } = useSelector((state: RootState) => state.proposal);
  const {
    proposal_personal_information,
    mode,
    rider_selection: riderSelection,
    rider_class: riderClass,
    term
  } = proposalInput;
  const { productDropdownList, productDetails, loadingDetails } = useSelector((state: RootState) => state.product);
  const isDisabledBasicPremium = !productDetails?.is_dps;
  const isDisabledSumAssured = productDetails?.is_dps;
  const riderSumAssured = proposalInput?.rider_sum_assured ?? proposalInput.initial_sum_assured;
  const { dob, age } = proposal_personal_information;

  const onChangeRiderClass = (name: string, value: string) => {
    if (value === 'class1') {
      onChangeText('adnd', '3.5');
      onChangeText('adb', '1.5');
      onChangeText('hi', '0');
      onChangeText('ci', '0');
    } else if (value === 'class2') {
      onChangeText('adnd', '4.5');
      onChangeText('adb', '2.5');
      onChangeText('hi', '0');
      onChangeText('ci', '0');
    } else if (value === 'class3') {
      onChangeText('adnd', '5.5');
      onChangeText('adb', '3.5');
      onChangeText('hi', '0');
      onChangeText('ci', '0');
    }

    onChangeText(name, value);
  }

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

  const onChangeRiderSelection = (name: string, value: string) => {
    if (name === 'rider_selection_hi') {
      value = 'hi';
    } else if (name === 'rider_selection_ci') {
      value = 'ci';
    } else if (name === 'rider_selection_adnd') {
      value = 'adnd';
    } else if (name === 'rider_selection_adb') {
      value = 'adb';
    }

    onChangeText('rider_selection', value);
  }

  const getProductRate = () => {
    if (proposalInput?.product_id === 0
      || proposalInput?.product_id === ''
      || proposalInput?.term === ''
      || proposalInput?.term === 0
      || age === 0
      || age === ''
    ) {
      return null;
    }

    if (productDetails?.rates?.length > 0) {
      const rateDetail = productDetails.rates.find(obj =>
        parseInt(obj.age) === parseInt(age)
        && parseInt(obj.term) === parseInt(term)
      );

      if (rateDetail === undefined || rateDetail === null) {
        Toaster('error', 'Product rate not found for this age and term.');
        return 0;
      }

      return parseFloat(rateDetail?.rate ?? 0).toFixed(3);
    }

    Toaster('error', 'Product rate not found for this age and term.');
    return 0;
  }

  /**
   * calculateRiderPremium
   *
   * Yearly & Single>>(sum assured * rider Rate)/1000 [Rate comes based on Rider Class]
   * halfYearly >>(sum assured * rider  Rate)/1000*.525 [Rate comes based on Rider Class]
   * quarterly=(sum assured * rider  rate)/1000*.275 [Rate comes based on Rider Class]
   * monthly=(sum assured * rider  rate)/1000*.0925 [Rate comes based on Rider Class]
   */
  const calculateRiderPremium = () => {
    let riderPremimum = 0;
    const riderRate = proposalInput?.[riderSelection];

    if (riderSumAssured === undefined
      || !(riderSumAssured > 0)
      || riderRate === undefined
      || !(riderRate > 0)
      || mode === undefined
      || mode?.length <= 0
    ) {
      riderPremimum = 0;
    } else {
      if (mode === 'yearly' || mode === 'single') {
        riderPremimum = (riderSumAssured * riderRate) / 1000;
      } else if (mode === 'half_yearly') {
        riderPremimum = (riderSumAssured * riderRate) / 1000 * 0.525;
      } else if (mode === 'quarterly') {
        riderPremimum = (riderSumAssured * riderRate) / 1000 * 0.275;
      } else if (mode === 'monthly') {
        riderPremimum = (riderSumAssured * riderRate) / 1000 * 0.0925;
      }
    }

    onChangeText('rider_premium', riderPremimum.toFixed(3));
  }

  /**
   * Calculate Basic Premium amount.
   *
   * Yearly&Single=(sum assured * rate)/1000 [Rate comes based on Product]
   * halfYearly=(sum assured * rate)/1000*.525 [Rate comes based on Product]
   * Quarterly=(sum assured * rate)/1000*.275 [Rate comes based on Product]
   * monthly=(sum assured * rate)/1000*.0925 [Rate comes based on Product]
   */
  const calculateBasicPremium = () => {
    let basicPremium = 0;
    const productRate = parseFloat(`${getProductRate() ?? 0}`);
    const sumAssured = proposalInput.initial_sum_assured;

    if (productRate === null) {
      basicPremium = 0;
    } else if (mode === 'yearly' || mode === 'single') {
      basicPremium = (sumAssured * productRate) / 1000;
    } else if (mode === 'half_yearly') {
      basicPremium = (riderSumAssured * productRate) / 1000 * 0.525;
    } else if (mode === 'quarterly') {
      basicPremium = (riderSumAssured * productRate) / 1000 * 0.275;
    } else if (mode === 'monthly') {
      basicPremium = (riderSumAssured * productRate) / 1000 * 0.0925;
    }

    onChangeText('initial_premium', basicPremium.toFixed(3));
  }

  const calculateSumAssured = () => {
    let sumAssured = 0;

    const productRate = parseFloat(`${getProductRate() ?? 0}`);
    const basicPremium = proposalInput.initial_premium;

    if (productRate === null) {
      sumAssured = 0;
    } else {
      sumAssured = (productRate * 100 / basicPremium)
    }

    onChangeText('initial_sum_assured', sumAssured.toFixed(3));
  }

  /**
   * Basic Premium + Riders Premium
   * + Occupation Extra + Extra Mortality Premium
   */
  const getTotalPremium = () => {
    onChangeText(
      'total_premium',
      parseFloat(proposalInput?.initial_premium ?? 0)
      + parseFloat(proposalInput?.rider_premium ?? 0)
      + parseFloat(proposalInput?.occupation_extra ?? 0)
      + parseFloat(proposalInput?.extra_mortality ?? 0)
    );
  }

  useEffect(() => {
    calculateRiderPremium();
  }, [riderSelection, mode, riderSumAssured, riderClass]);

  useEffect(() => {
    if (isDisabledBasicPremium) {
      calculateBasicPremium();
    } else {
      calculateSumAssured();
    }
  }, [
    proposalInput.initial_sum_assured,
    proposalInput?.product_id,
    proposalInput?.term,
    age,
    isDisabledBasicPremium
  ]);

  useEffect(() => {
    if (!isDisabledBasicPremium) {
      calculateSumAssured();
    }
  }, [
    proposalInput.initial_premium,
    proposalInput?.product_id,
    proposalInput?.term,
    age,
    isDisabledBasicPremium
  ]);

  useEffect(() => {
    getTotalPremium();
  }, [
    proposalInput.initial_premium,
    proposalInput.rider_premium,
    proposalInput.occupation_extra,
    proposalInput.extra_mortality,
  ]);

  useEffect(() => {
    if (isDisabledSumAssured) {
      onChangeText('mode', 'monthly');
    } else {
      onChangeText('mode', '');
    }
  }, [isDisabledSumAssured]);

  useEffect(() => {
    const occupationExtraAmount = parseFloat(proposalInput.initial_sum_assured) * (parseFloat(proposalInput.occupation_extra_percentage) / 100)
    onChangeText(
      'occupation_extra',
      occupationExtraAmount.toFixed(3)
    );
  }, [
    proposalInput.initial_sum_assured,
    proposalInput.occupation_extra_percentage
  ]);

  const [termDropdownList, setTermDropdownList] = useState([]);
  useEffect(() => {
    if (productDetails?.rates !== undefined && productDetails?.rates?.length > 0) {
      const rates = [];
      productDetails.rates.forEach(rate => {
        rates.push({
          label: rate.term,
          value: rate.term,
        })
      });
      setTermDropdownList(rates);
    } else {
      setTermDropdownList([]);
    }
  }, [productDetails]);


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
          value={getCommencementDate()}
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

      <div>
        <h3 className="bg-slate-100 p-2 text-cyan-600 mb-3 text-md">
          Premium Information
        </h3>
        <div className="grid gap-2 grid-cols-1 md:grid-cols-4">
          <Input
            type="number"
            label="Sum Assured"
            name="initial_sum_assured"
            placeholder="Sum Assured"
            value={proposalInput?.initial_sum_assured}
            isRequired={true}
            isDisabled={isDisabledSumAssured}
            inputChange={onChangeText}
            errors={errors}
            minValue={0}
          />

          <Input
            type="number"
            label="Basic Premium"
            name="initial_premium"
            placeholder="Basic Premium"
            value={proposalInput.initial_premium}
            isRequired={true}
            isDisabled={isDisabledBasicPremium}
            inputChange={onChangeText}
            errors={errors}
            minValue={0}
            maxValue={proposalInput.initial_sum_assured}
          />

          <div className="flex">
            <Input
              type="number"
              label="Occupation extra (%)"
              name="occupation_extra_percentage"
              placeholder="Occupation extra (%)"
              value={proposalInput.occupation_extra_percentage ?? 0}
              isRequired={true}
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
              areaClassNames="w-24 mt-1"
            />
          </div>

          <Input
            type="number"
            label="Extra mortality"
            name="extra_mortality"
            placeholder="Extra mortality"
            value={proposalInput.extra_mortality ?? 0}
            isRequired={true}
            inputChange={onChangeText}
            errors={errors}
            minValue={0}
          />

          <Input
            type="number"
            label="Sum at risk"
            name="sum_at_risk"
            placeholder="Sum at risk"
            value={proposalInput.sum_at_risk ?? proposalInput.initial_sum_assured}
            isRequired={true}
            inputChange={onChangeText}
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
                checked={proposalInput.rider_selection === 'hi'}
                isRequired={false}
                inputChange={onChangeRiderSelection}
                errors={errors}
                areaClassNames="flex-1"
              />
              <Input
                type="checkbox"
                label="CI"
                name="rider_selection_ci"
                placeholder="CI"
                checked={proposalInput.rider_selection === 'ci'}
                isRequired={false}
                inputChange={onChangeRiderSelection}
                errors={errors}
                areaClassNames="flex-1"
              />
              <Input
                type="checkbox"
                label="AD&D"
                name="rider_selection_adnd"
                placeholder="AD&D"
                checked={proposalInput.rider_selection === 'adnd'}
                isRequired={false}
                inputChange={onChangeRiderSelection}
                errors={errors}
                areaClassNames="flex-1"
              />

              <Input
                type="checkbox"
                label="ADB"
                name="rider_selection_adb"
                placeholder="ADB"
                checked={proposalInput.rider_selection === 'adb'}
                isRequired={false}
                inputChange={onChangeRiderSelection}
                errors={errors}
                areaClassNames="flex-1"
              />
            </div>
          </div>

          <Select
            options={riderClassDropdown}
            isSearchable={false}
            name="rider_class"
            label="Rider class"
            defaultValue={proposalInput?.rider_class}
            placeholder="Select Rider class..."
            isRequired={true}
            errors={errors}
            handleChangeValue={onChangeRiderClass}
          />

          {
            proposalInput.rider_selection === 'adnd' &&
            <Input
              type="number"
              label="AD&D"
              name="adnd"
              placeholder="AD&D"
              value={proposalInput.adnd}
              isRequired={true}
              isDisabled={true}
              inputChange={onChangeText}
              errors={errors}
            />
          }

          {
            proposalInput.rider_selection === 'adb' &&
            <Input
              type="number"
              label="ADB"
              name="adb"
              placeholder="ADB"
              value={proposalInput.adb}
              isRequired={true}
              isDisabled={true}
              inputChange={onChangeText}
              errors={errors}
            />
          }

          {
            proposalInput.rider_selection === 'hi' &&
            <Input
              type="number"
              label="HI"
              name="hi"
              placeholder="hi"
              value={proposalInput.hi}
              isRequired={true}
              isDisabled={true}
              inputChange={onChangeText}
              errors={errors}
            />
          }

          {
            proposalInput.rider_selection === 'ci' &&
            <Input
              type="number"
              label="CI"
              name="ci"
              placeholder="ci"
              value={proposalInput.ci}
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
            value={proposalInput?.rider_sum_assured ?? proposalInput.initial_sum_assured}
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
