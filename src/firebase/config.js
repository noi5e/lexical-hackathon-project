import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAI62WrLmwSGMGM_u7wll8bc_lQvd5ZP4o",
  authDomain: "mlh-hackathon1-67ffb.firebaseapp.com",
  projectId: "mlh-hackathon1-67ffb",
  storageBucket: "mlh-hackathon1-67ffb.appspot.com",
  messagingSenderId: "739505221602",
  appId: "1:739505221602:web:8c76c217ad82299122d3bb",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init services
const projectFirestore = firebase.firestore();
const projectStorage = firebase.storage();

// timestamp
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectStorage, timestamp };
