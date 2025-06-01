import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { linkPackageWithShipmentController, RequestModel } from '@services/APIController';
import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { LINK_PACKAGE_WITH_SHIPMENT_TITLE, ToastStatus } from '@utils/AppConstant';
import CustomToast from '@components/CustomToast/CustomToast';
import { OnCloseCustomToast, UpdateToastStatus } from '@utils/UtilFunctions';

const LinkPackageWithShipmentBody: React.FC<AppBodyProps> = ({ organization }) => {
  const [packageId, setPackageId] = useState('');
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
      packageKey: packageId,
      shipmentKey: shipmentId,
    };

    try {
      const response = await linkPackageWithShipmentController(request);

      if (!response.success) {
        throw new Error(response.message);
      }

      console.log('API response:', response.data);
      setToastStatus(ToastStatus.Success);
      UpdateToastStatus(ToastStatus.Success, setToastBodyText, setToastStatus, "Package is linked successfully");
    } catch (err) {
      console.error(err);
      UpdateToastStatus(ToastStatus.Error, setToastBodyText, setToastStatus, "Cannot link the Package");
    }
  };

  return (
    <Container className="mt-5">
      <FormHeader organization={organization} bodyTitle={LINK_PACKAGE_WITH_SHIPMENT_TITLE} />

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="packageId">
          <Form.Label>Package Id</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Enter package id"
            value={packageId}
            onChange={(e) => setPackageId(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>

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

export default LinkPackageWithShipmentBody;
