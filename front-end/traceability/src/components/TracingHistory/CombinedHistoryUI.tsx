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
      <h1 style={{ paddingTop: "20px", textAlign: "center" }}>
        Package History for ID '{packageId}'
      </h1>

      {/* Display Package History */}
      <div style={{ padding: "0 20px" }}>
        <h2>Package History</h2>
        <div style={{ overflowX: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Submitter MSP Id</th>
                <th>Submitter</th>
                <th>Invoked Function</th>
                <th>TX ID</th>
                <th>Package ID</th>
                <th>Raw Product ID</th>
                <th>Product Type</th>
                <th>Status</th>
                <th>Packaged Date</th>
                <th>Weight</th>
                <th>Last Shipment Id</th>
                <th>Processor Org Name</th>
                <th>Current Owner Org Name</th>
              </tr>
            </thead>
            <tbody>
              {history.packageHistory.map((ph) => (
                <tr key={ph.txId}>
                  <td>{ph.timestamp}</td>
                  <td>{ph.record.submitterMSPID}</td>
                  <td>{ph.record.submitterName}</td>
                  <td>{ph.record.invokedFunction}</td>
                  <td>{ph.txId}</td>
                  <td>{ph.record.id}</td>
                  <td>{ph.record.rawProductId}</td>
                  <td>{ph.record.productTypeName}</td>
                  <td>{ph.record.status}</td>
                  <td>{ph.record.packagedDateTime}</td>
                  <td>{ph.record.weight}</td>
                  <td>{ph.record.lastShipmentId}</td>
                  <td>{ph.record.processorName}</td>
                  <td>{ph.record.currentOwnerName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>

      {/* Display Raw Product History */}
      <div style={{ padding: "0 20px" }}>
        <h2>Raw Product History</h2>
        <div style={{ overflowX: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Submitter MSP Id</th>
                <th>Submitter</th>
                <th>Invoked Function</th>
                <th>TX ID</th>
                <th>Product ID</th>
                <th>Product Name</th>
                <th>Status</th>
                <th>Farm Org Name</th>
                <th>Current Owner Org Name</th>
              </tr>
            </thead>
            <tbody>
              {history.rawProductHistory.map((rph) => (
                <tr key={rph.txId}>
                  <td>{rph.timestamp}</td>
                  <td>{rph.record.submitterMSPID}</td>
                  <td>{rph.record.submitterName}</td>
                  <td>{rph.record.invokedFunction}</td>
                  <td>{rph.txId}</td>
                  <td>{rph.record.id}</td>
                  <td>{rph.record.name}</td>
                  <td>{rph.record.status}</td>
                  <td>{rph.record.farmName}</td>
                  <td>{rph.record.currentOwnerName}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default CombinedHistoryUI;
