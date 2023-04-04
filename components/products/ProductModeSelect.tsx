
import { memo } from "react";

import Select from '@/components/select';
import { productModesDropdown } from "@/utils/dropdown";

interface IProductModeSelect {
    defaultValue: string | number;
    changeTextInput: (name: string, value: any) => void;
    name?: string;
    label?: string;
    placeholder?: string;
}

function ProductModeSelect({
    defaultValue,
    changeTextInput,
    name = 'modes',
    label = 'Product modes',
    placeholder = 'Select modes...'
}: IProductModeSelect) {

    return (
        <Select
            options={productModesDropdown}
            isSearchable={true}
            isMulti={true}
            name={name}
            label={label}
            defaultValue={defaultValue}
            placeholder={placeholder}
            handleChangeValue={changeTextInput}
        />
    )
}

export default memo(ProductModeSelect);
