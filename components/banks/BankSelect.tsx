
import { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { debounce } from "lodash";

import { useDebounced } from "@/hooks/use-debounce";
import Select from '@/components/select';
import { getProjectListDropdown } from "@/redux/actions/project-action";
import { RootState } from "@/redux/store";

interface IBankSelect {
    defaultValue: string | number;
    changeTextInput: (name: string, value: any) => void;
    name?: string;
    label?: string;
    placeholder?: string;
    isRequired?: boolean;
}

function BankSelect({
    defaultValue,
    changeTextInput,
    name = 'project_id',
    label = 'Bank',
    placeholder = 'Select Bank...',
    isRequired = true
}: IBankSelect) {
    const dispatch = useDispatch();
    const { projectDropdownList } = useSelector((state: RootState) => state.Project);

    useDebounced(() => {
        dispatch(getProjectListDropdown());
    });

    const debouncedDispatch = useCallback(
        debounce(() => {
            if (projectDropdownList.length === 1 && (defaultValue <= 0 || defaultValue === undefined || defaultValue === '')) {
                changeTextInput(name, projectDropdownList[0]?.value);
            }
        }, 500),
        [projectDropdownList, defaultValue]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    return (
        <Select
            options={projectDropdownList}
            isDisabled={projectDropdownList.length === 1}
            isSearchable={true}
            name={name}
            label={label}
            isRequired={isRequired}
            defaultValue={defaultValue}
            placeholder={placeholder}
            handleChangeValue={changeTextInput}
        />
    )
}

export default memo(BankSelect);
