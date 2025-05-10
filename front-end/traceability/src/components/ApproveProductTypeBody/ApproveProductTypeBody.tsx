import React, { useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { approveProductTypeController, RequestModel } from '@services/APIController';
import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { ToastStatus } from '@utils/AppConstant';
import CustomToast from '@components/CustomToast/CustomToast';
import { OnCloseCustomToast, UpdateToastStatus } from '@utils/UtilFunctions';

const ApproveProductTypeBody: React.FC<AppBodyProps> = ({ organization }) => {
  const [productTypeId, setProductTypeId] = useState('');
  const [approvalCheck, setApprovalCheck] = useState(false);
  const [toastBodyText, setToastBodyText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastStatus, setToastStatus] = useState<ToastStatus>(ToastStatus.None);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    UpdateToastStatus(ToastStatus.Loading, setToastBodyText, setToastStatus);
    setShowToast(true);

    const request : RequestModel = {
      organization: organization,
      productTypeKey: productTypeId,
      isApproved: approvalCheck,
    };

    try {
      const response = await approveProductTypeController(request);

      if (!response.success) {
        throw new Error(response.message);
      }

      console.log('API response:', response.data);
      setToastStatus(ToastStatus.Success);
      UpdateToastStatus(ToastStatus.Success, setToastBodyText, setToastStatus, 'Product type is approved successfully');
    } catch (err) {
      console.error(err);
      UpdateToastStatus(ToastStatus.Error, setToastBodyText, setToastStatus, "Cannot approve product type");
    }
  };

  return (
    <Container className="mt-5">
      <FormHeader organization={organization} bodyTitle="Approve Product Type" />

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Product Type Id</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Enter product type Id"
            value={productTypeId}
            onChange={(e) => setProductTypeId(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="approvalCheck">
          <Form.Check
            type="checkbox"
            label="Approve this product type"
            checked={approvalCheck}
            onChange={(e) => setApprovalCheck(e.target.checked)}
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

export default ApproveProductTypeBody;
