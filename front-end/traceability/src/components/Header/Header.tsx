import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import "@utils/AppConstant";
import "./styles.scss";
import { ADD_FARM_PRODUCT, ADD_PACKAGE, ADD_SHIPMENT, APPROVE_PRODUCT_TYPE, END_SHIPMENT, REGISTER_ORG_ROLE, REGISTER_PRODUCT_TYPE, START_SHIPMENT, TRANSFER_FARM_PRODUCT, TRANSFER_PACKAGE, UPDATE_FARM_PRODUCT_STATUS, UPDATE_PACKAGE_STATUS } from '../../utils/AppConstant';

const Header = ({ onMenuClick }: { onMenuClick: (component: string) => void }) => {
  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container fluid>
          {/* Logo on the left */}
          <Navbar.Brand onClick={() => onMenuClick("")} className="d-flex align-items-center">
            <h1 className="headerLogo mb-0">
              <Badge bg="success">P</Badge><span>Tracing</span>
            </h1>
          </Navbar.Brand>

          {/* Navbar toggle for mobile view */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* Navigation menu on the right */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <NavDropdown title="Regulatory Department" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={() => onMenuClick(REGISTER_ORG_ROLE)}>Register Organization Role</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(APPROVE_PRODUCT_TYPE)}>Approve Product Type</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Farm" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={() => onMenuClick(ADD_FARM_PRODUCT)}>Add Farm Product</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(UPDATE_FARM_PRODUCT_STATUS)}>Update Farm Product Status</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(TRANSFER_FARM_PRODUCT)}>Transfer Farm Product</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(UPDATE_PACKAGE_STATUS)}>Update Pakage Status</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Processor" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={() => onMenuClick(UPDATE_FARM_PRODUCT_STATUS)}>Update Farm Product Status</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(REGISTER_PRODUCT_TYPE)}>Register Product Type</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(ADD_PACKAGE)}>Add Package</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(TRANSFER_PACKAGE)}>Transfer Package</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(UPDATE_PACKAGE_STATUS)}>Update Pakage Status</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Distributor" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={() => onMenuClick(ADD_SHIPMENT)}>Add Shipment</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(START_SHIPMENT)}>Start Shipment</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(TRANSFER_PACKAGE)}>Transfer Package</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(END_SHIPMENT)}>End Shipment</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(UPDATE_PACKAGE_STATUS)}>Update Pakage Status</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Retailer" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={() => onMenuClick(UPDATE_PACKAGE_STATUS)}>Update Pakage Status</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;