import { Button, Container, Form } from 'react-bootstrap';

const UpdatePackageStatusBody = () => {
    return (
        <Container className="mt-5">
          <h2>Update Package Status</h2>
          <Form>
            <Form.Group className="mb-3" controlId="packageId">
              <Form.Label>Package Id</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>New Status</Form.Label>
              <Form.Select>
                <option value="Packaged">Packaged</option>
                <option value="Shipping">Shipping</option>
                <option value="Distributed">Distributed</option>
              </Form.Select>
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      );
}

export default UpdatePackageStatusBody