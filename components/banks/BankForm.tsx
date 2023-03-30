import { memo } from "react";
import { useSelector } from "react-redux";

import Input from "@/components/input";
import { RootState } from "@/redux/store";
import Button from "@/components/button";

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
    const { projectInput, isSubmitting } = useSelector((state: RootState) => state.Project);

    return (
        <form
            method="post"
            autoComplete="off"
            encType="multipart/form-data"
        >
            <Input
                label="Bank name"
                name="name"
                placeholder='eg: Dutch Bangla Bank Ltd.'
                value={projectInput.name}
                isRequired={true}
                inputChange={onChangeText}
            />
            <Input
                label="Bank short code"
                name="code"
                placeholder='eg: DBBL'
                value={projectInput.code}
                isRequired={true}
                inputChange={onChangeText}
            />
            <Input
                type="textarea"
                label="Bank address"
                name="address"
                placeholder='eg: Dhaka'
                value={projectInput.address}
                isRequired={false}
                inputChange={onChangeText}
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