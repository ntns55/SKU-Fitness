import { combineReducers } from "redux";
import { firestoreReducer } from "redux-firestore";
import { firebaseReducer } from "react-redux-firebase";
import LoginReducer from "./loginReducer";
import TrainingReducer from "./trainingReducer"

const rootReducer = combineReducers({
  firestore: firestoreReducer,
  firebase: firebaseReducer,
  loginReducer:LoginReducer,
  trainingReducer: TrainingReducer,
});

export default rootReducer;