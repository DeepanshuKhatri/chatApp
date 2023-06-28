import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCOJCGEftffzLM_IaAO_UyiojzdjBIasG0",
  authDomain: "react-chat-ce935.firebaseapp.com",
  projectId: "react-chat-ce935",
  storageBucket: "react-chat-ce935.appspot.com",
  messagingSenderId: "447341915733",
  appId: "1:447341915733:web:9b395e338a34216fdeeedc",
  measurementId: "G-5ZN2911EP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);