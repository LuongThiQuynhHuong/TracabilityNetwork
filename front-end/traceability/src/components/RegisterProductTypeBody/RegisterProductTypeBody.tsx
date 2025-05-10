import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { registerProductTypeController, RequestModel } from '@services/APIController';
import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { ToastStatus } from '@utils/AppConstant';
import CustomToast from '@components/CustomToast/CustomToast';
import { OnCloseCustomToast, UpdateToastStatus } from '@utils/UtilFunctions';

const RegisterProductTypeBody: React.FC<AppBodyProps> = ({ organization }) => {
  const [productTypeName, setProductTypeName] = useState('');
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
      name : productTypeName,
    };

    console.log('Product Type Data:', request);

    try {
      const response = await registerProductTypeController(request);

      if (!response.success) {
        throw new Error(response.message);
      }

      console.log('API response:', response.data);
      setToastStatus(ToastStatus.Success);
      UpdateToastStatus(ToastStatus.Success, setToastBodyText, setToastStatus, "Product type is registered successfully");
    } catch (err) {
      console.error(err);
      UpdateToastStatus(ToastStatus.Error, setToastBodyText, setToastStatus, "Cannot register product type");
    }
  };

  return (
    <Container className="mt-5">
      <FormHeader organization={organization} bodyTitle="Register Product Type" />

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="productTypeName">
          <Form.Label>Product Type Name</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Enter product type name"
            value={productTypeName}
            onChange={(e) => setProductTypeName(e.target.value)}
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

export default RegisterProductTypeBody;
