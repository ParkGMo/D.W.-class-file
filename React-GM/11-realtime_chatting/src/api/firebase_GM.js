import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
  getDoc,
  updateDoc,
  query,
  orderBy,
  limit,
  startAfter,
  where,
} from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBKy0K76QZtUEPWU-xaMniCqUUpEKvTApw",
  authDomain: "chatting-gm.firebaseapp.com",
  projectId: "chatting-gm",
  storageBucket: "chatting-gm.appspot.com",
  messagingSenderId: "732957215711",
  appId: "1:732957215711:web:ec53595d7e93728c31926a",
  measurementId: "G-FKNDHERX40",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(collectionName) {
  return collection(db, collectionName);
}
function getUserAuth() {
  return auth;
}

export { getUserAuth };
