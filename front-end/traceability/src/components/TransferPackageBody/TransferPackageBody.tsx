import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { RequestModel, transferPackageController } from '@services/APIController';
import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { ToastStatus } from '@utils/AppConstant';
import CustomToast from '@components/CustomToast/CustomToast';
import { OnCloseCustomToast, UpdateToastStatus } from '@utils/UtilFunctions';

const TransferPackageBody: React.FC<AppBodyProps> = ({ organization }) => {
  const [packageId, setPackageId] = useState('');
  const [transferedOrgId, setTransferedOrgId] = useState('');
  const [toastBodyText, setToastBodyText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastStatus, setToastStatus] = useState<ToastStatus>(ToastStatus.None);

  // Form submission handler
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    UpdateToastStatus(ToastStatus.Loading, setToastBodyText, setToastStatus);
    setShowToast(true);

    const request: RequestModel = {
      organization,
      packageKey: packageId,
      newOrgKey: transferedOrgId,
    };

    try {
      const response = await transferPackageController(request);

      if (!response.success) {
        throw new Error(response.message);
      }

      console.log('API response:', response.data);
      setToastStatus(ToastStatus.Success);
      UpdateToastStatus(ToastStatus.Success, setToastBodyText, setToastStatus);
    } catch (err) {
      console.error(err);
      UpdateToastStatus(ToastStatus.Error, setToastBodyText, setToastStatus, "Cannot transfer package");
    }
  };

  return (
    <Container className="mt-5">
      <FormHeader organization={organization} bodyTitle="Transfer Package" />

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

        <Form.Group className="mb-3" controlId="transferedOrgId">
          <Form.Label>Transfer to Organization Id</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Enter organization id"
            value={transferedOrgId}
            onChange={(e) => setTransferedOrgId(e.target.value)}
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

export default TransferPackageBody;
