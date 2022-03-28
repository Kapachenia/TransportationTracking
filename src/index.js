import React, {StrictMode} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {HashRouter} from "react-router-dom";
import {store} from "./bll/store"
import {App} from "./ui/App";

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <HashRouter basename={'TransportationTracking'}>
            <Provider store={store}>
                <App/>
            </Provider>
        </HashRouter>
    </StrictMode>,
    rootElement
);