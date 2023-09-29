import {combineReducers} from 'redux'
import tableReducer from './tableReducer'


const rootReducer = combineReducers({
    tableReduce: tableReducer, // Make sure the key matches your state structure
    // Add other reducers here if needed
  });
 export default rootReducer;