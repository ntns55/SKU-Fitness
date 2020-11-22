const initState = {
    authError: null,
  };
  
  const loginReducer = (state = initState, action) => {
    switch (action.type) {
        case "TRAINING_LOG_SUCCESS":
            state = { ...state, authError: null };
            break;   
        case "TRAINING_LOG_ERROR":
            console.log("Error", action.error);
            state = { ...state, authError: action.error.message };
            break;
      default:
    }
    return state;
  };
  
  export default loginReducer;
  