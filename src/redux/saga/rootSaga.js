import {all, takeEvery} from 'redux-saga/effects'
import tableSaga from './tableSaga'
import billSaga from './billSaga';
import categorySaga from './categorySaga';
import invoiceSaga from './invoiceSaga';
import userSaga from './userSaga';

const sagas = function*(){
    yield all([takeEvery('GET_TABLE_LIST', tableSaga)])
    yield all([takeEvery('GET_BILLS', billSaga)])
    yield all([takeEvery('GET_CATEGORY', categorySaga)])
    yield all([takeEvery('GET_INVOICES', invoiceSaga)])
    yield all([takeEvery('GET_USER', userSaga)])
};
export default sagas;