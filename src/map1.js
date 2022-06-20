import { useState } from 'react'
import {MapContainer,Marker,Popup,TileLayer,useMapEvents} from 'react-leaflet'
import L from 'leaflet';
import './map.css';

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";
var popup = L.popup();



function LocationMarker() {
    

    
  const [position, setPosition] = useState(null)
  const map = useMapEvents({
    
    click(e) {
      //map.locate()
      const { lat, lng } = e.latlng;
  console.log(lat, lng);
  L.marker(e.latlng).addTo(map);
    },
  })

}

function MapComponent() {
  return (
    <MapContainer center={{ lat: 59.9311, lng:30.3609 }} zoom={12}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker />
    </MapContainer>
  )
}

  export default MapComponent;