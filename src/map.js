import React from "react";
import L, { Layer } from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import './map.css';

L.Icon.Default.imagePath = "https://unpkg.com/leaflet@1.5.0/dist/images/";



class MapComponent extends React.Component  {
    

    
  state = {
    lat: 59.9311,
    lng: 30.3609,
    zoom: 12
  };

 
  //marker = new MapContainer.Marker({
    //position: this.uluru,
    //map: this.state,
    //draggable: true
//});

  render() {
    var center = [this.state.lat, this.state.lng];

    return (
      <MapContainer zoom={this.state.zoom} center={center}>
        <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        

        <Marker position={center}>
          <Popup>Попап</Popup>
        </Marker>

        
      </MapContainer>

    );
  }
};

export default MapComponent;