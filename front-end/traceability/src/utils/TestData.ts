export const sampleHistory = {
    packageHistory: [
      {
        record: {
          docType: 'Package',
          id: 'pkg123',
          rawProductId: 'raw123',
          productTypeId: 'prod1',
          status: 'Shipped',
          packagedDateTime: '2023-04-15T08:30:00Z',
          weight: 20.5,
          lastShipmentId: 'ship123',
          processorOrgId: 'org123',
          currentOwnerOrgId: 'org456',
        },
        txId: 'tx123',
        timestamp: '2023-04-15T08:30:00Z',
        isDelete: false,
      },
    ],
    rawProductHistory: [
      {
        record: {
          docType: 'FarmProduct',
          id: 'prod123',
          name: 'Raw Mangoes',
          status: 'Available',
          farmOrgId: 'farm123',
          currentOwnerOrgId: 'org456',
        },
        txId: 'tx456',
        timestamp: '2023-04-14T12:00:00Z',
        isDelete: false,
      },
    ],
  };