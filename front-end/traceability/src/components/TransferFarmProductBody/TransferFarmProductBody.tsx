import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { RequestModel, transferFarmProductController } from '@services/APIController';
import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { ToastStatus } from '@utils/AppConstant';
import CustomToast from '@components/CustomToast/CustomToast';
import { OnCloseCustomToast, UpdateToastStatus } from '@utils/UtilFunctions';

const TransferFarmProductBody: React.FC<AppBodyProps> = ({ organization }) => {
  const [farmProductId, setFarmProductId] = useState('');
  const [transferToOrgId, setTransferToOrgId] = useState('');
  const [toastBodyText, setToastBodyText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastStatus, setToastStatus] = useState<ToastStatus>(ToastStatus.None);

  // Form submission handler
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    UpdateToastStatus(ToastStatus.Loading, setToastBodyText, setToastStatus);
    setShowToast(true);

    const request: RequestModel = {
      organization: organization,
      farmProductKey: farmProductId,
      newOrgKey: transferToOrgId,
    };

    try {
      const response = await transferFarmProductController(request);

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
      <FormHeader organization={organization} bodyTitle="Transfer Farm Product" />

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="farmProductId">
          <Form.Label>Farm Product Id</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Enter farm product id"
            value={farmProductId}
            onChange={(e) => setFarmProductId(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="transferToOrgId">
          <Form.Label>Transfer To Organization Id</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Enter organization id to transfer"
            value={transferToOrgId}
            onChange={(e) => setTransferToOrgId(e.target.value)}
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

export default TransferFarmProductBody;
