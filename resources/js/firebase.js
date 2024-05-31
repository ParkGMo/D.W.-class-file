import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js';
import {
  getFirestore,
  getDocs,
  collection,
  setDoc,
  doc,
} from 'https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js';

const firebaseConfig = {
  apiKey: 'AIzaSyBvTXz44Ces9I6If9sAIKjBL26pvA0afMQ',
  authDomain: 'myproject-3ce22.firebaseapp.com',
  projectId: 'myproject-3ce22',
  storageBucket: 'myproject-3ce22.appspot.com',
  messagingSenderId: '593562857913',
  appId: '1:593562857913:web:a079c42f60c07e3f190668',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);

  return snapshot;
}

async function addDatas(collectionName, dataObj) {
  // 문서 ID 수동

  try {
    const saveDoc = await doc(db, collectionName, '3');
    console.log(`doc() 결과: ${saveDoc}`);
    const saveResult = await setDoc(saveDoc, dataObj);
    console.log(`setDoc() 결과: ${saveResult}`);
    return true;
  } catch (error) {
    return false;
  } 

}

export { db, getDatas, addDatas };
