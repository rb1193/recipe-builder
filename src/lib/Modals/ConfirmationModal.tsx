import React from 'react'
import { Dialog, Button, Text, Portal } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'

interface ConfirmationModalProps {
    confirmationMessage: string,
    onConfirm: () => void,
    buttonText: string,
    buttonColorScheme: string,
}

export default function ConfirmationModal(props: ConfirmationModalProps): React.ReactElement {
    const { confirmationMessage, onConfirm, buttonText, buttonColorScheme } = props
    const { open, onOpen, onClose } = useDisclosure()

    return (
        <>
            <Button onClick={onOpen} colorPalette={buttonColorScheme}>{buttonText}</Button>
            <Dialog.Root open={open} onOpenChange={(details) => !details.open && onClose()}>
                <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                        <Dialog.Content>
                            <Dialog.CloseTrigger />
                            <Dialog.Body>
                                <Text>{confirmationMessage}</Text>
                            </Dialog.Body>
                            <Dialog.Footer>
                                <Button onClick={onConfirm}>Confirm</Button>
                                <Button variant="ghost" onClick={onClose} ml="2">Cancel</Button>
                            </Dialog.Footer>
                        </Dialog.Content>
                    </Dialog.Positioner>
                </Portal>
            </Dialog.Root>
        </>
    )
}
