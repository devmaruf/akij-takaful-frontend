interface propsType {
    name?       : string;
    value?      : any;
    inputChange?: void | any;
    placeholder?: string;
    label?      : string;
    type?       : string;
    isRequired? : boolean;
}

export default function IInput({ name, value, inputChange, placeholder = "Type Here", label = "Label", type = "text", isRequired = true }: propsType) {

    return (
        <div className="">
            <label htmlFor={name} className="text-sm font-medium text-gray-900 block mb-2">{label}</label>
            <input
                type={type === "password" ? "password" : "text"}
                name={name}
                onChange={inputChange && ((e) => inputChange(name, e.target.value))}
                //value={value}
                required={isRequired}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm: text-sm rounded-md focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2 my-2"
                placeholder={placeholder}
            />
        </div>
    )
}