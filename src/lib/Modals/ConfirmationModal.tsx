import React from 'react'
import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay } from '@chakra-ui/modal'
import { Button } from '@chakra-ui/button'
import { Text } from '@chakra-ui/layout'
import { useDisclosure } from '@chakra-ui/hooks'

interface ConfirmationModalProps {
    confirmationMessage: string,
    onConfirm: () => void,
    buttonText: string,
    buttonColorScheme: string,
}

export default function ConfirmationModal(props: ConfirmationModalProps): React.ReactElement {
    const { confirmationMessage, onConfirm, buttonText, buttonColorScheme } = props
    const { isOpen, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen} colorScheme={buttonColorScheme}>{buttonText}</Button>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalBody>
                        <Text>{confirmationMessage}</Text>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onConfirm}>Confirm</Button>
                        <Button variant="ghost" onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}