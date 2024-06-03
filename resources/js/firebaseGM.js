import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
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
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAaOQUIim8drumZwZtPgJ3hcm2_p6Q0fcM",
  authDomain: "myproject-gm.firebaseapp.com",
  projectId: "myproject-gm",
  storageBucket: "myproject-gm.appspot.com",
  messagingSenderId: "901705761053",
  appId: "1:901705761053:web:fcfe921ebe8cee594761f4",
  measurementId: "G-CZ4GP3K0KL",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);

  return snapshot;
}

async function addDatas(collectionName, dataObj) {
  //   문서 ID 수동

  try {
    // const saveDoc = doc(db, 컬렉션명, 문서ID)
    const saveDoc = await doc(db, collectionName, `3`);
    console.log(`doc() 결과 : ${saveDoc}`);
    const saveResult = await setDoc(saveDoc, dataObj);
    console.log(`setDoc() 결과 : ${saveResult}`);

    // 문서 ID 자동
    const collect = await collection(db, collectionName);
    await addDoc(collect, dataObj);

    return true;
  } catch (error) {
    return false;
  } finally {
  }
}

async function deleteDatas(collectionName, docId) {
  const docRef = await doc(db, collectionName, docId);
  // deleteDoc(삭제할 문서);
  await deleteDoc(docRef);
}

async function updateDatas(collectionName, docId, updateInfoObj) {
  // doc(db, 컬렉션명, 문서ID);
  const docRef = await doc(db, collectionName, docId);
  // getDocs(문서레퍼런스);
  // const docData = await getDocs(docRef);
  // updateDoc(문서데이터, 수정할정보);
  updateDoc(docRef, updateInfoObj);
}

export { db, getDatas, addDatas, deleteDatas, updateDatas };
