const initData={
    bills: [],
    isloading: false
};
const billReducer = ( state = initData, {type, payload})=>{
    switch(type){
        case 'GET_BILLS':
            return {
                ...state,
                isloading : true
            };
        case 'GET_BILLS_SUCCESS':
            return{
                ...state,
                bills: payload,
                isloading: true
            };
        default:
            return state;
    }
};

export default billReducer;