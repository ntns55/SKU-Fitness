export const register = (payload) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    firestore
      .collection(payload.type)
      .doc(payload.id+": "+firestore.Timestamp.now())
      .set({
        exercises:payload.ex,
        Date: firestore.Timestamp.now(),
        reps:payload.reps,
        owner: payload.uid,
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