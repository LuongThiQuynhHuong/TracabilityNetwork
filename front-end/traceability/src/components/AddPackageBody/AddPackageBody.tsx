import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { addPackageController, RequestModel } from '@services/APIController';
import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { ToastStatus, UnitsOfMeasure } from '@utils/AppConstant';
import CustomToast from '@components/CustomToast/CustomToast';
import { GenerateUniqueString, GetServerValidDateTimeFormat, OnCloseCustomToast, UpdateToastStatus } from '@utils/UtilFunctions';

const AddPackageBody: React.FC<AppBodyProps> = ({ organization }) => {
  // State hooks for each form field
  const [farmProductId, setFarmProductId] = useState('');
  const [productTypeId, setProductTypeId] = useState('');
  const [packageKey, setPackageKey] = useState('');
  const [packagedTime, setPackagedTime] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [unitOfMeasure, setUnitOfMeasure] = useState<UnitsOfMeasure>(UnitsOfMeasure.Kilogram);
  const [amount, setAmount] = useState('');
  
  const [toastBodyText, setToastBodyText] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastStatus, setToastStatus] = useState<ToastStatus>(ToastStatus.None);

  useEffect(() => {
    setPackageKey(GenerateUniqueString());
    }, [organization]);

  // Form submission handler
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    UpdateToastStatus(ToastStatus.Loading, setToastBodyText, setToastStatus);
    setShowToast(true);

    const request : RequestModel = {
      organization :organization,
      rawProductKey : farmProductId,
      productTypeKey : productTypeId,
      packageKey : packageKey,
      packagedDateTime : GetServerValidDateTimeFormat(packagedTime),
      expiryDate : GetServerValidDateTimeFormat(expiryDate),
      unitOfMeasure : unitOfMeasure,
      amount : parseFloat(amount),
    };

    try {
      const response = await addPackageController(request);

      if (!response.success) {
        throw new Error(response.message);
      }

      console.log('API response:', response.data);

      setToastStatus(ToastStatus.Success);
      UpdateToastStatus(ToastStatus.Success, setToastBodyText, setToastStatus, "Package is added successfully");
    } catch (err) {
      console.error(err);
      UpdateToastStatus(ToastStatus.Error, setToastBodyText, setToastStatus, "Cannot add package");
    }
  };

  return (
    <Container className="mt-5">
      <FormHeader organization={organization} bodyTitle="Add Package" />

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="packageKey">
          <Form.Label>Package Key: {packageKey}</Form.Label>
        </Form.Group>
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

        <Form.Group className="mb-3" controlId="productTypeId">
          <Form.Label>Product Type Id</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Enter product type id"
            value={productTypeId}
            onChange={(e) => setProductTypeId(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="packagedTime">
          <Form.Label>Packaged Time</Form.Label>
          <Form.Control
            required={true}
            type="datetime-local"
            value={packagedTime}
            onChange={(e) => setPackagedTime(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="expiryDate">
          <Form.Label>Expiry Date</Form.Label>
          <Form.Control
            required={true}
            type="date"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
            disabled={toastStatus === ToastStatus.Loading}
          />
        </Form.Group>
        
        <Form.Group className="mb-3" controlId="unitOfMeasure">
          <Form.Label>Unit Of Measure</Form.Label>
          <Form.Select
            value={unitOfMeasure}
            onChange={(e) => setUnitOfMeasure(e.target.value as UnitsOfMeasure)}
            disabled={toastStatus === ToastStatus.Loading}
          >
            <option value={UnitsOfMeasure.Gram}>Gram</option>
            <option value={UnitsOfMeasure.Kilogram}>Kilogram</option>
            <option value={UnitsOfMeasure.Liter}>Liter</option>
            <option value={UnitsOfMeasure.Milliliter}>Milliliter</option>
            <option value={UnitsOfMeasure.Piece}>Piece</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3" controlId="amount">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            required={true}
            type="number"
            placeholder="Enter amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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

export default AddPackageBody;
