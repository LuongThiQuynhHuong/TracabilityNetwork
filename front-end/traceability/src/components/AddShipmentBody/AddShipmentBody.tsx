import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { addShipmentController, RequestModel } from '@services/APIController';
import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { ToastStatus } from '@utils/AppConstant';
import CustomToast from '@components/CustomToast/CustomToast';
import { GenerateUniqueString, GetServerValidDateTimeFormat, OnCloseCustomToast, UpdateToastStatus } from '@utils/UtilFunctions';

const AddShipmentBody: React.FC<AppBodyProps> = ({ organization }) => {
  const [shipmentKey, setShipmentKey] = useState('');
  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [processorOrgId, setProcessorOrgId] = useState('');
  const [retailerOrgId, setRetailerOrgId] = useState('');
  const [shipmentDateTime, setShipmentDateTime] = useState('');
  const [toastBodyText, setToastBodyText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastStatus, setToastStatus] = useState<ToastStatus>(ToastStatus.None);
  
  useEffect(() => {
      setShipmentKey(GenerateUniqueString());
      }, [organization]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    UpdateToastStatus(ToastStatus.Loading, setToastBodyText, setToastStatus);
    setShowToast(true);

    const request : RequestModel = {
      organization: organization,
      shipmentKey: shipmentKey,
      fromAddress: fromAddress,
      destinationAddress: toAddress,
      processorOrgKey: processorOrgId,
      retailerOrgKey: retailerOrgId,
      startTime: GetServerValidDateTimeFormat(shipmentDateTime),
    };

    try {
      const response = await addShipmentController(request);

      if (!response.success) {
        throw new Error(response.message);
      }

      console.log('API response:', response.data);
      setToastStatus(ToastStatus.Success);
      UpdateToastStatus(ToastStatus.Success, setToastBodyText, setToastStatus);
    } catch (err) {
      console.error(err);
      UpdateToastStatus(ToastStatus.Error, setToastBodyText, setToastStatus, 'Error: ' + err);
    }
  };

  return (
    <Container className="mt-5">
      <FormHeader organization={organization} bodyTitle="Add Shipment" />

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="shipmentKey">
          <Form.Label>Shipment Key: {shipmentKey}</Form.Label>
        </Form.Group>

        <Form.Group className="mb-3" controlId="fromAddress">
          <Form.Label>From Address</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Enter from address"
            value={fromAddress}
            onChange={(e) => setFromAddress(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="toAddress">
          <Form.Label>To Address</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Enter to address"
            value={toAddress}
            onChange={(e) => setToAddress(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="processorOrgId">
          <Form.Label>Processor Organization Id</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Enter processor organization ID"
            value={processorOrgId}
            onChange={(e) => setProcessorOrgId(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="retailerOrgId">
          <Form.Label>Retailer Organization Id</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Enter retailer organization ID"
            value={retailerOrgId}
            onChange={(e) => setRetailerOrgId(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="shipmentDateTime">
          <Form.Label>Shipment Date and Time</Form.Label>
          <Form.Control
            required={true}
            type="datetime-local"
            value={shipmentDateTime}
            onChange={(e) => setShipmentDateTime(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={toastStatus === ToastStatus.Loading}>
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

export default AddShipmentBody;
