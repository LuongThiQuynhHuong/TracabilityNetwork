import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { APP_PORT, LOCAL_IP, TRACING_ENDPOINT } from '@utils/ConfigConstant';
import { AppBodyProps } from '@utils/BaseIntefaces';

interface GenerateQRCodeProps extends AppBodyProps {
  packageKey: string;
}

const GenerateQRCode: React.FC<GenerateQRCodeProps> = ({ packageKey, organization }) => {
  const url = `http://${LOCAL_IP}:${APP_PORT}${TRACING_ENDPOINT}?organization=${organization}&packageKey=${packageKey}`;

  const handleLinkClick = () => {
    const queryLocalUrl = `http://localhost:${APP_PORT}${TRACING_ENDPOINT}?organization=${organization}&packageKey=${packageKey}`
    window.open(queryLocalUrl, '_blank');
  };

  return (
    <div>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
      Click <span style={{ color: 'blue', textDecoration: 'underline', cursor: 'pointer' }} onClick={handleLinkClick}>here</span> or scan this QR code to visit the tracing page on your phone:
      </p>
      <QRCodeSVG value={url} size={256} level="H" />
    </div>
  );
};

export default GenerateQRCode;
