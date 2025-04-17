import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { APP_PORT, LOCAL_IP, TRACING_ENDPOINT } from '@utils/ConfigConstant';

interface GenerateQRCodeProps {
  packageKey: string;
}

const GenerateQRCode: React.FC<GenerateQRCodeProps> = ({ packageKey }) => {
  const url = `http://${LOCAL_IP}:${APP_PORT}${TRACING_ENDPOINT}?packageKey=${packageKey}`;

  return (
    <div>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>
      Scan this QR code to visit the tracing page on your phone:
      </p>
      <QRCodeSVG value={url} size={256} level="H" />
    </div>
  );
};

export default GenerateQRCode;
