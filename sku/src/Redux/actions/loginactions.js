export const signUp = (payload) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firebase = getFirebase();
      const firestore = getFirestore();
      console.log(payload)
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        .then((res) => {
          return firestore
            .collection("Profile")
            .doc(res.user.uid)
            .set({
              vaegt:payload.vægt,
              navn:payload.navn,
              email:payload.email
            })
            .then(dispatch({ type: "SIGNUP_SUCCESS" }))
            .catch((error) => {
              dispatch({ type: "SIGNUP_ERROR", error });
            });
        })
        .catch((error) => {
          dispatch({ type: "SIGNUP_ERROR", error });
        });
    };
  };
  
  export const signIn = (payload) => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      firebase
        .auth()
        .signInWithEmailAndPassword(payload.email, payload.password)
        .then(dispatch({ type: "SIGNIN_SUCCESS" }))
        .catch((error) => {
          dispatch({ type: "SIGNIN_ERROR", error });
        });
    };
  };
  
  export const signOut = () => {
    return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      firebase
        .auth()
        .signOut()
        .then(dispatch({ type: "SIGNOUT_SUCCESS" }))
        .catch((error) => {
          dispatch({ type: "SIGNOUT_ERROR", error });
        });
    };
  };
  