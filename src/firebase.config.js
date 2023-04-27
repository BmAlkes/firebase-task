import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgl7ze_TVwuhqPHPo0WFFBdenvEisXf5w",
  authDomain: "curso-ab61f.firebaseapp.com",
  projectId: "curso-ab61f",
  storageBucket: "curso-ab61f.appspot.com",
  messagingSenderId: "576253622026",
  appId: "1:576253622026:web:46971a45fdd0915e7b6cf3",
};

const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
