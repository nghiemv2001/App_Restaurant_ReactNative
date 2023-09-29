import { call, put } from "redux-saga/effects";

function* updateTable(darkMode){
    yield put({type: 'CHANGE_TABLE_SUCCESS', payload: action.payload})
}

export default function* (action){
    console.log('App Saga - Action:', action);
    yield call(updateTable, action.payload.darkMode)
}