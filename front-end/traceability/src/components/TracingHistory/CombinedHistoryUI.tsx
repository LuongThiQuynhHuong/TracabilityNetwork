import { CombinedHistory } from '@utils/BaseIntefaces';
import { Table, Container } from 'react-bootstrap';

interface CombinedHistoryUIProps {
  packageId: string;
  history: CombinedHistory;
}

const CombinedHistoryUI: React.FC<CombinedHistoryUIProps> = ({ packageId, history }) => {
  console.log('CombinedHistoryUI', history);
  return (
    <Container>
      <h1 style={{ paddingTop: "20px", textAlign: "center" }}>Package History for ID '{packageId}'</h1>

      {/* Display Package History */}
      <h2>Package History</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>TX ID</th>
            <th>Package ID</th>
            <th>Raw Product ID</th>
            <th>Product Type ID</th>
            <th>Status</th>
            <th>Packaged Date</th>
            <th>Weight</th>
            <th>Last Shipment Id</th>
            <th>Processor Org Id</th>
            <th>Current Owner Org Id</th>
          </tr>
        </thead>
        <tbody>
          {history.packageHistory.map((ph) => (
            <tr key={ph.txId}>
              <td>{ph.txId}</td>
              <td>{ph.record.id}</td>
              <td>{ph.record.rawProductId}</td>
              <td>{ph.record.productTypeId}</td>
              <td>{ph.record.status}</td>
              <td>{ph.record.packagedDateTime}</td>
              <td>{ph.record.weight}</td>
              <td>{ph.record.lastShipmentId}</td>
              <td>{ph.record.processorOrgId}</td>
              <td>{ph.record.currentOwnerOrgId}</td>
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
            <th>Current Owner Org Id</th>
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
              <td>{rph.record.currentOwnerOrgId}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default CombinedHistoryUI;
