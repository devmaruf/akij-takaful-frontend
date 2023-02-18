import { Modal as FlowbiteModal } from "flowbite-react";
interface IModal {
    title        : string,
    children     : React.ReactNode,
    isDismissible: any,
    show         : boolean,
    size         : string,
    handleClose  : any,
    isShowHeader?:  boolean,
}

export default function Modal({ title, children, isDismissible = false, show, size = "md", handleClose, isShowHeader = true }: IModal) {

    return (
        <FlowbiteModal
            show={show}
            size={size}
            position="center"
            onClose={handleClose}
            dismissible={isDismissible ? isDismissible : false}
        >
            {isShowHeader &&
                <FlowbiteModal.Header>
                    {title}
                </FlowbiteModal.Header>
            }
            <FlowbiteModal.Body>
                {children}
            </FlowbiteModal.Body>
        </FlowbiteModal>
    )
}