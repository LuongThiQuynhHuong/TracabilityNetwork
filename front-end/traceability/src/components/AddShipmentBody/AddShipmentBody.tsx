import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { Button, Container, Form } from 'react-bootstrap';

const AddShipmentBody : React.FC<AppBodyProps> = ({ organization }) => {
    return (
        <Container className="mt-5">
          <FormHeader organization={organization} bodyTitle="Add Shipment" />
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