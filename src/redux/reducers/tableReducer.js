const initData={
    darkMode : false,
    isloading: false
};
const tableReducer = ( state = initData, {type, payload})=>{
    switch(type){
        case 'CHANGE_TABLE_MODE':
            return {
                ...state,
                isloading : true
            };

        case 'CHANGE_TABLE_SUCCESS':
            return{
                ...state,
                isloading: false,
                darkMode: payload.darkMode
            };
        default:
            return state;
    }
};

export default tableReducer;