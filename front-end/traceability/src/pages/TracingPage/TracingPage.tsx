import React, { useEffect, useState } from "react";
import TracingHeader from "@components/Header/TracingHeader";
import { useLocation } from "react-router-dom";
import { ResponseModel, testApiController } from "@services/APIController";

const TracingPage: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const packageKey = queryParams.get("packageKey") || "";
  const organization = queryParams.get("organization") || "";

  // State to manage the response from the API call
  const [apiResponse, setApiResponse] = useState<ResponseModel | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Define a function to call the API and handle the response
    const fetchApiData = async () => {
      setLoading(true);
      setError(null);

      console.log("Fetching data from API with packageKey:", packageKey, "and organization:", organization);

      try {
        const trace = {
          organization: organization,
          packageKey: packageKey,
          checkbool: true,
        };

        const response = await testApiController(trace, true);
        setApiResponse(response); // Store the API response
      } catch (error) {
        console.error("Error fetching data from API:", error);
        setError("Error fetching data from API."); // Handle the error
      } finally {
        setLoading(false); // End loading state
      }
    };

    // Call the fetchApiData function when the component mounts or packageKey changes
    fetchApiData();
  }, [packageKey, organization]); // Dependency array ensures it re-runs when `packageKey` or `organization` changes

  return (
    <>
      <TracingHeader />
      <h2>Package Key: {packageKey}</h2>
      
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {apiResponse && (
        <div>
          <h3>API Response:</h3>
          <pre>{JSON.stringify(apiResponse, null, 2)}</pre>
        </div>
      )}
    </>
  );
};

export default TracingPage;
