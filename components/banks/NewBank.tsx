import Modal from '@/components/modal';
import Input from '@/components/input';
import Button from '@/components/button';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

export interface INewBankProps {
    showModal: boolean;
    setShowModal: (isShown: boolean) => void;
    changeTextInput: (name: string, value: any) => void;
    onSubmit: (e: any, name: string) => void;
}

export function NewBank({
    showModal,
    setShowModal,
    changeTextInput,
    onSubmit
}: INewBankProps) {
    const { projectInput, isSubmitting } = useSelector((state: RootState) => state.Project);

    return (
        <Modal title={`Enlist Bank`} size="md" show={showModal} handleClose={() => setShowModal(false)} isDismissible={false}>
            <form
                method="post"
                autoComplete="off"
            >
                <Input
                    label="Bank Name"
                    name="name"
                    placeholder='Bank Name'
                    value={projectInput.name}
                    isRequired={true}
                    inputChange={changeTextInput}
                />
                <Input
                    label="Bank Code"
                    name="code"
                    placeholder='Bank Code'
                    value={projectInput.code}
                    isRequired={true}
                    inputChange={changeTextInput}
                />

                <Button
                    title="Save"
                    onClick={(e) => onSubmit(e, "add")}
                    position="text-left"
                    loadingTitle="Saving..."
                    loading={isSubmitting}
                />
            </form>
        </Modal>
    );
}
