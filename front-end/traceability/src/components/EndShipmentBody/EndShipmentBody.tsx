import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { Button, Container, Form } from 'react-bootstrap';

const EndShipmentBody : React.FC<AppBodyProps> = ({ organization }) => {
    return (
        <Container className="mt-5">
          <FormHeader organization={organization} bodyTitle="End Shipment" />
          <Form>
            <Form.Group className="mb-3" controlId="shipmentId">
              <Form.Label>Shipment Id</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      );
}

export default EndShipmentBody