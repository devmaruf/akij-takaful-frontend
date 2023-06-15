import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Button from '@/components/button';
import Input from '@/components/input';
import { changeInputValue } from '@/redux/actions/occupation-action';
import Select from '../select';

interface IOccupationForm {
    onSubmit: (e: any, pageType: string) => void;
    pageType: 'add' | 'edit';
}

export default function OccupationForm({ pageType, onSubmit }: IOccupationForm) {
    const dispatch = useDispatch();
    const { occupationInput, isSubmitting } = useSelector((state: RootState) => state.occupation);

    const changeTextInput = (name: string, value: any) => {
        dispatch(changeInputValue(name, value));
    };

    return (
        <form
            method="post"
            autoComplete="off"
        >
            <Input
                label="Name"
                name="name"
                placeholder='Name'
                value={occupationInput.name}
                isRequired={true}
                inputChange={changeTextInput}
            />
            <Input
                type='text'
                label="Group"
                name="group"
                placeholder='Group'
                value={occupationInput.group}
                isRequired={false}
                inputChange={changeTextInput}
            />
            <Select
                options={[
                    { label: "Class - 1", value: 1 },
                    { label: "Class - 2", value: 2 },
                    { label: "Class - 3", value: 3 },
                    { label: "Class - 4", value: 4 },
                    { label: "Class - 5", value: 5 },
                ]}
                isSearchable={true}
                isRequired={false}
                isClearable={false}
                name="class"
                label="Class"
                defaultValue={occupationInput.class}
                placeholder="Class"
                handleChangeValue={changeTextInput}
                errors={``}
            />

            <div className="mt-4">
                <Button
                    title="Save"
                    onClick={(e: any) => onSubmit(e, pageType)}
                    position="text-left"
                    loadingTitle="Saving..."
                    loading={isSubmitting}
                />
            </div>
        </form>
    )
}