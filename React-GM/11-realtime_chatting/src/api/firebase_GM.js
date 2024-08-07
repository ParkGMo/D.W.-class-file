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
  onSnapshot,
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

async function addDatas(collectionName, addObj) {
  await addDoc(getCollection(collectionName), addObj);
}

async function getRealTimeMessages(collectionName, setData) {
  const collect = collection(db, collectionName);
  const q = query(collect, orderBy("createdAt"), limit(100));
  const unsubscribe = onSnapshot(q, (snapshot) => {
    const resultData = snapshot.docs.map((doc) => doc.data());
    setData(resultData);
  });
  return unsubscribe;
}
function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [], limits } = queryOption;
  const collect = getCollection(collectionName);
  let q = query(collect);
  // where 조건
  conditions.forEach((condition) => {
    q = query(q, where(condition.field, condition.operator, condition.value));
  });
  // orderBy 조건
  orderBys.forEach((order) => {
    q = query(q, orderBy(order.field, order.direction || "asc"));
  });
  // limit 조건
  q = query(q, limit(limits));

  return q;
}
export { db, getUserAuth, addDatas, getRealTimeMessages, getQuery };
