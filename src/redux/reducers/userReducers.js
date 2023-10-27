const initData={
    users: [],
    isloading: false
};
const userReducer = ( state = initData, {type, payload})=>{
    switch(type){
        case 'GET_USER':
            return {
                ...state,
                isloading : true
            };
        case 'GET_USER_SUCCESS':
            return{
                ...state,
                users: payload,
                isloading: true
            };
        default:
            return state;
    }
};

export default userReducer;