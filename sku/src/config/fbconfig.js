import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

//Initialize Firebase

const config = {
    apiKey: "AIzaSyDzD8-DvYt-vl12PraMvzWMBguVFNBTwQg",
    authDomain: "sku-fitness.firebaseapp.com",
    databaseURL: "https://sku-fitness.firebaseio.com",
    projectId: "sku-fitness",
    storageBucket: "sku-fitness.appspot.com",
    messagingSenderId: "871152032639",
    appId: "1:871152032639:web:421b62ce4be20516d1184a",
    measurementId: "G-HC4CPDBGW2"
  };

firebase.initializeApp(config);
firebase.firestore().settings({});

export default firebase;
