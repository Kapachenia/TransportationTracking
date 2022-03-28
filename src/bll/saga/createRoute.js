import {put, take, takeEvery} from "redux-saga/effects";
import {
    SET_EDITING_KEY,
    SET_END_PATH,
    SET_END_POINT,
    SET_START_PATH,
    SET_START_POINT,
    setEditingKeyRow, setEndPath, setEndPoint, setStartPath, setStartPoint
} from "../createRoute";
import {api} from "../../api/api";


// export function* setEditingKeyRowWorker(payload) {
// console.log('rrr')
// console.log(payload.editingKey)
// yield put(setEditingKeyRow(payload.editingKey))
// }

export function* setStartPointWorker(payload) {
    // yield console.log(payload.startPath, payload.id)
    // yield put(setStartPoint(payload.startPath, payload.id))
}

export function* setEndPointWorker(endPath, id) {
    // yield put(setEndPoint(endPath, id))
}

export function* setStartPathWorker(payload) {
    // console.log(payload)
    // yield console.log(payload.startPath)
    const startPathEdit = api.routs.find((f) => f.name === payload.startPath)
    // console.log(startPathEdit.waypoints)
    if (startPathEdit) {
        yield put(setStartPath(startPathEdit?.waypoints))
    }
}

export function* setEndPathWorker(payload) {
    // yield console.log(payload)
    let endPathEdit = api.routs.find((f) => f.name === payload.endPath)
    // console.log(endPathEdit.waypoints)
    if (endPathEdit) {
        yield put(setEndPath(endPathEdit?.waypoints))
    }
}

export function* watcher() {
    // yield takeEvery(SET_EDITING_KEY, setEditingKeyRowWorker)
    yield takeEvery(SET_START_POINT, setStartPointWorker)
    yield takeEvery(SET_END_POINT, setEndPointWorker)
    yield takeEvery(SET_START_PATH, setStartPathWorker)
    yield takeEvery(SET_END_PATH, setEndPathWorker)
}