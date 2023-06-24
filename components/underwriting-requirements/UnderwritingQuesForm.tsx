import { memo } from "react";
import { useSelector } from "react-redux";
import Select from "@/components/select";
import Input from "@/components/input";
import { RootState } from "@/redux/store";
import Button from "@/components/button";
import { GenderList } from "@/utils/proposal-dropdowns";

interface IUnderWritingQuesForm {
    onChangeText: (name: string, value: any) => void,
    onSubmit: (e: any, pageType: string) => void,
    pageType: 'add' | 'edit'
}

function UnderWritingQuesForm({
    onChangeText,
    onSubmit,
    pageType
}: IUnderWritingQuesForm) {

    const { underwritingQuesInput, isSubmitting } = useSelector((state: RootState) => state.underwritingQues);

    const handleInputChange = (name: string, value: any) => {
        onChangeText(name, value);
    }

    const underwritingTypes = [
        {
            label: 'Underwriting Requirements',
            value: 1
        },
        {
            label: 'Upload required documents',
            value: 2
        },
        {
            label: 'Underwriting questionnaires [For Worksheet]',
            value: 3
        },
        {
            label: 'Health questionnaires',
            value: 4
        },
        {
            label: 'Underwriting Decisions',
            value: 5
        },
    ]

    return (
        <form
            method="post"
            autoComplete="off"
            encType="multipart/form-data"
        >

            <Input
                type="textarea"
                label="Requirement Name (en)"
                name="requirement_name_en"
                placeholder="eg: Do you have vision and hearing diseases?"
                value={underwritingQuesInput.requirement_name_en}
                isRequired={false}
                inputChange={handleInputChange}
            />

            <Input
                type="textarea"
                label="Requirement Name (bn)"
                name="requirement_name_bn"
                placeholder="eg: আপনার কি দৃষ্টি এবং শ্রবণশক্তির রোগ আছে?"
                value={underwritingQuesInput.requirement_name_bn}
                isRequired={false}
                inputChange={handleInputChange}
            />

            <Select
                options={underwritingTypes}
                isSearchable={true}
                isRequired={true}
                name="type_id"
                label="Type"
                defaultValue={underwritingQuesInput.type_id}
                placeholder="Type"
                handleChangeValue={handleInputChange}
            />

            <Select
                options={
                    [
                        { label: "Input", value: "input" },
                        { label: "Textarea", value: "textarea" },
                        { label: "Checkbox", value: "checkbox" },
                        { label: "Switch", value: "switch" },
                    ]
                }
                isSearchable={true}
                isRequired={true}
                name="input_type"
                label="Input Type"
                defaultValue={underwritingQuesInput.input_type}
                placeholder="Input Type"
                handleChangeValue={handleInputChange}
            />
            <Select
                options={GenderList}
                isSearchable={false}
                isRequired={true}
                name="gender"
                label="Gender"
                defaultValue={underwritingQuesInput.gender}
                placeholder="Gender"
                handleChangeValue={handleInputChange}
            />

            <Input
                type="input"
                label="Code"
                name="code"
                placeholder="eg: is_eye_or_ear_disease"
                value={underwritingQuesInput.code}
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

export default memo(UnderWritingQuesForm);