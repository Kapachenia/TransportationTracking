import React from "react";
import {MapContainer, TileLayer} from "react-leaflet";
import {RoutingMachine} from "./RoutingMachine";
import useWindowDimensions from "../hooks/useWindowDimensions/useWindowDimensions";
import "leaflet/dist/leaflet.css";
import "../styles.css";

export const MapComponent = (props) => {

    const position = [55.75, 37.61];
    const {width} = useWindowDimensions();
    const widthR = (width / 2) / width * 100
    const result = props.position / width * 100
    let setWidthR
    result === 0 ? setWidthR = 0 : setWidthR = 50 - result

    return (
        <div className={'wrapperMap'} style={{width: `${widthR + setWidthR}%`}}>
            <MapContainer className={'wrapperMap'} center={position} zoom={10} style={{height: "100vh", width: `100%`}}>
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <RoutingMachine/>
            </MapContainer>
        </div>
    )
}