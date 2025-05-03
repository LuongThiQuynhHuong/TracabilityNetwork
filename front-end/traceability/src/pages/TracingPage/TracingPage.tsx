import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import TracingHeader from "@components/Header/TracingHeader";
import { RequestModel, ResponseModel, traceProvenanceController } from "@services/APIController";
import CombinedHistoryUI from "@components/TracingHistory/CombinedHistoryUI";
import { CombinedHistory } from "@utils/BaseIntefaces";
import { Spinner, Toast } from "react-bootstrap";
import { CheckCircleFill, XCircleFill } from "react-bootstrap-icons";
import { ToastStatus } from "@utils/AppConstant";

const TracingPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const packageKey = queryParams.get("packageKey") || "";
  const organization = queryParams.get("organization") || "";

  // State to manage the response from the API call
  const [apiResponse, setApiResponse] = useState<ResponseModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastStatus, setToastStatus] = useState<ToastStatus>(ToastStatus.None);

  useEffect(() => {
    // Define a function to call the API and handle the response
    const fetchApiData = async () => {
      setLoading(true);
      setError(null);
      setToastMessage("Loading...");
      setToastStatus(ToastStatus.Loading);
      setShowToast(true); // Show toast when loading starts

      try {
        const trace: RequestModel = {
          organization: organization,
          packageKey: packageKey
        };

        const response = await traceProvenanceController(trace, true);

        if (response.success) {
          setToastMessage("Data loaded successfully!");
          setToastStatus(ToastStatus.Success);
          setApiResponse(response); // Store the API response
        } else {
          throw new Error(response.message);
        }
      } catch (error) {
        console.error("Error fetching data from API:", error);
        setError("Error fetching data from API.");
        setToastStatus(ToastStatus.Error);
        setToastMessage("Failed to load data.");
      } finally {
        setLoading(false); // End loading state
        setTimeout(() => {
          setShowToast(false); // Dismiss the toast after 3 seconds
        }, 1000); // Auto dismiss toast after 3 seconds
      }
    };

    // Call the fetchApiData function when the component mounts or packageKey changes
    fetchApiData();
  }, [packageKey, organization]); // Dependency array ensures it re-runs when `packageKey` or `organization` changes

  const overlayStyle: React.CSSProperties = {
      position: 'fixed',
      top: 0, left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.3)',
      zIndex: 1040,
    };
    const toastStyle: React.CSSProperties = {
      position: 'fixed',
      top: '50%', left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 1050,
      minWidth: '300px',
    };

  return (
    <>
      <TracingHeader />

      {/* Toast for loading, success, or error */}
      {showToast && (
        <>
          <div style={overlayStyle} />

          <Toast show={showToast} style={toastStyle} >
          <Toast.Header>
              {toastStatus === ToastStatus.Loading && <Spinner animation="border" size="sm" className="me-2" />}
              {toastStatus === ToastStatus.Success && <CheckCircleFill className="me-2 text-success" />}
              {toastStatus === ToastStatus.Error   && <XCircleFill     className="me-2 text-danger"  />}
              <strong className="me-auto">
              {toastStatus === ToastStatus.Loading ? 'Loading...'
                  : toastStatus === ToastStatus.Success ? ToastStatus.Success
                  : ToastStatus.Error}
              </strong>
          </Toast.Header>
          <Toast.Body>
              {toastMessage}
          </Toast.Body>
          </Toast>
        </>
      )}

      {/* Show error message if there was an error */}
      {error && !loading && !showToast && (
      <p
        style={{
          color: "white", // White text color for better contrast
          backgroundColor: "red", // Red background to highlight the error
          padding: "20px", // Padding to make the text more readable
          borderRadius: "8px", // Rounded corners for a smooth look
          fontSize: "18px", // Larger font size to grab attention
          fontWeight: "bold", // Bold text for better emphasis
          position: "fixed", // Fixed positioning to center it on the page
          top: "50%", // Center vertically
          left: "50%", // Center horizontally
          transform: "translate(-50%, -50%)", // Adjust for exact centering
          zIndex: 9999, // Ensure it's on top of other elements
          textAlign: "center", // Center the text inside the element
          width: "auto", // Auto width for text content
          maxWidth: "80%", // Max width to avoid overflowing on large screens
        }}
      >
        {error}
      </p>
    )}

      {/* Display CombinedHistoryUI if the data is successfully fetched */}
      {apiResponse && !loading && !error && apiResponse.data && (
        <CombinedHistoryUI history={apiResponse.data as CombinedHistory} packageId={packageKey}/>
      )}
    </>
  );
};

export default TracingPage;
