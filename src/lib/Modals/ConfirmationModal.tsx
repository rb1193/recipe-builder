import React, { useState } from 'react'
import classNames from 'classnames'
import './ConfirmationModal.css'

interface ConfirmationModalProps {
    confirmationMessage: string,
    onConfirm: () => void,
    buttonText: string,
    buttonClass: string,
}

export default function ConfirmationModal(props: ConfirmationModalProps): React.ReactElement {
    const { confirmationMessage, onConfirm, buttonText, buttonClass } = props
    const [isOpen, setIsOpen] = useState(false)

    const openModal = () => {
        setIsOpen(true)
    }

    const closeModal = () => {
        setIsOpen(false)
    }

    const modalClass = classNames('ConfirmationModal', {
        'ConfirmationModal--Open': isOpen,
    })

    const overlayClass = classNames('ConfirmationModal__Overlay', {
        'ConfirmationModal__Overlay--Active': isOpen,
    })

    return (
        <>
            <button className={buttonClass} type="button" onClick={openModal}>{buttonText}</button>
            <div className={overlayClass} onClick={closeModal} />
            <div className={modalClass}>
                <p className="ConfirmationModal__Message">{confirmationMessage}</p>
                <button type="button" className="ConfirmationModal__Button ConfirmationModal__Button--Confirm" onClick={onConfirm}>Confirm</button>
                <button type="button" className="ConfirmationModal__Button ConfirmationModal__Button--Cancel" onClick={closeModal}>Cancel</button>
            </div>
        </>
    )
}