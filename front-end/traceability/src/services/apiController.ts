import { ADD_NEW_ORG_ENDPOINT, REGISTER_ORG_ROLE_ENDPOINT, ADD_FARM_PRODUCT_ENDPOINT, UPDATE_FARM_PRODUCT_STATUS_ENDPOINT, TRANSFER_FARM_PRODUCT_ENDPOINT, REGISTER_PRODUCT_TYPE_ENDPOINT, APPROVE_PRODUCT_TYPE_ENDPOINT, ADD_PACKAGE_ENDPOINT, ADD_SHIPMENT_ENDPOINT, START_SHIPMENT_ENDPOINT, TRANSFER_PACKAGE_ENDPOINT, END_SHIPMENT_ENDPOINT, UPDATE_PACKAGE_STATUS_ENDPOINT, TRACE_PROVENANCE_ENDPOINT } from "@utils/AppConstant";
import { API_BASE_URL } from "@utils/ConfigConstant";

// Define TypeScript interfaces for the resources returned by your API (adjust as needed)
export interface RequestModel {
    organization: string;
    packageKey?: string;
    checkbool?: boolean;
    isApproved?: boolean;
    role?: string;
    orgKey?: string;
    name?: string;
    status?: string;
    newStatus?: string;
    newOrgKey?: string;
    productTypeKey?: string;
    weight?: number;
    rawProductKey?: string;
    fromAddress?: string;
    destinationAddress?: string;
    startTime?: string;
    processorOrgKey?: string;
    retailerOrgKey?: string;
    farmProductKey?: string;
    packagedDateTime?: string;
    shipmentKey?: string;
  }

export interface ResponseModel {
    success: boolean;
    message: string;
    data?: object;
  }

export async function testApiController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const response = await fetch(`${API_BASE_URL}/test`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
    });
    if (!response.ok) {
        throw new Error('Failed to create trace');
    }
    return response.json();
}

async function makeApiRequest(endpoint: string, request: Partial<RequestModel>): Promise<ResponseModel> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(request),
    });
  
    if (!response.ok) {
      throw new Error(`Failed to call endpoint ${endpoint}`);
    }
    return response.json();
  }
  
export async function addNewOrgController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const { organization } = request;
    return makeApiRequest(ADD_NEW_ORG_ENDPOINT, { organization });
  }
  
export async function registerOrgRoleController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const { organization, role, orgKey } = request;
    return makeApiRequest(REGISTER_ORG_ROLE_ENDPOINT, { organization, role, orgKey });
  }
  
export async function addFarmProductController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const { organization, name } = request;
    return makeApiRequest(ADD_FARM_PRODUCT_ENDPOINT, { organization, name });
  }
  
export async function updateFarmProductStatusController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const { organization, farmProductKey, newStatus } = request;
    return makeApiRequest(UPDATE_FARM_PRODUCT_STATUS_ENDPOINT, { organization, farmProductKey, newStatus });
  }
  
export async function transferFarmProductController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const { organization, farmProductKey, newOrgKey } = request;
    return makeApiRequest(TRANSFER_FARM_PRODUCT_ENDPOINT, { organization, farmProductKey, newOrgKey });
  }
  
export async function registerProductTypeController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const { organization, name } = request;
    return makeApiRequest(REGISTER_PRODUCT_TYPE_ENDPOINT, { organization, name });
  }
  
export async function approveProductTypeController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const { organization, productTypeKey, isApproved } = request;
    return makeApiRequest(APPROVE_PRODUCT_TYPE_ENDPOINT, { organization, productTypeKey, isApproved });
  }
  
export async function addPackageController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const { organization, rawProductKey, productTypeKey, packagedDateTime, weight } = request;
    return makeApiRequest(ADD_PACKAGE_ENDPOINT, { organization, rawProductKey, productTypeKey, packagedDateTime, weight });
  }
  
export async function addShipmentController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const { organization, fromAddress, destinationAddress, startTime, processorOrgKey, retailerOrgKey } = request;
    return makeApiRequest(ADD_SHIPMENT_ENDPOINT, { organization, fromAddress, destinationAddress, startTime, processorOrgKey, retailerOrgKey });
  }
  
export async function startShipmentController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const { organization, shipmentKey, packageKey } = request;
    return makeApiRequest(START_SHIPMENT_ENDPOINT, { organization, shipmentKey, packageKey });
  }
  
export async function transferPackageController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const { organization, packageKey, newOrgKey } = request;
    return makeApiRequest(TRANSFER_PACKAGE_ENDPOINT, { organization, packageKey, newOrgKey });
  }
  
export async function endShipmentController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const { organization, shipmentKey } = request;
    return makeApiRequest(END_SHIPMENT_ENDPOINT, { organization, shipmentKey });
  }
  
export async function updatePackageStatusController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const { organization, packageKey, status } = request;
    return makeApiRequest(UPDATE_PACKAGE_STATUS_ENDPOINT, { organization, packageKey, status });
  }
  
export async function traceProvenanceController(request: Partial<RequestModel>): Promise<ResponseModel> {
    const { organization, packageKey } = request;
    return makeApiRequest(TRACE_PROVENANCE_ENDPOINT, { organization, packageKey });
  }