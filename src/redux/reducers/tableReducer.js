const initData={
    tableList: [],
    isloading: false
};
const tableReducer = ( state = initData, {type, payload})=>{
    switch(type){
        case 'GET_TABLE_LIST':
            return {
                ...state,
                isloading : true
            };
        case 'GET_TABLE_LIST_SUCCESS':
            return{
                ...state,
                tableList: payload,
                isloading: true
            };
        default:
            return state;
    }
};

export default tableReducer;