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
  let newPath = path;
  if (typeof path[0] !== "string") {
    // [newPath] = path;
    newPath = path.flat();
    // flat() : 벚겨낸다. 배열을 한단계 내려서 합친다.ex) flat(1) 한번, flat(2) 두번, flat(infinity) 다풀어해치고 마지막 배열만 남는다.
    // flatMap(조건) : map 함수 후에 벚겨낸다. 배열이나 객체등을 하나씩 풀어서 조건을 적용 후 한단계 내려서 합친다.
  }
  // getCollection의 ...path는 파라미터를 전부 가져와서 배열로 반환
  return collection(db, ...newPath);
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
  for (const item of cartArr) {
    const result = await updateQuantity(uid, item);
    if (!result) {
      const itemRef = doc(cartRef, item.id.toString());
      batch.set(itemRef, item);
    }
  }

  await batch.commit();
}

export async function updateQuantity(uid, cartItem) {
  const cartRef = getCollection("users", uid, "cart");
  const itemRef = doc(cartRef, cartItem.toString());
  // 문서가 존재하는지 확인
  const itemDoc = await getDoc(itemRef);
  if (itemDoc.exists()) {
    const currentData = itemDoc.data();
    const updatedQuantity = (currentData.quantity || 0) + 1;
    await updateDoc(itemRef, { quantity: updatedQuantity });
    return true;
  } else {
    return false;
  }
}

async function deleteDatas(collectionName, docId) {
  try {
    const cartRef = getCollection(collectionName);
    const docRef = await doc(cartRef, docId.toString());
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.log("error Delete", error);
  }
}

async function addCart(collectionName, addObj) {
  const collectionRef = getCollection(collectionName);
  const cartRef = doc(collectionRef, addObj.id.toString());
  await setDoc(cartRef, addObj);
}

export {
  getUserAuth,
  getDatas,
  addDatas,
  addCart,
  getData,
  joinUser,
  asyncCart,
  deleteDatas,
};
