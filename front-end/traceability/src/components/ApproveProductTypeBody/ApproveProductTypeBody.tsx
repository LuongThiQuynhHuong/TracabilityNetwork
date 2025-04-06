import { Button, Container, Form } from 'react-bootstrap';

const ApproveProductTypeBody = () => {
  return (
    <Container className="mt-5">
      <h2>Approve Product Type</h2>
      <Form>
        <Form.Group className="mb-3" controlId="productName">
          <Form.Label>Product Name</Form.Label>
          <Form.Control type="text" placeholder="Enter product name" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="approvalCheck">
          <Form.Check type="checkbox" label="Approve this product type" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default ApproveProductTypeBody;