import {all} from "redux-saga/effects";

export function* workerSaga() {

}


export function* watcherSaga() {

}

export function* rootWatcher() {

    yield watcherSaga()
}