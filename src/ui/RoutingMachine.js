import {useEffect} from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import {useMap} from "react-leaflet";
import {useSelector} from "react-redux";
import point from "../asset/Icons/point.png";

L.Marker.prototype.options.icon = L.icon({
    iconUrl: point,
    iconSize: 40
});

export const RoutingMachine = () => {

    const map = useMap();
    const startPath = useSelector(state => state.createRoute.startPath)
    const endPath = useSelector(state => state.createRoute.endPath)

    useEffect(() => {
        if (!map) return;

        const routingControl = L.Routing.control({
            waypoints: [L.latLng(startPath.latitude, startPath.longitude), L.latLng(endPath.latitude, endPath.longitude)],
            routeWhileDragging: true,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            language: 'ru',
        }).addTo(map);

        return () => map.removeControl(routingControl);
    }, [map, startPath, endPath]);

    return null
}