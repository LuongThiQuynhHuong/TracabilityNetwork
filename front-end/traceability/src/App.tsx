import { useState } from 'react';
import AddFarmProductBody from '@components/AddFarmProductBody/AddFarmProductBody';
import AddPackageBody from '@components/AddPackageBody/AddPackageBody';
import AddShipmentBody from '@components/AddShipmentBody/AddShipmentBody';
import ApproveProductTypeBody from '@components/ApproveProductTypeBody/ApproveProductTypeBody';
import EndShipmentBody from '@components/EndShipmentBody/EndShipmentBody';
import Header from '@components/Header/Header';
import RegisterOrgRoleBody from '@components/RegisterOrgRoleBody/RegisterOrgRoleBody';
import RegisterProductTypeBody from '@components/RegisterProductTypeBody/RegisterProductTypeBody';
import StartShipmentBody from '@components/StartShipmentBody/StartShipmentBody';
import TransferFarmProductBody from '@components/TransferFarmProductBody/TransferFarmProductBody';
import TransferPackageBody from '@components/TransferPackageBody/TransferPackageBody';
import UpdateFarmProductStatusBody from '@components/UpdateFarmProductStatusBody/UpdateFarmProductStatusBody';
import UpdatePackageStatusBody from '@components/UpdatePackageStatusBody/UpdatePackageStatusBody';
import "@utils/AppConstant";
import { ADD_FARM_PRODUCT, ADD_PACKAGE, ADD_SHIPMENT, APPROVE_PRODUCT_TYPE, END_SHIPMENT, REGISTER_ORG_ROLE, REGISTER_PRODUCT_TYPE, START_SHIPMENT, TRANSFER_FARM_PRODUCT, TRANSFER_PACKAGE, UPDATE_FARM_PRODUCT_STATUS, UPDATE_PACKAGE_STATUS } from '@utils/AppConstant';
import WelcomeScreen from '@components/WelcomeScreen/WelcomeScreen';

function App() {
  const [activeComponent, setActiveComponent] = useState<string>('');

  const renderBodyComponent = () => {
    switch (activeComponent) {
      case ADD_FARM_PRODUCT:
        return <AddFarmProductBody />;
      case ADD_PACKAGE:
        return <AddPackageBody />;
      case ADD_SHIPMENT:
        return <AddShipmentBody />;
      case APPROVE_PRODUCT_TYPE:
        return <ApproveProductTypeBody />;
        case END_SHIPMENT:
          return <EndShipmentBody />;
        case REGISTER_ORG_ROLE:
          return <RegisterOrgRoleBody />;
        case REGISTER_PRODUCT_TYPE:
          return <RegisterProductTypeBody />;
        case START_SHIPMENT:
          return <StartShipmentBody />;
          case TRANSFER_FARM_PRODUCT:
            return <TransferFarmProductBody />;
          case TRANSFER_PACKAGE:
            return <TransferPackageBody />;
          case UPDATE_FARM_PRODUCT_STATUS:
            return <UpdateFarmProductStatusBody />;
          case UPDATE_PACKAGE_STATUS:
            return <UpdatePackageStatusBody />;
      default:
        return <WelcomeScreen />;
    }
  };

  return (
    <>
      <Header onMenuClick={setActiveComponent} />
      {renderBodyComponent()}
    </>
  )
}

export default App
