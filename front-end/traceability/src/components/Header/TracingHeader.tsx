import { Navbar, Container, Badge } from 'react-bootstrap'

const TracingHeader = () => {
  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container fluid>
          <Navbar.Brand className="d-flex align-items-center">
            <h1 className="headerLogo mb-0">
              <Badge bg="success">P</Badge><span>Tracing</span>
            </h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  )
}

export default TracingHeader