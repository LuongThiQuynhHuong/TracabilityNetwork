import AddFarmProductBody from '@components/AddFarmProductBody/AddFarmProductBody';
import AddNewOrgBody from '@components/AddNewOrgBody/AddNewOrgBody';
import AddPackageBody from '@components/AddPackageBody/AddPackageBody';
import AddShipmentBody from '@components/AddShipmentBody/AddShipmentBody';
import ApproveProductTypeBody from '@components/ApproveProductTypeBody/ApproveProductTypeBody';
import EndShipmentBody from '@components/EndShipmentBody/EndShipmentBody';
import Header from '@components/Header/Header';
import LinkPackageWithShipmentBody from '@components/LinkPackageWithShipmentBody/LinkPackageWithShipmentBody';
import RegisterOrgRoleBody from '@components/RegisterOrgRoleBody/RegisterOrgRoleBody';
import RegisterProductTypeBody from '@components/RegisterProductTypeBody/RegisterProductTypeBody';
import StartShipmentBody from '@components/StartShipmentBody/StartShipmentBody';
import TracingCodeGenerationBody from '@components/TracingCodeGenerationBody/TracingCodeGenerationBody';
import TransferFarmProductBody from '@components/TransferFarmProductBody/TransferFarmProductBody';
import TransferPackageBody from '@components/TransferPackageBody/TransferPackageBody';
import UpdateFarmProductStatusBody from '@components/UpdateFarmProductStatusBody/UpdateFarmProductStatusBody';
import UpdatePackageStatusBody from '@components/UpdatePackageStatusBody/UpdatePackageStatusBody';
import WelcomeScreen from '@components/WelcomeScreen/WelcomeScreen';
import { OrganizationKey, ADD_FARM_PRODUCT, ADD_PACKAGE, ADD_SHIPMENT, APPROVE_PRODUCT_TYPE, END_SHIPMENT, REGISTER_ORG_ROLE, REGISTER_PRODUCT_TYPE, START_SHIPMENT, TRANSFER_FARM_PRODUCT, TRANSFER_PACKAGE, UPDATE_FARM_PRODUCT_STATUS, UPDATE_PACKAGE_STATUS, GENERATE_TRACING_QR_CODE, ADD_NEW_ORG, LINK_PACKAGE_WITH_SHIPMENT } from '@utils/AppConstant';
import { useState } from 'react'

const MainPage = () => {
   const [activeComponent, setActiveComponent] = useState<string>('');
  const [organization, setOrganization] = useState<OrganizationKey>(OrganizationKey.RegulatoryDepartment);

  // 2. Function to handle the menu click and set component and organization
  const handleMenuClick = (body: string, org: OrganizationKey) => {
    setActiveComponent(body);
    setOrganization(org);
  };

  const renderBodyComponent = () => {
    switch (activeComponent) {
      case ADD_FARM_PRODUCT:
        return <AddFarmProductBody organization={organization} />;
      case ADD_PACKAGE:
        return <AddPackageBody organization={organization} />;
      case ADD_SHIPMENT:
        return <AddShipmentBody organization={organization} />;
      case APPROVE_PRODUCT_TYPE:
        return <ApproveProductTypeBody organization={organization} />;
      case END_SHIPMENT:
        return <EndShipmentBody organization={organization} />;
      case REGISTER_ORG_ROLE:
        return <RegisterOrgRoleBody organization={organization} />;
      case REGISTER_PRODUCT_TYPE:
        return <RegisterProductTypeBody organization={organization} />;
      case LINK_PACKAGE_WITH_SHIPMENT:
        return <LinkPackageWithShipmentBody organization={organization} />;
      case START_SHIPMENT:
        return <StartShipmentBody organization={organization} />;
      case TRANSFER_FARM_PRODUCT:
        return <TransferFarmProductBody organization={organization} />;
      case TRANSFER_PACKAGE:
        return <TransferPackageBody organization={organization} />;
      case UPDATE_FARM_PRODUCT_STATUS:
        return <UpdateFarmProductStatusBody organization={organization} />;
      case UPDATE_PACKAGE_STATUS:
        return <UpdatePackageStatusBody organization={organization} />;
      case GENERATE_TRACING_QR_CODE:
        return <TracingCodeGenerationBody organization={organization} />;
      case ADD_NEW_ORG:
        return <AddNewOrgBody organization={organization} />;
      default:
        return <WelcomeScreen />;
    }
  };
  return (
    <>
      <Header onMenuClick={handleMenuClick} />
      {renderBodyComponent()}
    </>
  )
}

export default MainPage