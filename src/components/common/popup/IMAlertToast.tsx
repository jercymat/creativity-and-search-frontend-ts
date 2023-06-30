import React from 'react'
import { CloseButton, Toast, ToastContainer } from 'react-bootstrap'
import { Variant } from 'react-bootstrap/esm/types'

type Props = {
  show: boolean,
  bsVariant: Variant,
  timeout: number,
  message: string,
  onClose: () => void,
}

export const IMAlertToast = (props: Props) => {
  const { show, bsVariant, timeout, message, onClose } = props;
  return (
    <ToastContainer className='p-5' position='top-center'>
      <Toast
        bg={bsVariant}
        show={show}
        onClose={onClose}
        delay={timeout}
        autohide>
        <div className="d-flex align-items-center">
          <Toast.Body className={ bsVariant != 'light' ? 'text-white' : undefined }>{message}</Toast.Body>
          <CloseButton className='me-2 m-auto' variant='white' onClick={onClose} />
        </div>
      </Toast>
    </ToastContainer>
  )
}