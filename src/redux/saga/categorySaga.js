import { call, put } from "redux-saga/effects";
import getCategory from "../../actions/getCategory";

export default function* (action){
    const category = yield call(getCategory)
    yield put({type:'GET_CATEGORY_SUCCESS', payload:category})
}