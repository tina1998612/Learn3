import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, useDisclosure, ModalFooter } from "@chakra-ui/react";

export const Popup = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={ onOpen }>Open Modal</Button>
            <Modal isOpen={ isOpen } onClose={ onClose }>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Purchase Course</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        Do you want to purchase the course?
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={ 3 } onClick={ onClose }>
                            Close
                        </Button>
                        {/* <Button variant='ghost'>Secondary Action</Button> */ }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}