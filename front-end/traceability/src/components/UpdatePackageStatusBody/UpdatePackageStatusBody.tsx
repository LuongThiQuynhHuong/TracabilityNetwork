import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { RequestModel, updatePackageStatusController } from '@services/APIController';
import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { PackageStatus, ToastStatus } from '@utils/AppConstant';
import CustomToast from '@components/CustomToast/CustomToast';
import { OnCloseCustomToast, UpdateToastStatus } from '@utils/UtilFunctions';

const UpdatePackageStatusBody: React.FC<AppBodyProps> = ({ organization }) => {
  const [packageId, setPackageId] = useState('');
  const [status, setStatus] = useState<PackageStatus>(PackageStatus.Packaged);
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
      packageKey: packageId,
      status: status,
    };

    try {
      const response = await updatePackageStatusController(request);

      if (!response.success) {
        throw new Error(response.message);
      }

      console.log('API response:', response.data);
      setToastStatus(ToastStatus.Success);
      UpdateToastStatus(ToastStatus.Success, setToastBodyText, setToastStatus);
    } catch (err) {
      console.error(err);
      UpdateToastStatus(ToastStatus.Error, setToastBodyText, setToastStatus, "Cannot update package status");
    }
  };

  return (
    <Container className="mt-5">
      <FormHeader organization={organization} bodyTitle="Update Package Status" />

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

        <Form.Group className="mb-3" controlId="status">
          <Form.Label>New Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value as PackageStatus)}
            disabled={toastStatus === ToastStatus.Loading}
          >
            <option value={PackageStatus.Packaged}>Packaged</option>
            <option value={PackageStatus.Shipping}>Shipping</option>
            <option value={PackageStatus.Distributed}>Distributed</option>
          </Form.Select>
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

export default UpdatePackageStatusBody;
