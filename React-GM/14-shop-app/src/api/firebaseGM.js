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
  writeBatch,
} from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAEi9uf28C2wMYlovscaPZGOSEDx1XrGWs",
  authDomain: "shop-app-gm.firebaseapp.com",
  projectId: "shop-app-gm",
  storageBucket: "shop-app-gm.appspot.com",
  messagingSenderId: "891506869218",
  appId: "1:891506869218:web:e9cbc6fba62290d84befbb",
  measurementId: "G-4RMTQYD0SD",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

function getCollection(...path) {
  // getCollection의 ...path는 파라미터를 전부 가져와서 배열로 반환
  return collection(db, ...path);
  // collection의 ...path는 파라미터를 전부 가져와서 하나씩 풀어해친다.(스프레트 함수)
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
async function getData(collectionName, queryOptions) {
  const q = getQuery(collectionName, queryOptions);
  const snapshot = await getDocs(q);
  const doc = snapshot.docs[0];
  // 한개의 배열만 있는 결과만 추출가능
  const resultData = { ...doc.data(), docId: doc.id };
  return resultData;
}

async function joinUser(uid, email) {
  await setDoc(doc(db, "users", uid), { email: email });
}

// 문서Id를 uid롤 지정 , 하위 컬렉션에 cartArr저장 --> collection(db, 2번 접근)
async function asyncCart(uid, cartArr) {
  // const cartRef = collection(db, "users", uid, "cart", cartDocId);
  const cartRef = getCollection("users", uid, "cart");
  // 여러개 작업을 한번에 가져와서 추가해주는 것
  const batch = writeBatch(db);
  cartArr.forEach((item) => {
    const itemRef = doc(cartRef, new Date().getTime().toString() + item.id);
    batch.set(itemRef, item);
  });
  await batch.commit();
}

export { getUserAuth, getDatas, addDatas, getData, joinUser, asyncCart };
