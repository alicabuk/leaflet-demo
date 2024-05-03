import { useState } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import MarkersTable from "./components/MarkersTable";

function App() {
  const [marker, addMarker] = useState();

  const setMarker = (marker) => {
    console.log(marker);
    addMarker(marker);
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
              <MarkersTable addMarker={setMarker} />
            </div>
          </div>
        </div>
      </MapContainer>
    </div>
  );
}

export default App;
