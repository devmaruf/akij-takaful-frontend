import { debounce } from "lodash";
import { useCallback, useEffect, useState } from "react";

import Input from "@/components/input";
import { getOccupationsBySearch } from "@/redux/actions/occupation-action";
import { IOccupation } from "@/redux/interfaces";

interface IOccupationDropdown {
    name?: string;
    occupation?: string;
    onChange: (name: string, value: any) => void;
    onChangeOccupationId?: (value: any) => void;
    errors?: any
}

export default function OccupationDropdown({
    name = 'occupation',
    occupation = '',
    onChange,
    onChangeOccupationId,
    errors
}: IOccupationDropdown) {
    const [occupations, setOccupations] = useState<Array<IOccupation>>([]);
    const [visibleOccupationDropdown, setVisibleOccupationDropdown] = useState(false);

    const onChangeOccupation = (name: string, value: string) => {
        onChange(name, value);
        setVisibleOccupationDropdown(true);
    }

    const onSelectOccupation = (occupation: IOccupation) => {
        setVisibleOccupationDropdown(false);
        onChange(name,
            occupation.group?.length > 0 ?
                occupation.group + ' - ' + occupation.name :
                occupation.name
        );

        if(typeof onChangeOccupationId === 'function') {
            onChangeOccupationId(occupation.id);
        }
    }

    const debouncedDispatch = useCallback(
        debounce(() => {
            if (occupation.length > 0) {
                setOccupations(
                    getOccupationsBySearch(occupation)
                        .then(res => setOccupations(res))
                );
            }
        }, 500),
        [occupation]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    return (
        <>
            <div className="relative">
                <Input
                    label="Occupation"
                    name={name}
                    placeholder="Occupation"
                    value={occupation ?? ''}
                    isRequired={true}
                    inputChange={onChangeOccupation}
                    errors={errors}
                />
                {
                    occupations !== undefined && occupations.length > 0
                    && occupation?.length > 0
                    && visibleOccupationDropdown === true
                    &&
                    <div className="bg-slate-100 p-3 max-h-[250px] absolute top-[70px] w-full overflow-y-auto">
                        {
                            occupations.map((occupation, index: number) => (
                                <h3
                                    key={index}
                                    role="button"
                                    title="Select this occupation"
                                    onClick={() => onSelectOccupation(occupation)}
                                    className="border-b border-slate-200 text-sm p-2 mb-1 cursor-pointer hover:bg-slate-200"
                                >
                                    {occupation.group?.length > 0 && occupation.group + ' - '}
                                    {occupation.name}
                                </h3>
                            ))
                        }
                    </div>
                }
            </div>
        </>
    )
}
