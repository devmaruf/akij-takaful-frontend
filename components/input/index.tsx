import ValidationMessage from "../validationMessage";

interface IInput {
  name?: string;
  value?: any;
  inputChange?: void | any;
  handleBlur?: void | any;
  placeholder?: string;
  label?: string;
  type?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  errors?: any;
  minValue?: any;
  maxValue?: any;
  areaClassNames?: string;
  hintText?: string;
}

export default function Input({
  name = "text",
  value,
  inputChange,
  placeholder = "Type Here",
  label = "Label",
  type = "text",
  isRequired = false,
  isDisabled = false,
  errors,
  minValue,
  maxValue,
  areaClassNames = '',
  hintText = ''
}: IInput) {

  return (
    <div className={areaClassNames}>
      <label
        htmlFor={name}
        className="text-sm font-medium text-gray-900 block mb-2"
      >
        {label}{" "}
        {isRequired && <span className="text-red-600 text-base"> * </span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        disabled={isDisabled}
        required={isRequired}
        min={minValue && minValue}
        max={maxValue && maxValue}
        className={`shadow-sm border border-gray-300 text-gray-900 sm: text-sm rounded-md focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2 my-2 ${isDisabled ? 'bg-gray-100' : 'bg-gray-50'}`}
        placeholder={placeholder}
        onChange={inputChange && ((e) => inputChange(name, e.target.value))}
      />
      {
        typeof errors !== "undefined" && errors !== null && errors[name] && (
          <ValidationMessage message={errors[name]} />
        )
      }
      {
        hintText !== '' &&
        <p className="text-gray-500 mt-1 text-sm">{hintText}</p>
      }
    </div>
  );
}
