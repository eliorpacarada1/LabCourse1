import { MapContainer, TileLayer } from "react-leaflet";

export const Map = ({ children }) => {
  const position = [42.6529, 21.1655];
  return (

    <MapContainer
      center={position}
      zoom={14}
      maxZoom={18}
      scrollWheelZoom={true}
      className="main-map"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://api.mapbox.com/styles/v1/shabanlushaj/ckmeanqkvmmi517ptw0vfzpxs/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2hhYmFubHVzaGFqIiwiYSI6ImNrbWVhZGI0NTJ0ODgyeGtuM2VndGd4NzIifQ.mrX0SlTqCXFYBbsiQQLXag"
      />
      {children}
    </MapContainer >
  )
}
