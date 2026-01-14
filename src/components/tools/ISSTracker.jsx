import React, { useState, useEffect } from 'react';

const ISSTracker = () => {
  const [issPosition, setIssPosition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState(null);

  useEffect(() => {
    fetchISSPosition();
    const interval = setInterval(fetchISSPosition, 5000); // Update every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchISSPosition = async () => {
    try {
      const response = await fetch('http://api.open-notify.org/iss-now.json');
      const data = await response.json();
      setIssPosition({
        lat: parseFloat(data.iss_position.latitude),
        lng: parseFloat(data.iss_position.longitude)
      });
      setLastUpdate(new Date());
      setLoading(false);
    } catch (error) {
      console.error('Error fetching ISS position:', error);
      setLoading(false);
    }
  };

  return (
    <div className="iss-tracker glass-effect p-6 max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 glow-effect text-center" style={{color: 'var(--neon-blue)'}}>
        🛸 ISS Live Tracker
      </h2>

      {loading ? (
        <div className="text-center">
          <div className="loading-spinner mx-auto mb-4"></div>
          <p>Locating ISS...</p>
        </div>
      ) : issPosition ? (
        <div className="iss-info">
          <div className="position-display glass-effect p-6 rounded-lg mb-6">
            <div className="text-center mb-4">
              <span className="text-6xl">🛰️</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center">
                <p className="text-sm opacity-60">Latitude</p>
                <p className="text-2xl font-bold" style={{color: 'var(--neon-green)'}}>
                  {issPosition.lat.toFixed(4)}°
                </p>
              </div>
              <div className="text-center">
                <p className="text-sm opacity-60">Longitude</p>
                <p className="text-2xl font-bold" style={{color: 'var(--neon-pink)'}}>
                  {issPosition.lng.toFixed(4)}°
                </p>
              </div>
            </div>
          </div>

          <div className="iss-facts glass-effect p-4 rounded-lg">
            <h3 className="font-semibold mb-2">ISS Quick Facts:</h3>
            <ul className="space-y-2 text-sm opacity-80">
              <li>• Speed / गति: 27,600 km/h</li>
              <li>• Altitude / ऊंचाई: ~408 km</li>
              <li>• Orbits per day / प्रतिदिन चक्कर: 15.54</li>
              <li>• Crew on board / चालक दल: 6-7 astronauts</li>
            </ul>
          </div>

          {lastUpdate && (
            <p className="text-xs text-center mt-4 opacity-60">
              Last updated: {lastUpdate.toLocaleTimeString()}
            </p>
          )}
        </div>
      ) : (
        <div className="text-center">
          <p>Unable to fetch ISS position. Please try again.</p>
        </div>
      )}
    </div>
  );
};

export default ISSTracker;
