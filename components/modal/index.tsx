import React from "react";
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

/**
 * 
 * @param title - String -- Modal Header Title
 * @param children - React.ReactNode -- Rendering content
 * @param isDismissible - Boolean -- nullable
 * @param show - Boolean -- True or False
 * @param  size - String -- Default size is "md".  Ex: "sm", "md", "lg", "xl", "2xl", "3xl"
 * @param  isShowHeader - boolean -- 
 * @param handleClose - Function -- close function
 * @returns MyModal
 */
export default function MyModal({ title, children, isDismissible = false, show, size = "md", handleClose, isShowHeader = true }: propsType) {

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}