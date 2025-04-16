const HLF_CONSTANTS = {
  CHANNEL_NAME : "tracingchannel",
  CHAINCODE_NAME : "Traceability-supply-chain",
  CONTRACT_NAME : "SmartContract",
};

const HLF_TRANSACTION_TYPE = {
  INVOKE_TXN : "invokeTxn",
  QUERY_TXN : "queryTxn"
};

const HLF_TRANSACTION_NAME = {
  ADD_NEW_ORG : "AddNewOrganization",
  REGISTER_ORG_ROLE : "RegisterOrgRole",
  ADD_FARM_PRODUCT : "AddFarmProduct",
  UPDATE_FARM_PRODUCT_STATUS : "UpdateFarmProductStatus",
  TRANSFER_FARM_PRODUCT : "TransferFarmProduct",
  REGISTER_PRODUCT_TYPE : "RegisterProductType",
  APPROVE_PRODUCT_TYPE : "ApproveProductType",
  ADD_PACKAGE : "AddPackage",
  ADD_SHIPMENT : "AddShipment",
  START_SHIPMENT : "StartShipment",
  TRANSFER_PACKAGE : "TransferPackage",
  END_SHIPMENT : "EndShipment",
  UPDATE_PACKAGE_STATUS : "UpdatePackageStatus",
  TRACE_PROVENANCE : "TraceProvenance",
};

const API_ENDPOINT = {
  ADD_NEW_ORG : "/addNewOrganization",
  REGISTER_ORG_ROLE : "/registerOrgRole",
  ADD_FARM_PRODUCT : "/addFarmProduct",
  UPDATE_FARM_PRODUCT_STATUS : "/updateFarmProductStatus",
  TRANSFER_FARM_PRODUCT : "/transferFarmProduct",
  REGISTER_PRODUCT_TYPE : "/registerProductType",
  APPROVE_PRODUCT_TYPE : "/approveProductType",
  ADD_PACKAGE : "/addPackage",
  ADD_SHIPMENT : "/addShipment",
  START_SHIPMENT : "/startShipment",
  TRANSFER_PACKAGE : "/transferPackage",
  END_SHIPMENT : "/endShipment",
  UPDATE_PACKAGE_STATUS : "/updatePackageStatus",
  TRACE_PROVENANCE : "/traceProvenance",
};

module.exports = {
  HLF_CONSTANTS,
  HLF_TRANSACTION_TYPE,
  HLF_TRANSACTION_NAME,
  API_ENDPOINT
};