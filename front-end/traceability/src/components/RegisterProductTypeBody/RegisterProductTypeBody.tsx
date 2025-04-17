import FormHeader from '@components/FormHeader/FormHeader';
import { AppBodyProps } from '@utils/BaseIntefaces';
import { Button, Container, Form } from 'react-bootstrap';

const RegisterProductTypeBody : React.FC<AppBodyProps> = ({ organization }) => {
    return (
        <Container className="mt-5">
          <FormHeader organization={organization} bodyTitle="Register Product Type" />
          <Form>
            <Form.Group className="mb-3" controlId="packageName">
              <Form.Label>Package Name</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      );
}

export default RegisterProductTypeBody