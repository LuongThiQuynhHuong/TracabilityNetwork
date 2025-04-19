import FormHeader from '@components/FormHeader/FormHeader';
import GenerateQRCode from '@components/GenerateQRCode/GenerateQRCode';
import { GENERATE_TRACING_QR_CODE_TITLE } from '@utils/AppConstant';
import { AppBodyProps } from '@utils/BaseIntefaces';
import React, { useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap';

const TracingCodeGenerationBody : React.FC<AppBodyProps> = ({ organization }) => {
    const [packageKey, setPackageKey] = useState<string>('');
    const [generatedPackageKey, setGeneratedPackageKey] = useState<string>('');
    const [isSubmited, setIsSubmited] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPackageKey(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    setGeneratedPackageKey(packageKey);
    setIsSubmited(true);
  };
  return (
    <Container className="mt-5">
        <FormHeader organization={organization} bodyTitle={GENERATE_TRACING_QR_CODE_TITLE} />
        <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="packageKey">
          <Form.Label>Package Key</Form.Label>
          <Form.Control
            required={true}
            type="text"
            placeholder="Enter Package Key"
            value={packageKey}
            onChange={handleInputChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Generate QR Code
        </Button>
      </Form>

      {isSubmited && (
        <div className="mt-4">
          <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
            Generated QR code for the package with the key: {generatedPackageKey}
          </p>
          <GenerateQRCode packageKey={generatedPackageKey} organization={organization} />
        </div>
      )}
    </Container>
  )
}

export default TracingCodeGenerationBody