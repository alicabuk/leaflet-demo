import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkersTable from "./components/MarkersTable";
import { useState } from "react";

function App() {
  const [marker, setMarker] = useState(null);

  const handleMarkerAdd = (latLng) => {
    setMarker(latLng);
  };

  const handleMarkerRemove = () => {
    setMarker(null);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
      }}
    >
      <MapContainer
        style={{ width: "100%", height: "100%" }}
        center={[51.505, -0.09]}
        zoom={13}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <div className="leaflet-top leaflet-right">
          <div className="leaflet-control leaflet-bar">
            <div className="side-panel">
              <MarkersTable
                onMarkerAdd={handleMarkerAdd}
                onMarkerRemove={handleMarkerRemove}
              />
            </div>
          </div>
        </div>
        {marker && (
          <Marker position={[marker.lat, marker.lng]}></Marker>
        )}
      </MapContainer>
    </div>
  );
}

export default App;
