export const slet = (payload) =>{
  return (dispatch, getState, {getFirebase, getFirestore}) =>{
    const firestore = getFirestore();
      firestore.collection(payload.type).doc(payload.target).delete().then(()=>{
        dispatch({
          type: "DELETE_TRAINNING_SUCCESS"
        });
    }).catch((error)=>{
      dispatch({
        type: "DELETE_TRAINNING_ERROR",
        error: error,
        msg: error.message,
      });
    })
  }
}

export const register = (payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection(payload.type)
      .doc(payload.id+": "+firestore.Timestamp.now())
      .set({
        exercises:payload.ex,
        date: firestore.Timestamp.now(),
        reps:payload.reps,
        owner: payload.uid,
        type: payload.type
      })
      .then((res) => {
        dispatch({
          type: "TRAINING_LOG_SUCCESS",
        });
      })
      .catch((error) => {
        dispatch({
          type: "TRAINING_LOG_ERROR",
          error: error,
          msg: error.message,
        });
      });
  };
};