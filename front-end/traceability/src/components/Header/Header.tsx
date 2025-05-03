import { Badge, Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import "./styles.scss";
import { OrganizationKey, REGISTER_ORG_ROLE, APPROVE_PRODUCT_TYPE, GENERATE_TRACING_QR_CODE, ADD_FARM_PRODUCT, ADD_FARM_PRODUCT_TITLE, UPDATE_FARM_PRODUCT_STATUS, TRANSFER_FARM_PRODUCT, UPDATE_PACKAGE_STATUS, REGISTER_PRODUCT_TYPE, ADD_PACKAGE, TRANSFER_PACKAGE, ADD_SHIPMENT, START_SHIPMENT, END_SHIPMENT, ADD_PACKAGE_TITLE, ADD_SHIPMENT_TITLE, APPROVE_PRODUCT_TYPE_TITLE, END_SHIPMENT_TITLE, GENERATE_TRACING_QR_CODE_TITLE, REGISTER_ORG_ROLE_TITLE, REGISTER_PRODUCT_TYPE_TITLE, START_SHIPMENT_TITLE, TRANSFER_FARM_PRODUCT_TITLE, TRANSFER_PACKAGE_TITLE, UPDATE_FARM_PRODUCT_STATUS_TITLE, UPDATE_PACKAGE_STATUS_TITLE } from '@utils/AppConstant';

const Header = ({ onMenuClick }: { onMenuClick: (body: string, organization: OrganizationKey) => void }) => {
  return (
    <header>
      <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
        <Container fluid>
          {/* Logo on the left */}
          <Navbar.Brand onClick={() => onMenuClick("", OrganizationKey.RegulatoryDepartment)} className="d-flex align-items-center">
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
                <NavDropdown.Item onClick={() => onMenuClick(REGISTER_ORG_ROLE, OrganizationKey.RegulatoryDepartment)}>{REGISTER_ORG_ROLE_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(APPROVE_PRODUCT_TYPE, OrganizationKey.RegulatoryDepartment)}>{APPROVE_PRODUCT_TYPE_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(GENERATE_TRACING_QR_CODE, OrganizationKey.RegulatoryDepartment)}>{GENERATE_TRACING_QR_CODE_TITLE}</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Farm" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={() => onMenuClick(ADD_FARM_PRODUCT, OrganizationKey.Farm)}>{ADD_FARM_PRODUCT_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(UPDATE_FARM_PRODUCT_STATUS, OrganizationKey.Farm)}>{UPDATE_FARM_PRODUCT_STATUS_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(TRANSFER_FARM_PRODUCT, OrganizationKey.Farm)}>{TRANSFER_FARM_PRODUCT_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(UPDATE_PACKAGE_STATUS, OrganizationKey.Farm)}>{UPDATE_PACKAGE_STATUS_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(GENERATE_TRACING_QR_CODE, OrganizationKey.Farm)}>{GENERATE_TRACING_QR_CODE_TITLE}</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Processor" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={() => onMenuClick(UPDATE_FARM_PRODUCT_STATUS, OrganizationKey.Processor)}>{UPDATE_FARM_PRODUCT_STATUS_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(REGISTER_PRODUCT_TYPE, OrganizationKey.Processor)}>{REGISTER_PRODUCT_TYPE_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(ADD_PACKAGE, OrganizationKey.Processor)}>{ADD_PACKAGE_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(TRANSFER_PACKAGE, OrganizationKey.Processor)}>{TRANSFER_PACKAGE_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(UPDATE_PACKAGE_STATUS, OrganizationKey.Processor)}>{UPDATE_PACKAGE_STATUS_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(START_SHIPMENT, OrganizationKey.Processor)}>{START_SHIPMENT_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(GENERATE_TRACING_QR_CODE, OrganizationKey.Processor)}>{GENERATE_TRACING_QR_CODE_TITLE}</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Distributor" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={() => onMenuClick(ADD_SHIPMENT, OrganizationKey.Distributor)}>{ADD_SHIPMENT_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(START_SHIPMENT, OrganizationKey.Distributor)}>{START_SHIPMENT_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(TRANSFER_PACKAGE, OrganizationKey.Distributor)}>{TRANSFER_PACKAGE_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(END_SHIPMENT, OrganizationKey.Distributor)}>{END_SHIPMENT_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(UPDATE_PACKAGE_STATUS, OrganizationKey.Distributor)}>{UPDATE_PACKAGE_STATUS_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(GENERATE_TRACING_QR_CODE, OrganizationKey.Distributor)}>{GENERATE_TRACING_QR_CODE_TITLE}</NavDropdown.Item>
              </NavDropdown>

              <NavDropdown title="Retailer" id="basic-nav-dropdown" align="end">
                <NavDropdown.Item onClick={() => onMenuClick(UPDATE_PACKAGE_STATUS, OrganizationKey.Retailer)}>{UPDATE_PACKAGE_STATUS_TITLE}</NavDropdown.Item>
                <NavDropdown.Item onClick={() => onMenuClick(GENERATE_TRACING_QR_CODE, OrganizationKey.Retailer)}>{GENERATE_TRACING_QR_CODE_TITLE}</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;