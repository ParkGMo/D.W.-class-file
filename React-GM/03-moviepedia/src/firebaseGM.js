import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
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
} from "firebase/firestore";
// import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyBsMcx-bHZHSbVdt0YTi0YhbQgXjcqx29g",
  authDomain: "moviepedia-1571e.firebaseapp.com",
  projectId: "moviepedia-1571e",
  storageBucket: "moviepedia-1571e.appspot.com",
  messagingSenderId: "166513038812",
  appId: "1:166513038812:web:95505f62dfb752a7dfeb19",
  measurementId: "G-8B6MXJ5T0D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// const analytics = getAnalytics(app);

async function getDatas(collectionName) {
  const collect = await collection(db, collectionName);
  const snapshot = await getDocs(collect);
  // docId 넣고 배열로 나옴
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}

// 옵션에 따라 DB를 가져옴 (내림차순, 오름차순)
async function getDatasByOrder(collectionName, options) {
  const collect = await collection(db, collectionName);
  // const q = query(컬렉션정보, 조건1, 조건2, 조건3 ...), asc: 오름차순,  decs: 내림차순
  const q = query(collect, orderBy(options.order, "desc"));
  const snapshot = await getDocs(q);
  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return resultData;
}
// 옵션에 따라 제한적인 수의 DB를 가져옴
async function getDatasByOrderLimit(collectionName, options, number) {
  const collect = await collection(db, collectionName);
  let q;
  if (options.lq) {
    q = query(
      collect,
      orderBy(options.order, "desc"),
      startAfter(options.lq),
      limit(options.limit)
    );
  } else {
    q = query(collect, orderBy(options.order, "desc"), limit(options.limit));
  }
  // const q = query(컬렉션정보, 조건1, 조건2, 조건3 ...), asc: 오름차순,  decs: 내림차순
  const snapshot = await getDocs(q);
  const lastQuery = snapshot.docs[snapshot.docs.length - 1];

  const resultData = snapshot.docs.map((doc) => ({
    docId: doc.id,
    ...doc.data(),
  }));

  return { resultData, lastQuery };
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

export {
  db,
  getDatas,
  addDatas,
  deleteDatas,
  updateDatas,
  getDatasByOrder,
  getDatasByOrderLimit,
};
