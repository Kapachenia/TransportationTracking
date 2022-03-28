import {applyMiddleware, combineReducers, createStore} from "redux";
import {createRoute} from "./createRoute";
import createSagaMiddleware from 'redux-saga';
import {watcher} from "./saga/createRoute";

const sagaMiddleware = createSagaMiddleware()
const rootReducer = combineReducers({
    createRoute: createRoute,
})

export const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(watcher)