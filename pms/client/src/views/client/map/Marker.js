import { Marker, Popup } from "react-leaflet";
import L from 'leaflet';

export const GreenMarker = ({ latitude, longitude, city, section, freeSpots }) => {
    let arr = [latitude, longitude]

    var greenIcon = new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      });     
      
    return (
      <Marker position={arr} icon={greenIcon}>
        <Popup>
          {section}, {city}
          <br />
          There are {freeSpots} free parking spots.
        </Popup>
      </Marker>
    );
}

export const RedMarker = ({ latitude, longitude, city, section, freeSpots }) => {
  let arr = [latitude, longitude]

    var redIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
  return (
    <Marker position={arr} icon={redIcon}>
      <Popup>
        {section}, {city}
        <br />
        There are {freeSpots} free parking spots.
      </Popup>
    </Marker>
  );
}

export const YellowMarker = ({ latitude, longitude, city, section, freeSpots }) => {
  let arr = [latitude, longitude]

    var yellowIcon = new L.Icon({
      iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    
  return (
    <Marker position={arr} icon={yellowIcon}>
      <Popup>
        {section}, {city}
        <br />
        There are {freeSpots} free parking spots.
      </Popup>
    </Marker>
  );
}