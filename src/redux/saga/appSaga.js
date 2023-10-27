import { call, put } from "redux-saga/effects";

function* updateTable(darkMode){
    yield put({type: 'CHANGE_TABLE_SUCCESS', payload: action.payload})
}
function* updateBills(darkMode){
    yield put({type: 'CHANGE_BILLS_SUCCESS', payload: action.payload})
}
function* updateInvoices(darkMode){
    yield put({type: 'CHANGE_BILLS_SUCCESS', payload: action.payload})
}


export default function* (action){
    yield call(updateTable, action.payload.darkMode)
    yield call(updateBills, action.payload.darkMode)
    yield call(updateInvoices, action.payload.darkMode)
}