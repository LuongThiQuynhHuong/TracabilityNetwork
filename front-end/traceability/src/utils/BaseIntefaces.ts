import { OrganizationKey } from "./AppConstant";

export interface AppBodyProps{
    organization: OrganizationKey;
}

export interface Package {
    docType: string;
    id: string;
    rawProductId: string;
    productTypeId: string;
    productTypeName: string;
    brand: string;
    status: string;
    packagedDateTime: string;
    expiryDate: string;
    unitOfMeasure: string;
    amount: number;
    lastShipmentId: string;
    processorOrgId: string;
    processorName: string;
    currentOwnerOrgId: string;
    currentOwnerName: string;
    submitterMSPID: string;
    submitterName: string;
    invokedFunction: string;
  }
  
  export interface FarmProduct {
    docType: string;
    id: string;
    name: string;
    status: string;
    farmOrgId: string;
    farmName: string;
    unitOfMeasure: string;
    amount: number;
    currentOwnerOrgId: string;
    currentOwnerName: string;
    submitterMSPID: string;
    submitterName: string;
    invokedFunction: string;
  }
  
  export  interface PackageHistory {
    record: Package;
    txId: string;
    timestamp: string;
    isDelete: boolean;
  }
  
  export interface RawProductHistory {
    record: FarmProduct;
    txId: string;
    timestamp: string;
    isDelete: boolean;
  }
  
 export interface CombinedHistory {
    packageHistory: PackageHistory[];
    rawProductHistory: RawProductHistory[];
  }