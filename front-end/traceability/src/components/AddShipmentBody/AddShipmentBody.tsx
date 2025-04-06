import { Button, Container, Form } from 'react-bootstrap';

const AddShipmentBody = () => {
    return (
        <Container className="mt-5">
          <h2>Add Shipment</h2>
          <Form>
            <Form.Group className="mb-3" controlId="fromAddress">
              <Form.Label>From Address</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="destinationAddress">
              <Form.Label>To Address</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="processorOrgId">
              <Form.Label>Processor Organization Id</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="retailerOrgId">
              <Form.Label>Retailer Organization Id</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      );
}

export default AddShipmentBody