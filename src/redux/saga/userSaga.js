import { call, put } from "redux-saga/effects";
import getUsers from "../../actions/getUsers";

export default function* (action){
    const users = yield call(getUsers)
    yield put({type:'GET_USER_SUCCESS', payload:users})
}