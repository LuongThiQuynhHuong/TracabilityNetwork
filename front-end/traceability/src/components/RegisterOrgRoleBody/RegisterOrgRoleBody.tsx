import { Button, Container, Form } from 'react-bootstrap';

const RegisterOrgRoleBody = () => {
    return (
        <Container className="mt-5">
          <h2>Register Organization Role</h2>
          <Form>
            <Form.Group className="mb-3" controlId="orgId">
              <Form.Label>Organization Id</Form.Label>
              <Form.Control type="text" placeholder="Enter value for Field 1" />
            </Form.Group>
    
            <Form.Group className="mb-3" controlId="status">
              <Form.Label>Role</Form.Label>
              <Form.Select>
                <option value="RegulatoryDepartment">Regulatory Department</option>
                <option value="Farm">Farm</option>
                <option value="Processor">Processor</option>
                <option value="Distributor">Distributor</option>
                <option value="Retailer">Retailer</option>
              </Form.Select>
            </Form.Group>
    
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      );
}

export default RegisterOrgRoleBody