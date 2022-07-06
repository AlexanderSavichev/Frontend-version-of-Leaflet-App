import * as React from 'react';
import { useState, useEffect } from 'react'
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


    useEffect(
        ()=>{
    fetch("http://localhost:8080/mapModel/showPositions")
    .then(res=>res.json())
    .then((result)=>{
      setTasks(result);
      for (const item of result){
        var LPopup = L.popup().setContent(item.description);
        L.marker([item.lat, item.lng])
        .bindPopup(LPopup)
        .addTo(map);
      }
    }
  )
}
,[])


    const [position, setPosition] = useState(null)
    const [description, setDescription]=React.useState('')
    const [marker, setMarker] = useState(null)
    const [tasks, setTasks]=React.useState([])
    const handleClick=()=>{
        const { lat, lng } = position;
        let coord = {lat, lng, description};
        console.log("handleClick() " + JSON.stringify(coord))
        fetch("http://localhost:8080/mapModel/add",{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(coord)
        }).then(()=>{
            console.log("New task added", coord)
            setTasks([...tasks,coord]);
              fetch("http://localhost:8080/mapModel/showPositions")
              .then(res=>res.json())
              .then((result)=>{
                setTasks(result);
                for (const item of result){
                    var LPopup = L.popup().setContent(item.description);
                  L.marker([item.lat, item.lng])
                  .bindPopup(LPopup)
                  .addTo(map);
                }
              }
            )
        })
    }
    const map = useMapEvents({
        click(e) {
            console.log("click()" + e)
            console.log("coord = " + JSON.stringify(position))
            if (position != null) {
                // remove existing marker
                marker.setLatLng(e.latlng)
            } else {
                let m = L.marker(e.latlng)
                    .addTo(map);
                setMarker(m)
            }
            setPosition(e.latlng)
        }
    })
    return position === null ? null : (
        <Marker position={position}>
            console.log(position);
            <Popup><input id="time" type="text" placeholder="Enter something" value={description}
      onChange={(e)=>setDescription(e.target.value)}/>
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