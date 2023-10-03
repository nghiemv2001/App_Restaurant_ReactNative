import {all, takeEvery} from 'redux-saga/effects'
import tableSaga from './tableSaga'

const sagas = function*(){
    console.log("2")
    yield all([takeEvery('GET_TABLE_LIST', tableSaga)])
};
export default sagas;