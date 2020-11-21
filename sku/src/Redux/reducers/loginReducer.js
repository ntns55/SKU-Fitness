const initState = {
    authError: null,
  };
  
  const loginReducer = (state = initState, action) => {
    switch (action.type) {
      case "SIGNUP_SUCCESS":
        state = { ...state, authError: null };
        break;
      case "SIGNIN_SUCCESS":
        state = { ...state, authError: null };
        break;
      case "SIGNOUT_SUCCESS":
        state = { ...state, authError: null };
        break;
      case "SIGNOUT_ERROR":
      case "SIGNIN_ERROR":
      case "SIGNUP_ERROR":
        console.log("Error", action.error);
        state = { ...state, authError: action.error.message };
        break;
      default:
    }
    return state;
  };
  
  export default loginReducer;
  