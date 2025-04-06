import { Button, Container, Form } from 'react-bootstrap';

const UpdateFarmProductStatusBody = () => {
    return (
        <Container className="mt-5">
          <h2>Update Farm Product Status</h2>
          <Form>
            <Form.Group className="mb-3" controlId="farmProductIdId">
              <Form.Label>Farm Product Id</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>New Status</Form.Label>
              <Form.Select>
                <option value="Growing">Growing</option>
                <option value="Mature">Mature</option>
                <option value="Processed">Processed</option>
              </Form.Select>
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      );
}

export default UpdateFarmProductStatusBody