export const setCurrentName = (name) => ({
    type: 'SET_CURRENT_NAME',
    payload: name,
  });
  
  const initialState = {
    currentName: null,
  };
  
  export const nameReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CURRENT_NAME':
        return {
          ...state,
          currentName: action.payload,
        };
      default:
        return state;
    }
  };