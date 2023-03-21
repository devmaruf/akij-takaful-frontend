import { useSelector } from 'react-redux';
import { useState } from 'react';

import Modal from '@/components/modal';
import Input from '@/components/input';
import Button from '@/components/button';
import { RootState } from '@/redux/store';
import { Label } from 'flowbite-react';
import { Toaster } from '../toaster';

export interface ICustomUnderwritingMessage {
    showModal: boolean;
    setShowModal: (isShown: boolean) => void;
    onSubmit: (e: any, name: string) => void;
}

export function CustomUnderwritingMessage({
    showModal,
    setShowModal,
    onSubmit
}: ICustomUnderwritingMessage) {
    const { isLoading } = useSelector((state: RootState) => state.underwriting);
    const [message, setMessage] = useState('');

    const sendMessageToAgent = (e: any) => {
        e.preventDefault();
        Toaster('success', 'Message, sent to agent.');
        return;
    }

    return (
        <Modal title={`Send message to Agent`} size="md" show={showModal} handleClose={() => setShowModal(false)} isDismissible={false}>
            <form
                method="post"
                autoComplete="off"
            >
                <Label className='block '>
                    Message
                </Label>
                <textarea
                    name="name"
                    className='block w-full border-1 border-slate-200 my-4'
                    placeholder='Write your message'
                    value={message}
                    onChange={(e: any) => setMessage(e.target.value)}
                ></textarea>

                <Button
                    title="Send"
                    onClick={sendMessageToAgent}
                    position="text-left"
                    loadingTitle="Sending..."
                    loading={isLoading}
                />
            </form>
        </Modal>
    );
}
