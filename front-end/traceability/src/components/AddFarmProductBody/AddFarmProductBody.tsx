import { Button, Container, Form } from 'react-bootstrap';
import { testApiController } from '@services/APIController';
import React from 'react';
import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';


const AddFarmProductBody: React.FC<AppBodyProps> = ({ organization }) => {

  const onSubmit = (e: React.FormEvent) => {
    // Prevent default form submission to avoid page reload
    e.preventDefault();

    try {
      const trace = {
        organization: organization,
        packageKey: "1234567890",
        checkbool: true,
      };

      // Simulate API call
      testApiController(trace).then((response) => {
        console.log("API response:", response);
      });
    }
    catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <Container className="mt-5">
      <FormHeader organization={organization} bodyTitle="Add Farm Product" />
      <Form onSubmit={onSubmit}> {/* Handle form submission here */}
        <Form.Group className="mb-3" controlId="farmProductName">
          <Form.Label>Farm Product Name</Form.Label>
          <Form.Control type="text" placeholder="Enter value for Field 1" />
        </Form.Group>

        <Button variant="primary" type="submit"> {/* Button type submit */}
          Submit
        </Button>
      </Form>
    </Container>
  );
};


export default AddFarmProductBody