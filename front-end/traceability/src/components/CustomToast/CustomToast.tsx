import { ToastStatus } from '@utils/AppConstant';
import React from 'react'
import { Button, Spinner, Toast } from 'react-bootstrap';
import { CheckCircleFill, XCircleFill } from 'react-bootstrap-icons';

interface CustomToastProps{
    showToast: boolean;
    onCloseToast: () => void;
    toastStatus: ToastStatus;
    bodyText?: string;
}

const CustomToast : React.FC<CustomToastProps> = ({ showToast, toastStatus, onCloseToast, bodyText: bodyTest }) =>{
  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0, left: 0,
    width: '100vw',
    height: '100vh',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1040,
  };
  const toastStyle: React.CSSProperties = {
    position: 'fixed',
    top: '50%', left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 1050,
    minWidth: '300px',
  };
  return (
    <>
        {/* full‑screen overlay to block interaction */}
        <div style={overlayStyle} />

        <Toast
        show={showToast}
        onClose={onCloseToast}
        style={toastStyle}
        >
        <Toast.Header>
            {toastStatus === ToastStatus.Loading && <Spinner animation="border" size="sm" className="me-2" />}
            {toastStatus === ToastStatus.Success && <CheckCircleFill className="me-2 text-success" />}
            {toastStatus === ToastStatus.Error   && <XCircleFill     className="me-2 text-danger"  />}
            <strong className="me-auto">
            {toastStatus === ToastStatus.Loading ? 'Submitting…'
                : toastStatus === ToastStatus.Success ? ToastStatus.Success
                : ToastStatus.Error}
            </strong>
        </Toast.Header>
        <Toast.Body>
            {bodyTest}

            <div className="mt-2 pt-2 border-top text-end">
            <Button variant="secondary" size="sm" onClick={onCloseToast} disabled={toastStatus === ToastStatus.Loading}>
                Close
            </Button>
            </div>
        </Toast.Body>
        </Toast>
    </>
  )
}

export default CustomToast