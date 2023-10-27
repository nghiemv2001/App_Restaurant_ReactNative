const initData={
    categorys: [],
    isloading: false
};
const categoryReducer = ( state = initData, {type, payload})=>{
    switch(type){
        case 'GET_CATEGORY':
            return {
                ...state,
                isloading : true
            };
        case 'GET_CATEGORY_SUCCESS':
            return{
                ...state,
                categorys: payload,
                isloading: true
            };
        default:
            return state;
    }
};

export default categoryReducer;