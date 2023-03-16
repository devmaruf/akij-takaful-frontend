import ReactSelect from "react-select";
import styled from "styled-components";
import ValidationMessage from "../validationMessage";
interface ISelect {
  name?: string;
  value?: any;
  placeholder?: string;
  label?: string;
  showValidation?: boolean;
  isRequired?: boolean;
  isClearable?: boolean;
  isSearchable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  isMulti?: boolean;
  options: any[];
  defaultValue?: any;
  errors?: any;
  handleChangeValue?: void | any;
}

const Option = styled.div`
  color: #000;
  font-family: "Open Sans", "Arial", Sans-Serif !important;
  padding: 5px 10px;

  &:hover {
    background: #0891b27a;
  }

  background: ${(props) => (props.isSelected ? "#0891b2" : "#eee")};
  color: ${(props) => (props.isSelected ? "#fff" : "#000")};
`;

export default function Select({
  isClearable,
  isSearchable,
  isDisabled = false,
  isLoading = false,
  name,
  label = "Label",
  value = "",
  options = [],
  defaultValue,
  isMulti = false,
  handleChangeValue,
  errors,
  placeholder = "Select...",
  isRequired = false,
}: ISelect) {
  const getDefaultValue = () => {
    if (defaultValue === undefined || defaultValue === null) {
      return "";
    }

    const defaultValueString = defaultValue.toString();

    if (defaultValue && !isNaN(defaultValue)) {
      const foundValue = options.find(option => option.value.toString() == defaultValueString);

      if (foundValue) {
        return foundValue;
      }
    }

    return defaultValue;
  }

  return (
    <div className="">
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-900 block mb-2"
      >
        {label}
        {isRequired && <span className="text-red-600 text-base"> * </span>}
      </label>
      <ReactSelect
        classNamePrefix="select"
        isDisabled={isDisabled}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        name={name}
        isMulti={isMulti}
        defaultValue={getDefaultValue()}
        required={isRequired}
        value={getDefaultValue()}
        onChange={
          handleChangeValue &&
          ((option) =>
            isMulti === true
              ? handleChangeValue(name, option)
              : handleChangeValue(name, option.value))
        }
        options={options}
        placeholder={placeholder}
        components={{
          Option: ({ children, innerProps, innerRef, ...rest }) => (
            <Option ref={innerRef} {...innerProps} {...rest}>
              {children}
            </Option>
          ),
        }}
      />

      {
        typeof errors !== "undefined" && errors !== null && errors[name] && (
          <ValidationMessage message={errors[name]} />
        )
      }
    </div>
  );
}
