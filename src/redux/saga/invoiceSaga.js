import { call, put } from "redux-saga/effects";
import getInvoices from "../../actions/getInvoices";

export default function* (action){
    const invoices = yield call(getInvoices)
    yield put({type:'GET_INVOICES_SUCCESS', payload:invoices})
}