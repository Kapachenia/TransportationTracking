export const SET_EDITING_KEY = "SET-EDITING-KEY";
export const SET_START_POINT = "SET-START-POINT";
export const SET_END_POINT = "SET-END-POINT";
export const SET_START_PATH = "SET-START-PATH";
export const SET_END_PATH = "SET-END-PATH";

const InitialState = {
    selectedPath: 0,
    startPath: {latitude: null, longitude: null},
    endPath: {latitude: null, longitude: null},
    editingKey: 0,
    routs: [
        {id: 1, name: 'Гусь-Железный', waypoints: {latitude: 55.05, longitude: 41.15}},
        {id: 2, name: 'Касимов', waypoints: {latitude: 54.93, longitude: 41.39}},
        {id: 3, name: 'Тверь', waypoints: {latitude: 56.85, longitude: 35.91}},
        {id: 4, name: 'Москва', waypoints: {latitude: 55.75, longitude: 37.62}},
        {id: 5, name: 'Вязники', waypoints: {latitude: 56.24, longitude: 42.15}},
        {id: 6, name: 'Кастрома', waypoints: {latitude: 57.76, longitude: 40.92}},
        {id: 7, name: 'Ярославль', waypoints: {latitude: 57.62, longitude: 39.89}},
        {id: 8, name: 'Лукоянов', waypoints: {latitude: 55.03, longitude: 44.49}},
        {id: 9, name: 'Рязань', waypoints: {latitude: 54.62, longitude: 39.74}},
        {id: 10, name: 'Ковров', waypoints: {latitude: 56.36, longitude: 41.31}},
    ],
    route: [
        {key: 1, name: '1', start: 'Гусь-Железный', end: 'Касимов'},
        {key: 2, name: '2', start: 'Тверь', end: 'Москва'},
        {key: 3, name: '3', start: 'Вязники', end: 'Кастрома'},
        {key: 4, name: '4', start: 'Ярославль', end: 'Лукоянов'},
        {key: 5, name: '5', start: 'Рязань', end: 'Ковров'},
        {key: 6, name: '6', start: 'Касимов', end: 'Гусь-Железный'},
        {key: 7, name: '7', start: 'Москва', end: 'Вязники'},
        {key: 8, name: '8', start: 'Ярославль', end: 'Кастрома'},
        {key: 9, name: '9', start: 'Вязники', end: 'Кастрома'},
        {key: 10, name: '10', start: 'Ковров', end: 'Рязань'},
    ]
}

export const createRoute = (state = InitialState, action) => {
    switch (action.type) {
        case SET_EDITING_KEY:
            return {...state, editingKey: action.editingKey}
        case SET_START_POINT:
            return {
                ...state,
                route: state.route.map(m => m.key === state.editingKey ? {...m, start: action.startPath} : m)
            }
        case SET_END_POINT:
            return {
                ...state,
                route: state.route.map(m => m.key === state.editingKey ? {...m, end: action.endPath} : m)
            }
        case SET_START_PATH:
            return {...state, startPath: action.startPath}
        case SET_END_PATH:
            return {...state, endPath: action.endPath}
        default:
            return state
    }
}

export const setEditingKeyRow = (editingKey) => {
    return {type: SET_EDITING_KEY, editingKey}
}
export const setStartPoint = (startPath, id) => {
    return {type: SET_START_POINT, startPath, id}
}
export const setEndPoint = (endPath, id) => {
    return {type: SET_END_POINT, endPath, id}
}
export const setStartPath = (startPath) => {
    return {type: SET_START_PATH, startPath}
}
export const setEndPath = (endPath) => {
    return {type: SET_END_PATH, endPath}
}