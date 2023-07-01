
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDzBKrV8kgOON3UNaEpSTk9Qpz2jT05Hhg",
  authDomain: "mealapi-c70e1.firebaseapp.com",
  projectId: "mealapi-c70e1",
  storageBucket: "mealapi-c70e1.appspot.com",
  messagingSenderId: "86827614978",
  appId: "1:86827614978:web:ea6a1ef8cf700655f4b81b",
  measurementId: "G-KM0Q373G5X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const db = getFirestore(app)