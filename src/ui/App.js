import React, {useCallback, useState} from "react";
import "../styles.css";
import "leaflet/dist/leaflet.css";
import {MapComponent} from "./MapComponent";
import {EditableTable} from "./EditableTable";


export const App = () => {

    const [position, setPosition] = useState({x: 0, y: 0});

    const setFromEvent = useCallback((e) => {
        if (e.clientX > 300) {
            setPosition({x: e.clientX, y: e.clientY})
        }
    }, [])

    const mouseHandlerDown = () => {
        window.addEventListener("mousemove", setFromEvent);
    }

    const mouseHandlerUp = () => {
        window.removeEventListener("mousemove", setFromEvent);
    }

    return (
        <div className={'wrapperApp'} onMouseUp={mouseHandlerUp}>
            <EditableTable position={position.x}/>
            <button className={'button'} onMouseDown={mouseHandlerDown}/>
            <MapComponent position={position.x}/>
        </div>
    )
}
