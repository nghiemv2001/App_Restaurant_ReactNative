import {combineReducers} from 'redux'
import tableReducer from './tableReducer'
import billReducer from './billReducers'
import categoryReducer from './categoryReducer';
import invoiceReducer from './InvoicesReducer';
import userReducer from './userReducers';

const rootReducer = combineReducers({
    tableReducer,
    billReducer,
    categoryReducer,
    invoiceReducer,
    userReducer
  });
 export default rootReducer;