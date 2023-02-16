import Select from 'react-select'
import styled from "styled-components";
interface propsType {
    name?          : string;
    value?         : any;
    placeholder?   : string;
    label?         : string;
    showValidation?: boolean;
    isRequired?    : boolean;
    isClearable?   : boolean;
    isSearchable?  : boolean;
    isDisabled?    : boolean;
    isLoading?     : boolean;
    options        : any[];
    defaultValue?  : any;
    handleChangeValue?: void | any;
}

const Option = styled.div`
  color: #000;
  font-family: "Open Sans", "Arial", Sans-Serif !important;
  padding: 5px 10px;

  &:hover {
    background: #0891b27a;
  }

  background: ${props =>
        props.isSelected ? "#0891b2" : "#eee"};
  color: ${props =>
        props.isSelected ? "#fff" : "#000"};
`;

export default function ISelect({ isClearable, isSearchable, isDisabled = false, isLoading = false, name, label = "Label", value = "", options = [], defaultValue, handleChangeValue, placeholder = "Select..." }: propsType) {
    return (
        <div className="">
            <label htmlFor={name} className="text-sm font-medium text-gray-900 block mb-2">{label}</label>
            <Select
                classNamePrefix="select"
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isSearchable={isSearchable}
                name={name}
                //value={value}
                onChange={handleChangeValue && ((option) => handleChangeValue(name, option.value))}
                options={options}
                placeholder={placeholder}
                components={{
                    Option: ({ children, innerProps, innerRef, ...rest }) => (
                        <Option ref={innerRef} {...innerProps} {...rest}>
                            {children}
                        </Option>
                    )
                }}
            />
        </div>
    )
}