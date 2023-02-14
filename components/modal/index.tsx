
import React from "react";
import { Button, Modal } from "flowbite-react";

interface propsType {
    title        : string,
    children     : React.ReactNode,
    isDismissible: any,
    show         : boolean,
    size         : string,
    handleClose  : any,
}

/**
 * 
 * @param title - String -- Modal Header Title
 * @param children - React.ReactNode -- Rendering content
 * @param isDismissible - Boolean -- nullable
 * @param show - Boolean -- True or False
 * @param  size - String -- Default size is "md".  Ex: "sm", "md", "lg", "xl", "2xl", "3xl"
 * @param handleClose - Function -- close function
 * @returns MyModal
 */
export default function MyModal({ title, children, isDismissible = false, show, size = "md", handleClose }: propsType) {

    return (
        <React.Fragment>
            <Button onClick={handleClose}>
                Toggle modal
            </Button>
            <Modal
                show={show}
                size={size}
                position="center"
                onClose={handleClose}
                dismissible={isDismissible ? isDismissible : false}
            >
                <Modal.Header>
                    {title}
                </Modal.Header>
                <Modal.Body>
                    {children}
                </Modal.Body>
            </Modal>
        </React.Fragment>
    )
}