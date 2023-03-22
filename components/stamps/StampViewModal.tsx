import Modal from '@/components/modal';
import { IStamp, IStampListItem } from '@/redux/interfaces';
import { formatCurrency } from '@/utils/currency';

export interface IStampViewModal {
    showModal: boolean;
    setShowModal: (isShown: boolean) => void;
    stamp: IStampListItem | undefined
}

export default function StampViewModal({ showModal, setShowModal, stamp }: IStampViewModal) {
    return (
        <>
            {stamp !== undefined &&
                <Modal title={`View stamps of Proposal - ${stamp.proposal_no}`} size="lg" show={showModal} handleClose={() => setShowModal(false)} isDismissible={false}>
                    <div>
                        <table className="w-full">
                            <thead className="bg-gray-100 p-3">
                                <tr>
                                    <td className='p-2'>Name</td>
                                    <td className='p-2'>Value</td>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    stamp.stamps.map((stampItem: IStamp, index: number) => (
                                        <tr key={index} className="border-b border-gray-100 p-2">
                                            <td className='p-2'>{stampItem.name}</td>
                                            <td className='p-2'>{formatCurrency(stampItem.value)}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </Modal>
            }
        </>
    )
}