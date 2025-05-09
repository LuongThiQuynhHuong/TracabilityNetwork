import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { RequestModel, updateFarmProductStatusController } from '@services/APIController';
import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { FarmProductStatus, ToastStatus } from '@utils/AppConstant';
import CustomToast from '@components/CustomToast/CustomToast';
import { OnCloseCustomToast, UpdateToastStatus } from '@utils/UtilFunctions';

const UpdateFarmProductStatusBody: React.FC<AppBodyProps> = ({ organization }) => {
  const [farmProductId, setFarmProductId] = useState('');
  const [status, setStatus] = useState<FarmProductStatus>(FarmProductStatus.Growing);
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
      newStatus: status,
    };

    try {
      const response = await updateFarmProductStatusController(request);

      if (!response.success) {
        throw new Error(response.message);
      }

      console.log('API response:', response.data);
      setToastStatus(ToastStatus.Success);
      UpdateToastStatus(ToastStatus.Success, setToastBodyText, setToastStatus);
    } catch (err) {
      console.error(err);
      UpdateToastStatus(ToastStatus.Error, setToastBodyText, setToastStatus, "Cannot update farm product status");
    }
  };

  return (
    <Container className="mt-5">
      <FormHeader organization={organization} bodyTitle="Update Farm Product Status" />

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

        <Form.Group className="mb-3" controlId="status">
          <Form.Label>New Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value as FarmProductStatus)}
            disabled={toastStatus === ToastStatus.Loading}
          >
            <option value={FarmProductStatus.Growing}>Growing</option>
            <option value={FarmProductStatus.Mature}>Mature</option>
            <option value={FarmProductStatus.Processed}>Processed</option>
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

export default UpdateFarmProductStatusBody;
