import { Button, Container, Form } from 'react-bootstrap';

const TransferFarmProductBody = () => {
    return (
        <Container className="mt-5">
          <h2>Transfer Farm Product</h2>
          <Form>
            <Form.Group className="mb-3" controlId="farmProductId">
              <Form.Label>Farm Product Id</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="transferToOrgId">
              <Form.Label>Transfer To Organization Id</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      );
}

export default TransferFarmProductBody