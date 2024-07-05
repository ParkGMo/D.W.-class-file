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
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
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
    const uuid = await crypto.randomUUID();
    const path = `movie/${uuid}`;
    const url = await uploadImage(path, dataObj.imgUrl);
    // const url = await uploadBytes(path, dataObj.imgUrl);

    dataObj.imgUrl = url;

    // createdAt , updatedAt ==> 현재날 밀리세컨즈로 바꿔서
    const time = new Date().getTime();
    dataObj.createdAt = time;
    dataObj.updatedAt = time;
    // id 필드의 값 ==> 가장 큰  id + 1
    const lastId = await getLastNum(collectionName, "id");

    dataObj.id = lastId + 1;
    // 문서 ID 자동
    const collect = await collection(db, collectionName);
    const result = await addDoc(collect, dataObj);
    const docSnap = await getDoc(result); // document --> documentReference

    const resultData = { ...docSnap.data(), docId: docSnap.id };

    return resultData;
  } catch (error) {
    return false;
  }
}

async function getLastNum(collectionName, field) {
  const q = query(
    collection(db, collectionName),
    orderBy(field, "desc"),
    limit(1)
  );
  const lastDoc = await getDocs(q);

  const lastNum = lastDoc.docs[0].data()[field];
  return lastNum;
}

async function uploadImage(path, imgFile) {
  // 스토리지 객체 가져오기
  const storage = getStorage();
  // 저장할 이미지 객체 생성
  const imageRef = ref(storage, path);
  // File 객체를 스토리지에 저장
  await uploadBytes(imageRef, imgFile);
  // 저장한 file의 url 가져오기
  const url = await getDownloadURL(imageRef);
  return url;
}

async function deleteDatas(collectionName, docId, imgUrl) {
  // async function deleteDatas(collectionName, docId, ...args) {
  // (...args) --> 없어도 함수 실행가능, 여러 개를 기입하면 배열로 변환
  // 1. 스토리지 객체 가져온다.
  const storage = getStorage();
  try {
    // 2. 스토리지에서 이미지 삭제
    const deleteRef = ref(storage, imgUrl);
    await deleteObject(deleteRef);
    // 3. 컬렉션에 문서 삭제
    const docRef = await doc(db, collectionName, docId);
    await deleteDoc(docRef);
    // deleteDoc(삭제할 문서);
    return true;
  } catch (error) {
    return false;
  }
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
