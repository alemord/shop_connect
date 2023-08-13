import React from 'react';
import QRCode from 'qrcode.react';

function OfferDetails({ retailer, discount }) {
  return (
    <div className="offer-details">
      <h2>Offer Details</h2>
      <div className="offer-card">
        <h3>{retailer.name}</h3>
        <p>{discount}</p>
        <p>Show this QR code to the retailer to redeem the offer:</p>
        <QRCode value={`${retailer.id}-${discount}`} />
      </div>
    </div>
  );
}

export default OfferDetails;
