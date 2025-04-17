// Bodies
export const ADD_FARM_PRODUCT = "ADD_FARM_PRODUCT";
export const ADD_PACKAGE = "ADD_PACKAGE";
export const ADD_SHIPMENT = "ADD_SHIPMENT";
export const APPROVE_PRODUCT_TYPE = "APPROVE_PRODUCT_TYPE";
export const END_SHIPMENT = "END_SHIPMENT";
export const REGISTER_ORG_ROLE = "REGISTER_ORG_ROLE";
export const REGISTER_PRODUCT_TYPE = "REGISTER_PRODUCT_TYPE";
export const START_SHIPMENT = "START_SHIPMENT";
export const TRANSFER_FARM_PRODUCT = "TRANSFER_FARM_PRODUCT";
export const TRANSFER_PACKAGE = "TRANSFER_PACKAGE";
export const UPDATE_FARM_PRODUCT_STATUS = "UPDATE_FARM_PRODUCT_STATUS";
export const UPDATE_PACKAGE_STATUS = "UPDATE_PACKAGE_STATUS";
export const GENERATE_TRACING_QR_CODE = "GENERATE_TRACING_QR_CODE";

// Function titles
export const ADD_FARM_PRODUCT_TITLE = "Add Farm Product";
export const ADD_PACKAGE_TITLE = "Add Package";
export const ADD_SHIPMENT_TITLE = "Add Shipment";
export const APPROVE_PRODUCT_TYPE_TITLE = "Approve Product Type";
export const END_SHIPMENT_TITLE = "End Shipment";
export const REGISTER_ORG_ROLE_TITLE = "Register Organization Role";
export const REGISTER_PRODUCT_TYPE_TITLE = "Register Product Type";
export const START_SHIPMENT_TITLE = "Start Shipment";
export const TRANSFER_FARM_PRODUCT_TITLE = "Transfer Farm Product";
export const TRANSFER_PACKAGE_TITLE = "Transfer Package";
export const UPDATE_FARM_PRODUCT_STATUS_TITLE = "Update Farm Product Status";
export const UPDATE_PACKAGE_STATUS_TITLE = "Update Pakage Status";
export const GENERATE_TRACING_QR_CODE_TITLE = "Generate Tracable Package QR Code";

// Organizations
export const REGULATORY_DEPARTMENT_ORG = "regulatoryDepartment";
export const FARM_ORG = "farm";
export const PROCESSOR_ORG = "processor";
export const DISTRIBUTOR_ORG = "distributor";
export const RETAILER_ORG = "retailer";

export const ORG_PROFILES = {
    "farm": {
        "title": "Farm organization"
    },
    "processor": {
        "title": "Processor organization"
    },
    "distributor": {
        "title": "Distributor organization"
    },
    "retailer": {
        "title": "Retailer organization"
    },
    "regulatoryDepartment": {
        "title": "Regulatory department organization"
    }
}

export type OrganizationKey = 'farm' | 'processor' | 'distributor' | 'retailer' | 'regulatoryDepartment';

// Api endpoints
export const ADD_NEW_ORG_ENDPOINT = "/addNewOrganization";
export const REGISTER_ORG_ROLE_ENDPOINT = "/registerOrgRole";
export const ADD_FARM_PRODUCT_ENDPOINT = "/addFarmProduct";
export const UPDATE_FARM_PRODUCT_STATUS_ENDPOINT = "/updateFarmProductStatus";
export const TRANSFER_FARM_PRODUCT_ENDPOINT = "/transferFarmProduct";
export const REGISTER_PRODUCT_TYPE_ENDPOINT = "/registerProductType";
export const APPROVE_PRODUCT_TYPE_ENDPOINT = "/approveProductType";
export const ADD_PACKAGE_ENDPOINT = "/addPackage";
export const ADD_SHIPMENT_ENDPOINT = "/addShipment";
export const START_SHIPMENT_ENDPOINT = "/startShipment";
export const TRANSFER_PACKAGE_ENDPOINT = "/transferPackage";
export const END_SHIPMENT_ENDPOINT = "/endShipment";
export const UPDATE_PACKAGE_STATUS_ENDPOINT = "/updatePackageStatus";
export const TRACE_PROVENANCE_ENDPOINT = "/traceProvenance";