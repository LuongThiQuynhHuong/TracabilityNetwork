import TracingHeader from "@components/Header/TracingHeader"
import { useLocation } from "react-router-dom";

const TracingPage : React.FC = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
  
    const packageKey = queryParams.get('packageKey') || 'default';
  return (
    <>
      <TracingHeader />
      <h2>Package Key : {packageKey}</h2>
    </>
  )
}

export default TracingPage