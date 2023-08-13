import React, { useState, useEffect } from "react";
import "./App.css";
import OfferDetails from "./OfferDetails";

const retailers = [
  { id: 1, name: "Fashion Outlet", location: [34.0522, -118.2437] },
  { id: 2, name: "Tech Emporium", location: [40.7128, -74.006] },
  { id: 3, name: "Cosmetics Corner", location: [51.5074, -0.1278] },
  { id: 4, name: "Book Haven", location: [48.8566, 2.3522] },
  { id: 5, name: "Gourmet Delights", location: [37.7749, -122.4194] },
  { id: 6, name: "Sports Gear Store", location: [39.9042, 116.4074] },
  { id: 7, name: "Home Decor Haven", location: [34.0522, -118.2437] },
  { id: 8, name: "Pet Supplies Paradise", location: [51.5074, -0.1278] },
  { id: 9, name: "Music Store", location: [52.52, 13.405] },
  { id: 10, name: "Fitness Gear Shop", location: [37.7749, -122.4194] },
  { id: 11, name: "Art Supplies Emporium", location: [40.7128, -74.006] },
  { id: 12, name: "Outdoor Adventure Store", location: [35.6895, 139.6917] },
  // Add more retailers here
];

function App() {
  const [userLocation, setUserLocation] = useState(null);
  const [activeOffers, setActiveOffers] = useState([]);

  useEffect(() => {
    // Simulate getting user's location
    const fakeUserLocation = [34.0522, -118.2437];
    setUserLocation(fakeUserLocation);

    // Simulate active offers with random discounts
    const discounts = [
      "20% off all items",
      "Buy one, get one free",
      "50% off selected items",
      "Free gift with purchase",
      "10% off your next visit",
      // Add more discount options here
    ];

    const offers = retailers.map((retailer) => ({
      retailerId: retailer.id,
      discount: getRandomDiscount(discounts),
    }));
    setActiveOffers(offers);
  }, []);

  const getRandomDiscount = (discounts) => {
    const randomIndex = Math.floor(Math.random() * discounts.length);
    return discounts[randomIndex];
  };

  const calculateDistance = (loc1, loc2) => {
    const radius = 6371; // Earth's radius in kilometers
    const [lat1, lon1] = loc1;
    const [lat2, lon2] = loc2;

    const dlat = Math.radians(lat2 - lat1);
    const dlon = Math.radians(lon2 - lon1);
    const a =
      Math.sin(dlat / 2) * Math.sin(dlat / 2) +
      Math.cos(Math.radians(lat1)) *
        Math.cos(Math.radians(lat2)) *
        Math.sin(dlon / 2) *
        Math.sin(dlon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = radius * c;

    return distance;
  };

  Math.radians = (degrees) => {
    return (degrees * Math.PI) / 180;
  };

  const handleAcceptOffer = (retailerId) => {
    console.log(`Accepted offer from retailer ${retailerId}`);
    // Implement logic here
  };

  const handleDeclineOffer = (retailerId) => {
    console.log(`Declined offer from retailer ${retailerId}`);
    // Implement logic here
  };
  const renderMap = () => {
    if (!userLocation) return null;

    const mapOptions = {
      center: userLocation,
      zoom: 13,
    };

    const map = new window.google.maps.Map(
      document.getElementById("map"),
      mapOptions
    );

    // Mark user's location on the map
    new window.google.maps.Marker({
      position: userLocation,
      map: map,
      title: "Your Location",
    });
  };
  return (
    <div className="App">
      <h1>OfferNest</h1>
      {userLocation ? (
        <div>
          <p>
            Your current location: {userLocation[0]}, {userLocation[1]}
          </p>
          <h2>Active Offers</h2>
          {activeOffers.length > 0 ? (
            <div className="offer-list">
              {activeOffers.map((offer) => {
                const retailer = retailers.find(
                  (retailer) => retailer.id === offer.retailerId
                );
                const distance = calculateDistance(
                  userLocation,
                  retailer.location
                ).toFixed(2);
                return (
                  <div key={offer.retailerId} className="offer-card">
                    <h3>{retailer.name}</h3>
                    <p>{offer.discount}</p>
                    <p>Distance: {distance} km</p>
                    <button onClick={() => handleAcceptOffer(offer.retailerId)}>
                      Accept
                    </button>
                    <button
                      onClick={() => handleDeclineOffer(offer.retailerId)}
                    >
                      Decline
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <p>No active offers nearby.</p>
          )}
        </div>
      ) : (
        <p>Loading user location...</p>
      )}
    </div>
  );
}

export default App;
