import { Modal } from "flowbite-react";
interface propsType {
    title        : string,
    children     : React.ReactNode,
    isDismissible: any,
    show         : boolean,
    size         : string,
    handleClose  : any,
    isShowHeader?:  boolean,
}

export default function IModal({ title, children, isDismissible = false, show, size = "md", handleClose, isShowHeader = true }: propsType) {

    return (
        <Modal
            show={show}
            size={size}
            position="center"
            onClose={handleClose}
            dismissible={isDismissible ? isDismissible : false}
        >
            {isShowHeader &&
                <Modal.Header>
                    {title}
                </Modal.Header>
            }
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>
    )
}