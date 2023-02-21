import ReactSelect from 'react-select'
import styled from "styled-components";
interface ISelect {
    name?             : string;
    value?            : any;
    placeholder?      : string;
    label?            : string;
    showValidation?   : boolean;
    isRequired?       : boolean;
    isClearable?      : boolean;
    isSearchable?     : boolean;
    isDisabled?       : boolean;
    isLoading?        : boolean;
    isMulti?          : boolean;
    options           : any[];
    defaultValue?     : any;
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

export default function Select({ isClearable, isSearchable, isDisabled = false, isLoading = false, name, label = "Label", value = "",  options = [], defaultValue, isMulti= false, handleChangeValue, placeholder = "Select..." }: ISelect) {
  
    return (
        <div className="my-1.5">
            <label htmlFor={name} className="text-sm font-medium text-gray-900 block mb-2">{label}</label>
            <ReactSelect
                classNamePrefix="select"
                isDisabled={isDisabled}
                isLoading={isLoading}
                isClearable={isClearable}
                isSearchable={isSearchable}
                name={name}
                isMulti={isMulti}
                //value={value}
                onChange={handleChangeValue && ((option) => (isMulti === true ? handleChangeValue(name, option) : handleChangeValue(name, option.value)))}
                // onChange={handleChangeValue && ((option) => handleChangeValue(name, option))}
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