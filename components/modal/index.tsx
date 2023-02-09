
import React from "react";
import { Button, Modal } from "flowbite-react";

interface propsType {
    title: string,
    children: React.ReactNode,
    isDismissible: any,
    show: boolean,
    size: string,
    handleClose: any,
}

/**
 * 
 * @param string title - Modal Header Title
 * @param React.ReactNode children - Rendering content
 * @param boolean isDismissible - nullable
 * @param boolean show - True or False
 * @param string  size - Default size is "md".  Ex: "sm", "md", "lg", "xl", "2xl", "3xl"
 * @param function handleClose - close function
 * @returns 
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