import { Button, Container, Form } from 'react-bootstrap';

const AddPackageBody = () => {
    return (
        <Container className="mt-5">
          <h2>Add Package</h2>
          <Form>
            <Form.Group className="mb-3" controlId="farmProductId">
              <Form.Label>Farm Product Id</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="productTypeId">
              <Form.Label>Product Type Id</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="packagedTime">
              <Form.Label>Packaged Time</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="weight">
              <Form.Label>Weight</Form.Label>
              <Form.Control type="number" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      );
}

export default AddPackageBody