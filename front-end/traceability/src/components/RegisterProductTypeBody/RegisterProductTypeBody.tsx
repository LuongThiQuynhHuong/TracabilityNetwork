import { Button, Container, Form } from 'react-bootstrap';

const RegisterProductTypeBody = () => {
    return (
        <Container className="mt-5">
          <h2>Register Product Type</h2>
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