import Modal from '@/components/modal';
import BankForm from './BankForm';

export interface INewBankProps {
    showModal: boolean;
    setShowModal: (isShown: boolean) => void;
    changeTextInput: (name: string, value: any) => void;
    onSubmit: (e: any, name: string) => void;
}

export default function NewBankModal({
    showModal,
    setShowModal,
    changeTextInput,
    onSubmit
}: INewBankProps) {
    return (
        <Modal title={`Enlist Bank`} size="md" show={showModal} handleClose={() => setShowModal(false)} isDismissible={false}>
            <BankForm
                onChangeText={changeTextInput}
                onSubmit={onSubmit}
                pageType='create'
            />
        </Modal>
    );
}
