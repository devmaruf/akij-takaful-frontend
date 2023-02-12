
import React from "react";

interface propsType {
    name?          : string;
    value?         : any;
    inputChange?   : void | any;
    placeholder?   : string;
    label?         : string;
    showValidation?: boolean;
    type?          : string;
    isRequired?    : boolean;
}

/**
 * @param string  label - Input Label
 * @param string name - Input Name
 * @param any value - Input Value
 * @param string placeholder - Input Placeholder
 * @param string type - Input Type
 * @param boolean isRequired - Is Required will be true or false
 * @param function inputChange - Input Change Function
 * @returns Input Component
 */
export default function Input({ name, value = "", inputChange, placeholder = "Type Here", label = "Label", showValidation, type = "text", isRequired, }: propsType) {
    const showValidationUi = value === "" && showValidation;

    return (
        <React.Fragment>
            <div className="">
                <label htmlFor={name} className="text-sm font-medium text-gray-900 block mb-2">{label}</label>
                <input
                    type={type}
                    name={name}
                    onChange={inputChange && ((e) => inputChange(name, e.target.value))}
                    value={value}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-md focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 my-2"
                    placeholder={placeholder}
                />
                {showValidationUi ? (
                    isRequired ? (
                        <span className="is-size-7 has-text-centered has-text-danger">
                            {label} is required.
                        </span>
                    ) : null
                ) : null}
            </div>
        </React.Fragment>
    )
}