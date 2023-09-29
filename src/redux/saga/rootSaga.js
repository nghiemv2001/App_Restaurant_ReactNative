import {all, takeEvery} from 'redux-saga/effects'
import appSaga from './appSaga'

const sagas = function*(){
    yield all([takeEvery('CHANGE_TABLE_MODE', appSaga)])
};
export default sagas;