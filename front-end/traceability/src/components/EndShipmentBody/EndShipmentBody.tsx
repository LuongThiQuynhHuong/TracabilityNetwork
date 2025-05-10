import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { endShipmentController, RequestModel } from '@services/APIController';
import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { ToastStatus } from '@utils/AppConstant';
import CustomToast from '@components/CustomToast/CustomToast';
import { OnCloseCustomToast, UpdateToastStatus } from '@utils/UtilFunctions';

const EndShipmentBody: React.FC<AppBodyProps> = ({ organization }) => {
  const [shipmentId, setShipmentId] = useState('');
  const [toastBodyText, setToastBodyText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastStatus, setToastStatus] = useState<ToastStatus>(ToastStatus.None);

  // Form submission handler
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    UpdateToastStatus(ToastStatus.Loading, setToastBodyText, setToastStatus);
    setShowToast(true);

    const request : RequestModel = {
      organization: organization,
      shipmentKey: shipmentId,
    };

    try {
      const response = await endShipmentController(request);

      if (!response.success) {
        throw new Error(response.message);
      }

      console.log('API response:', response.data);
      setToastStatus(ToastStatus.Success);
      UpdateToastStatus(ToastStatus.Success, setToastBodyText, setToastStatus, "Shipment is ended successfully");
    } catch (err) {
      console.error(err);
      UpdateToastStatus(ToastStatus.Error, setToastBodyText, setToastStatus, "Cannot end shipment");
    }
  };

  return (
    <Container className="mt-5">
      <FormHeader organization={organization} bodyTitle="End Shipment" />

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="shipmentId">
          <Form.Label>Shipment Id</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Enter shipment id"
            value={shipmentId}
            onChange={(e) => setShipmentId(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={toastStatus === ToastStatus.Loading}
        >
          Submit
        </Button>
      </Form>

      {showToast && (
        <CustomToast
          showToast={showToast}
          onCloseToast={() => OnCloseCustomToast(toastStatus, setToastStatus, setShowToast)}
          toastStatus={toastStatus}
          bodyText={toastBodyText}
        />
      )}
    </Container>
  );
};

export default EndShipmentBody;
