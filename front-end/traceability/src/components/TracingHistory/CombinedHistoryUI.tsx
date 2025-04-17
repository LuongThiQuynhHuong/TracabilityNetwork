import { FC } from 'react';
import { Table, Container } from 'react-bootstrap';

interface Package {
  docType: string;
  id: string;
  rawProductId: string;
  productTypeId: string;
  status: string;
  packagedDateTime: string;
  weight: number;
  lastShipmentId: string;
  processorOrgId: string;
  currentOwnerOrgId: string;
}

interface FarmProduct {
  docType: string;
  id: string;
  name: string;
  status: string;
  farmOrgId: string;
  currentOwnerOrgId: string;
}

interface PackageHistory {
  record: Package;
  txId: string;
  timestamp: string;
  isDelete: boolean;
}

interface RawProductHistory {
  record: FarmProduct;
  txId: string;
  timestamp: string;
  isDelete: boolean;
}

interface CombinedHistory {
  packageHistory: PackageHistory[];
  rawProductHistory: RawProductHistory[];
}

const CombinedHistoryUI: FC<{ history: CombinedHistory }> = ({ history }) => {
  console.log('CombinedHistoryUI', history);
  return (
    <Container>
      <h1>Combined History</h1>

      {/* Display Package History */}
      <h2>Package History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>TX ID</th>
            <th>Package ID</th>
            <th>Raw Product ID</th>
            <th>Status</th>
            <th>Packaged Date</th>
            <th>Weight</th>
            <th>Is Delete</th>
          </tr>
        </thead>
        <tbody>
          {history.packageHistory.map((ph) => (
            <tr key={ph.txId}>
              <td>{ph.txId}</td>
              <td>{ph.record.id}</td>
              <td>{ph.record.rawProductId}</td>
              <td>{ph.record.status}</td>
              <td>{ph.record.packagedDateTime}</td>
              <td>{ph.record.weight}</td>
              <td>{ph.isDelete ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Display Raw Product History */}
      <h2>Raw Product History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>TX ID</th>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Status</th>
            <th>Farm Org ID</th>
            <th>Is Delete</th>
          </tr>
        </thead>
        <tbody>
          {history.rawProductHistory.map((rph) => (
            <tr key={rph.txId}>
              <td>{rph.txId}</td>
              <td>{rph.record.id}</td>
              <td>{rph.record.name}</td>
              <td>{rph.record.status}</td>
              <td>{rph.record.farmOrgId}</td>
              <td>{rph.isDelete ? 'Yes' : 'No'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CombinedHistoryUI;
