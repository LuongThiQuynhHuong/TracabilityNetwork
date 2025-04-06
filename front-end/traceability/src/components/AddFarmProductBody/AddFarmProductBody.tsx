import { Button, Container, Form } from 'react-bootstrap';

const AddFarmProductBody = () => {
  return (
    <Container className="mt-5">
      <h2>Add Farm Product</h2>
      <Form>
        <Form.Group className="mb-3" controlId="farmProductName">
          <Form.Label>Farm Product Name</Form.Label>
          <Form.Control type="text" placeholder="Enter value for Field 1" />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default AddFarmProductBody