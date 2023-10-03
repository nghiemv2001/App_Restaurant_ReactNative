import { call, put } from "redux-saga/effects";
import getTableList from "../../actions/getTableList";

export default function* (action){
    const tableList = yield call(getTableList)
    yield put({type:'GET_TABLE_LIST_SUCCESS', payload:tableList})
}