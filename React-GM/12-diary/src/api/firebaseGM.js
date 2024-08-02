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
  runTransaction,
} from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDzr4QHaekwIQ1jE0wyzARCl5BwW5X4zJ8",
  authDomain: "diary-gm.firebaseapp.com",
  projectId: "diary-gm",
  storageBucket: "diary-gm.appspot.com",
  messagingSenderId: "1025226870882",
  appId: "1:1025226870882:web:34798845339ab6efb2813b",
  measurementId: "G-EPHWXLFKRP",
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
async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);
  if (lastDoc.docs.length === 0) return 0;
  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}
async function addDatas(collectionName, addObj) {
  try {
    const resultData = await runTransaction(db, async (tr) => {
      const lastId = (await getLastNum(collectionName, "id")) + 1;
      addObj.id = lastId;
      const docRef = await addDoc(getCollection(collectionName), addObj);
      const snapshot = await getDoc(docRef);
      const docData = snapshot.exists()
        ? { ...snapshot.data(), docId: snapshot.id }
        : null;
      return docData;
    });
    return resultData;
  } catch (error) {
    console.log("Error transaction: ", error);
  }
}
// Transaction 데이터베이스의 작업 단위
// 1명 무슨 작업을 하던 이사람의 작업이 우선적으로 실행
// 사용자가 여러명이면 순서를 어떻게 정할거냐?
// 세명의 사용자가 일기 등록을 동시에 눌렀다.
// getLastNum 마지막거 가져와서 +1
// --> 데이터 번잡성을 해결하기 위해
function getQuery(collectionName, queryOption) {
  const { conditions = [], orderBys = [], limits } = queryOption;
  const collect = getCollection(collectionName);
  let q = query(collect);

  const condition = [
    { field: "text", operator: "==", value: "test" },
    { field: "uid", operator: "==", value: "xjdiwjKDJ2jdkxJND2J" },
  ];

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

async function getDatas(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const docs = snapshot.docs;
  const resultData = docs.map((doc) => ({ ...doc.data(), docId: doc.id }));
  return resultData;
}

async function updateDatas(collectionName, dataObj, docId) {
  const docRef = await doc(db, collectionName, docId);
  const time = new Date().getTime();
  dataObj.updatedAt = time;
  await updateDoc(docRef, dataObj);
  const updateData = await getDoc(docRef);
  const resultData = { docId: updateData.id, ...updateData.data() };
  return resultData;
}

async function deleteDatas(collectionName, docId, imgUrl) {
  try {
    // 3. 컬렉션에 문서 삭제
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);
    // deleteDoc(삭제할 문서);
    return true;
  } catch (error) {
    return false;
  }
}

export { addDatas, getDatas, updateDatas };
