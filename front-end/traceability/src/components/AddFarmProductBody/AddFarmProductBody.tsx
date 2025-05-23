import React, { useEffect, useState } from 'react';
import { Button, Container, Form } from 'react-bootstrap';
import { addFarmProductController, RequestModel } from '@services/APIController';
import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { ToastStatus } from '@utils/AppConstant';
import CustomToast from '@components/CustomToast/CustomToast';
import { GenerateUniqueString, OnCloseCustomToast, UpdateToastStatus } from '@utils/UtilFunctions';

const AddFarmProductBody: React.FC<AppBodyProps> = ({ organization }) => {
  const [farmProductName, setFarmProductName] = useState('');
  const [farmProductKey, setFarmProductKey] = useState('');
  const [toastBodyText, setToastBodyText] = useState('');
  const [showToast, setShowToast]     = useState(false);
  const [toastStatus, setToastStatus] = useState<ToastStatus>(ToastStatus.None);

  useEffect(() => {
    setFarmProductKey(GenerateUniqueString());
  }, [organization]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    UpdateToastStatus(ToastStatus.Loading, setToastBodyText, setToastStatus);
    setShowToast(true);

    const request : RequestModel = {
      organization : organization,
      farmProductKey : farmProductKey,
      name: farmProductName,
    };

    try {
      const response = await addFarmProductController(request);

      if(!response.success)
        throw new Error(response.message);

      console.log("API response:", response.data);

      setToastStatus(ToastStatus.Success);
      UpdateToastStatus(ToastStatus.Success, setToastBodyText, setToastStatus, "Farm product is added successfully");
    } catch (err) {
      console.error(err);
      UpdateToastStatus(ToastStatus.Error, setToastBodyText, setToastStatus, "Cannot add farm product");
    }
  };

  return (
    <Container className="mt-5">
      <FormHeader organization={organization} bodyTitle="Add Farm Product" />

      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="farmProductKey">
          <Form.Label>Farm Product Key: {farmProductKey}</Form.Label>
        </Form.Group>
        <Form.Group className="mb-3" controlId="farmProductName">
          <Form.Label>Farm Product Name</Form.Label>
          <Form.Control
            required={true} 
            type="text"
            placeholder="Enter farm product name"
            value={farmProductName}
            onChange={e => setFarmProductName(e.target.value)}
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
        <CustomToast showToast={showToast} onCloseToast={() => OnCloseCustomToast(toastStatus, setToastStatus, setShowToast)} toastStatus={toastStatus} bodyText={toastBodyText}/>
      )}
    </Container>
  );
};

export default AddFarmProductBody;
