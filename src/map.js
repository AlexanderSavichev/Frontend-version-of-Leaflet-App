
import { useState } from 'react'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from 'react-leaflet'
import L from 'leaflet';
import './map.css';

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";
function LocationMarker() {
  const [position, setPosition] = useState(null)

  const handleClick=()=>{
    fetch("http://localhost:8080/mapModel/add",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(coord)
    }).then(()=>{
        console.log("New task added", coord)
        setPosition([...position,coord]);
    })
}


  const map = useMapEvents({
    click(e) {
      


      const { lat, lng } = e.latlng;
      const coord = {lat,lng};
      setPosition(e.latlng)
     // console.log(lat, lng);
  L.marker(e.latlng)
  //.bindPopup(textbox + '</br>' + template)
  .addTo(map);
    },
  })

  return position === null ? null : (
    <Marker position={position}>
      console.log(position);
      <Popup><input id="time" type="text" placeholder="Enter something" />
      <button  class="edit" id="buttonEdit" type="button" onClick={handleClick} >Submit</button>
      </Popup>
    </Marker>
  )
}

function EventsExample() {
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
export default EventsExample;