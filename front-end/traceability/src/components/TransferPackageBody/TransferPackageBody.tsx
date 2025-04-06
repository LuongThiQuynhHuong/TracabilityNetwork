import { Button, Container, Form } from 'react-bootstrap';

const TransferPackageBody = () => {
    return (
        <Container className="mt-5">
          <h2>Transfer Package</h2>
          <Form>
            <Form.Group className="mb-3" controlId="packageId">
              <Form.Label>Package Id</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="transferedOrgId">
              <Form.Label>Transfer to Oranization Id</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      );
}

export default TransferPackageBody