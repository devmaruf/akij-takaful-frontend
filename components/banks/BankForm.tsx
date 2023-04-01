import { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import Input from "@/components/input";
import { RootState } from "@/redux/store";
import Button from "@/components/button";
import { getDefaultBanksBySearch } from "@/redux/actions/project-action";
import { debounce } from "lodash";

interface IBankForm {
    onChangeText: (name: string, value: any) => void,
    onSubmit: (e: any, pageType: string) => void,
    pageType: 'add' | 'edit'
}

function BankForm({
    onChangeText,
    onSubmit,
    pageType
}: IBankForm) {
    const dispatch = useDispatch();
    const { projectInput, isSubmitting, defaultBanks } = useSelector((state: RootState) => state.Project);
    const bankName = projectInput.name;

    const handleInputChange = (name: string, value: any) => {
        onChangeText(name, value);

        if (name === 'name') {
            onChangeText('default_bank_id', null);
        }
    }

    const debouncedDispatch = useCallback(
        debounce(() => {
            dispatch(getDefaultBanksBySearch(bankName));
        }, 500),
        [bankName]
    );

    useEffect(() => {
        debouncedDispatch();
        return debouncedDispatch.cancel;
    }, [debouncedDispatch]);

    const onSelectDefaultBank = (defaultBank) => {
        onChangeText('name', defaultBank?.name ?? '');
        onChangeText('code', defaultBank?.code ?? '');
        onChangeText('address', defaultBank?.address ?? '');
        onChangeText('default_bank_id', defaultBank.id);
    }

    return (
        <form
            method="post"
            autoComplete="off"
            encType="multipart/form-data"
        >
            <div className="relative">
                <Input
                    label="Bank name"
                    name="name"
                    placeholder='eg: Dutch Bangla Bank Ltd.'
                    value={projectInput.name}
                    isRequired={true}
                    inputChange={handleInputChange}
                />

                {
                    defaultBanks !== undefined && defaultBanks.length > 0 && projectInput?.name?.length > 0
                    && projectInput.default_bank_id === null &&
                    <div className="bg-slate-100 p-3 max-h-[250px] absolute top-20 w-full overflow-y-auto">
                        {
                            defaultBanks.map((defaultBank, index: number) => (
                                <h3
                                    key={index}
                                    role="button"
                                    title="Select this bank"
                                    onClick={() => onSelectDefaultBank(defaultBank)}
                                    className="border-b border-slate-200 text-sm p-2 mb-1 cursor-pointer hover:bg-slate-200"
                                >
                                    {defaultBank.name} ({defaultBank.code}) &nbsp;
                                    <span className="bg-blue-300 p-1 rounded">
                                        ({defaultBank?.branches.length} braches)
                                    </span>

                                </h3>
                            ))
                        }
                    </div>
                }
            </div>
            <Input
                label="Bank short code"
                name="code"
                placeholder='eg: DBBL'
                value={projectInput.code}
                isRequired={true}
                inputChange={handleInputChange}
            />
            <Input
                type="textarea"
                label="Bank address"
                name="address"
                placeholder='eg: Dhaka'
                value={projectInput.address}
                isRequired={false}
                inputChange={handleInputChange}
            />

            <Button
                title="Save"
                onClick={(e: any) => onSubmit(e, pageType)}
                position="text-left"
                loadingTitle="Saving..."
                loading={isSubmitting}
                customClass="mt-4"
            />
        </form>
    )
}

export default memo(BankForm);