import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { addNewOrgController, RequestModel } from '@services/APIController';
import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { ToastStatus } from '@utils/AppConstant';
import CustomToast from '@components/CustomToast/CustomToast';
import { OnCloseCustomToast, UpdateToastStatus } from '@utils/UtilFunctions';

const AddNewOrgBody: React.FC<AppBodyProps> = ({ organization }) => {
  const [orgMspId, setOrgMspId] = useState('');
  const [orgName, setOrgName] = useState('');
  const [address, setAddress] = useState('');
  const [toastBodyText, setToastBodyText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastStatus, setToastStatus] = useState<ToastStatus>(ToastStatus.None);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    UpdateToastStatus(ToastStatus.Loading, setToastBodyText, setToastStatus);
    setShowToast(true);

    const payload: RequestModel = {
      organization,
      orgKey: orgMspId,
      name: orgName,
      address: address,
    };

    console.log('Form data:', payload);

    try {
      const response = await addNewOrgController(payload);

      if (!response.success) {
        throw new Error(response.message);
      }

      console.log('API response:', response.data);
      UpdateToastStatus(ToastStatus.Success, setToastBodyText, setToastStatus, "New organization is added successfully");
    } catch (err) {
      console.error(err);
      UpdateToastStatus(
        ToastStatus.Error,
        setToastBodyText,
        setToastStatus,
        'Cannot add new organization'
      );
    }
  };

  return (
    <Container className="mt-5">
      <FormHeader organization={organization} bodyTitle="Add New Organization" />

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="orgMspId">
          <Form.Label>Org MSP Id</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Org MSP Id"
            value={orgMspId}
            onChange={(e) => setOrgMspId(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="orgName">
          <Form.Label>Org Name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Org Name"
            value={orgName}
            onChange={(e) => setOrgName(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
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
          onCloseToast={() =>
            OnCloseCustomToast(toastStatus, setToastStatus, setShowToast)
          }
          toastStatus={toastStatus}
          bodyText={toastBodyText}
        />
      )}
    </Container>
  );
};

export default AddNewOrgBody;
