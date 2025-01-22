// import { useNavigate } from "react-router";
import { useState } from "react";
import styles from "../styles/map.module.css";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from "react-leaflet";
import { useCities } from "../contexts/citiesContext";
import Emoji from "./Emoji";
import { useNavigate } from "react-router";

function Map() {
    const [centerPos, setCenterPos] = useState([23.259933, 77.412613]);
    const { cities } = useCities();

    return (
        <div className={styles.mapContainer}>
            <MapContainer
                className={styles.map}
                center={centerPos}
                zoom={5}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
                />

                <ListenMapClick />

                {cities.map(function (city) {
                    return (
                        <Marker
                            position={[city.position.lat, city.position.lng]}
                            key={city.id}
                        >
                            <Popup>
                                <span>
                                    <Emoji txt={city.emoji} />
                                    &nbsp;&nbsp;&nbsp;
                                    {city.cityName}
                                </span>
                            </Popup>
                        </Marker>
                    );
                })}
            </MapContainer>
        </div>
    );
}

function ListenMapClick() {
    const navigate = useNavigate();
    useMapEvents({
        click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
    });
}

export default Map;
