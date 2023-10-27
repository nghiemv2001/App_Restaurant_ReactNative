const initData={
    invoices: [],
    isloading: false
};
const invoiceReducer = ( state = initData, {type, payload})=>{
    switch(type){
        case 'GET_INVOICES':
            return {
                ...state,
                isloading : true
            };
        case 'GET_INVOICES_SUCCESS':
            return{
                ...state,
                invoices: payload,
                isloading: true
            };
        default:
            return state;
    }
};

export default invoiceReducer;